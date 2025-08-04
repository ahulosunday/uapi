const { users, gforms, role, sequelize, enrolee_rrr_code } = require('../models');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {getPagination, getPagingData} = require('../helpers/paging')
const speakeasy = require('speakeasy');
const { Op, where} = require('sequelize');


const createUser = async (req, res) => {
    
    try {
        const salt = bcrypt.genSaltSync(10)////SALT should be created ONE TIME upon sign up
        const { username, password, email,uiid, roleid, imgurl, surname, othername, phone, isActive, department } = req.body
        const hashedPassword = bcrypt.hashSync(password, salt)
        if(username ==="" || password ==="" || email ===""){
            return res.status(500).json({ err: "Empty field not allowed" })
        }

        const user = await users.create({username:username, password:hashedPassword, email:email,uiid:uiid, roleid:roleid, imgurl: imgurl, surname: surname, othername: othername, phone: phone, isActive: isActive, department: department});
        return res.status(201).json({ user,});
    } catch (err) {
        return res.status(500).json({ err: err.message})
    }
}
const BulkcreateUser = async (req, res) => {
    
    try {
        const user = await users.bulkCreate(req.body);
        return res.status(201).json(user);
    } catch (err) {
        return res.status(500).json({ err: err.message})
    }
}
const BulkcreateUserAndCodes = async (req, res) => {
    
    try {
         //===================================
const secret = speakeasy.generateSecret({ length: 60 });
    const codex = speakeasy.totp({
      // Use the Base32 encoding of the secret key
    secret: secret.base32,
      // Tell Speakeasy to use the Base32 
    // encoding format for the secret key
    encoding: 'base32'
});
 var numberArray =[]
 var obj3 = []
        const result = await sequelize.transaction(async (t) => {
            const user_rrrId = req.params.user_rrrId
      
      await users.bulkCreate(req.body, {transaction: t})
      .then( async col=>{
         const obj2 = col.map((result, index)=>{
              return Object.assign({
                userId: result.dataValues.id,
                user_rrrId: user_rrrId,
                code:  codex + 'Xyz'+ index 
                })
                 })
                    await enrolee_rrr_code.bulkCreate(obj2, { transaction: t })
                    .then( async(resp)=>{
                       //get the inserted ids and codes===============
                        obj3 = resp.map((result)=>{
                            numberArray.push(result.dataValues.userId)
                        return Object.assign({
                            userId: result.dataValues.userId,
                            code: result.dataValues.code,
                         })
                            })
                           
                           
                    })
                    .catch(errs=>{
                        throw new Error(errs.message);
                    
                    })
                    }).catch(err=>{
          throw new Error(err.message);
        })
        }); // end of transaction. Note: Select is not done inside the transaction because numberArray will be empty without commit
         await users.findAll({
                                attributes: [ ['id', 'userId'], ['email', 'email'] ],
                                where: { id:{[Op.in]: numberArray}},
                                order:[['id','ASC']]
                            }).then(exp=>{
                                const d = JSON.stringify(exp)
                                const arrs = obj3.map((item, i) => Object.assign({}, item, JSON.parse(d)[i]))
                                return res.status(200).json(arrs)
                               
                            }).catch(r=>{
                                throw new Error(r.message);
                            })
    } catch (err) {
        return res.status(500).json({ err: err.message})
    }
}
const findAllUser = async (req, res) => {
    
    try {

        const user = await users.findAll({  order:[['surname', 'ASC'], ['othername', 'ASC']]});
        return res.status(201).json(user);
    } catch (err) {
        return res.status(500).json({ err: err.message})
    }
}
const findUserById = async (req, res) => {
    
    try {
const id = req.params.id
        const user = await users.findOne({where:{id: id},  order:[['surname', 'ASC'], ['othername', 'ASC']]});
        return res.status(201).json(user);
    } catch (err) {
        return res.status(500).json({ err: err.message})
    }
}
const findUserByUiid = async (req, res) => {
    
    try {
const uiid = req.params.uiid
        const user = await users.findOne({where:{uiid: uiid},  order:[['surname', 'ASC'], ['othername', 'ASC']]});
        return res.status(201).json(user);
    } catch (err) {
        return res.status(500).json({ err: err.message})
    }
}
const getUsersPaging = async(req, res) =>{
    try{
        const  page =  req.params.page
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await users.findAndCountAll({ 
           order:[['surname', 'ASC'], ['othername', 'ASC']],
           include: [role],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
                  return res.status(200).json(response)
    }
    catch(err){
        return res.status(200).json({ err: err.message})
    }

}
const ActivateUser = async (req, res) => {
     try {
            const id = req.params.id
        const user = await users.findOne({where:{id: id}});
        user.isActive = 1;
        user.save()
        .then(resp=>{
        return res.status(200).json(resp);
      }).catch(err=>{
        return res.status(200).json({ err: err.message})
      })

    } catch (err) {
        return res.status(500).json({ err: err.message})
    }
}
const DeactivateUser = async (req, res) => {
    
    try {
            const id = req.params.id
        const user = await users.findOne({where:{id: id}});
        user.isActive = 0;
        user.save()
       .then(resp=>{
        return res.status(200).json(resp);
      }).catch(err=>{
        return res.status(200).json({ err: err.errors[0].message})
      })

    } catch (err) {
        return res.status(500).json({ err: err.errors[0].message})
    }
}
const ChangeRole = async (req, res) => {
    
    try {
            const id = req.params.id
        const user = await users.findOne({where:{id: id}});
        user.roleid = req.params.roleid;
        user.save()
       .then(resp=>{
        return res.status(200).json(resp);
      }).catch(err=>{
        return res.status(200).json({ err: err.errors[0].message})
      })

    } catch (err) {
        return res.status(500).json({ err: err.errors[0].message})
    }
}
const changePassword = async(req, res)=>{
    try{
       
        const id = req.params.id
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(req.body.password, salt)
      const userlist = await users.findOne({ where: {id: id, username: req.body.username} })
        if(await bcrypt.compare(req.body.cpassword, userlist.password)){
       userlist.password = hashedPassword
       userlist.save()
        return res.status(200).json(userlist);
       }       
       
   return res.status(501).json({err: 'Can not associate your current password with any user'})

    }
    catch(err){
        return res.status(500).json({ err: err})

    }
}
const ResetPassword = async(req, res)=>{
    try{
       
        const id = req.params.id
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(req.body.password, salt)
      const userlist = await users.findOne({ where: {id: id, username: req.body.username} })
       userlist.password = hashedPassword
       userlist.save()
     .then(resp=>{
        return res.status(200).json(resp);
      }).catch(err=>{
        return res.status(500).json({ err: err.errors[0].message})
      })
      
    }
    catch(err){
        return res.status(500).json({ err: err.errors[0].message})

    }
}
const changePassport = async(req, res)=>{
    try{
       
        const id = req.params.id
      const userlist = await users.findOne({ where: {id: id} })
       userlist.imgurl = req.body.imgurl
       userlist.save()
      .then(resp=>{
        return res.status(200).json(resp);
      }).catch(err=>{
        return res.status(200).json({ err: err.errors[0].message})
      })
     
    }
    catch(err){
        return res.status(500).json({ err: err.errors[0].message})

    }
}
const findUserByUsername = async(req, res)=>{
    try{
       
        const username = req.params.username
      const userlist = await users.findOne({ where: {username: username} })
      return res.status(200).json(userlist)     
    }
    catch(err){
        return res.status(500).json({ err: err.errors[0].message})

    }
}
const findUserByEmail = async(req, res)=>{
    try{
       
        const email = req.params.email
      const userlist = await users.findOne({ where: {email: email} })
      return res.status(200).json(userlist)     
    }
    catch(err){
        return res.status(500).json({ err: err.errors[0].message})

    }
}
const deleteUserById = async(req, res) =>{
    try{
       
        const UserId = req.params.id
        await users.destroy({where:{id: UserId}}).then(delete_user=>{
            return res.status(200).json(delete_user); 
        }).catch(err=>{
             return res.status(500).json({ err: 'Error occured, can not delete ...'})
        })
           
        
    }
    catch(err){
        return res.status(500).json({ err: err.errors[0].message})
    }
}

const updateUser = async(req, res)=>{
    try{

 const data = await users.update({
    surname: req.body.surname,
    othername: req.body.othername,
    email: req.body.email,
    phone: req.body.phone,

 },{
    where:{
        id: req.body.id
    }
 })
 return res.status(200).json(data)
    }
    catch(err){
return res.status(500).json({err: err.message})
    }
}
module.exports = {
    findUserByEmail,
    findUserByUsername,
    createUser,
    findAllUser,
    changePassword,
    ActivateUser,
    DeactivateUser,
    changePassport,
    getUsersPaging,
    BulkcreateUser,
    ResetPassword,
    deleteUserById,
    findUserById,
    findUserByUiid,
    BulkcreateUserAndCodes,
    ChangeRole,
    updateUser
}