const { user_rrr, users, enrolee_rrr_code, sequelize } = require('../models');
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize');

const getEnrolee_rrr_code = async(req, res) =>{
    try{
        const id = req.params.id
        const User_rrrsCode = await enrolee_rrr_code.findOne({ 
            where:{id: id}, 
            include: [users, user_rrr ]})
        return res.status(200).json(User_rrrsCode)
    }
    catch(err){
        return res.status(500).json({ err: err.message})
    }

}
const getEnrolee_rrr_codeCount = async(req, res) =>{
    try{
        const user_rrrId = req.params.user_rrrId
        const User_rrrsCode = await enrolee_rrr_code.findAndCountAll({ 
            where:{user_rrrId: user_rrrId}, 
            include: [users, user_rrr ]})
        return res.status(200).json(User_rrrsCode)
    }
    catch(err){
        return res.status(500).json({ err: err.message})
    }

}
const getEnrolee_rrr_codeCountBy_In_Op = async(req, res) =>{
    try{ 
       var numberArray =[]
       numberArray =req.params.ids.split(',')
       const User_rrrsCode = await enrolee_rrr_code.findAll({
         attributes: [ ['user_rrrId', 'id'],[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
           where:{user_rrrId:{[Op.in]: numberArray}},
           //order: [['createdAt','DESC']],
           group: [['user_rrrId']]
            })
           
        return res.status(200).json(User_rrrsCode)
    }
    catch(err){
        return res.status(500).json({ err: err.message})
    }

}
const getEnrolee_rrr_codeByCode = async(req, res) =>{
    try{
        const code = req.params.code
        const User_rrrsCode = await enrolee_rrr_code.findOne({ where:{code: code}, include: [users, user_rrr ], order:[['id', 'DESC']]})
        return res.status(200).json(User_rrrsCode)
    }
    catch(err){
        return res.status(501).json({ err: err.message})
    }

}
//user_rrrId
const getEnrolee_rrr_codeByUser_rrrId = async(req, res) =>{
    try{
        const user_rrrId = req.params.user_rrrId
        const User_rrrsCode = await enrolee_rrr_code.findAll({ 
            where:{user_rrrId: user_rrrId},
             include: [users, user_rrr ],
              order:[['id', 'DESC']]})
        return res.status(200).json(User_rrrsCode)
    }
    catch(err){
        return res.status(500).json({ err: err.message})
    }

}
const getEnrolee_rrr_codeByUserIdAll = async(req, res) =>{
    try{
        const userId = req.params.userId
        const User_rrrsCode = await enrolee_rrr_code.findAll({ where:{userId: userId}, include: [users, user_rrr ], order:[['id', 'DESC']]})
        return res.status(200).json(User_rrrsCode)
    }
    catch(err){
        return res.status(500).json({ err: err.errors[0].message})
    }

}
const getEnrolee_rrr_codeByUserId = async(req, res) =>{
    try{
        const userId = req.params.userId
        const User_rrrsCode = await enrolee_rrr_code.findOne({ where:{userId: userId}, include: [users, user_rrr ], order:[['id', 'DESC']]})
        return res.status(200).json(User_rrrsCode)
    }
    catch(err){
        return res.status(500).json({ err: err.errors[0].message})
    }

}
const getEnrolee_rrr_codeByUserIdCode = async(req, res) =>{
    try{
        const userId = req.params.userId
        const code = req.params.code
        const User_rrrsCode = await enrolee_rrr_code.findOne({ where:{userId: userId, code: code}, include: [users, user_rrr ], order:[['id', 'DESC']]})
        return res.status(200).json(User_rrrsCode)
    }
    catch(err){
        return res.status(500).json({ err: err.errors[0].message})
    }

}
const getEnrolee_rrr_codes = async(req, res) =>{
    try{
        const User_rrrsCode = await enrolee_rrr_code.findAll({ include: [users, user_rrr ]})
        return res.status(200).json(User_rrrsCode)
    }
    catch(err){
        return res.status(200).json({ err: err.errors[0].message})
    }

}
const addEnrolee_rrr_code = async(req, res) =>{
    try{
        const { user_rrrId, userId, code} = req.body

        const User_rrrs = await enrolee_rrr_code.create({user_rrrId:user_rrrId, userId:userId, code:code})
        return res.status(200).json(User_rrrs)
    }
    catch(err){
        return res.status(200).json({ err: err.errors[0].message})
    }

}
const addEnrolee_rrr_codes = async(req, res) =>{
try{
    const result = await sequelize.transaction(async (t) => {
   const q =  await enrolee_rrr_code.bulkCreate(req.body, { transaction: t });
  return res.status(200).json(q)
    });
}
catch(err){
    return res.status(500).json({ err: err.errors[0].message})
}    
}
const deleteEnrolee_rrr_codes = async(req, res) =>{
try{
    const userId = req.params.userId
   const q =  await enrolee_rrr_code.destroy({userId: userId});
   if(q) return 'OK';
   else return 'ERROR';
}
catch(err){
    return "ERROR"
}    
}
const getActiveRegistration = async(req, res) =>{
    try{
        const uid = req.params.uid
await enrolee_rrr_code.findAll({
  include: [
      {model: users, attributes: ['username', 'email', 'surname', 'othername'],
      where:{
        id: uid
      }}, 
      {model: user_rrr, attributes: ['rrr_number','expired_date', 'activated', 'activated_date','authNumber'],
      where:{
        activated: { [Op.ne]: 0 }
      }
      } 
    ],
    attributes: ['code'],
    raw: true
}).then(results=>{
     const obj2 = results.map((result, index)=>{
              return Object.assign({
                code: result.code,
                email:result['user.email'],
                username:result['user.username'],
                surname:result['user.surname'],
                othername:result['user.othername'],
                rrr_number:result['user_rrr.rrr_number'],
                expired_date:result['user_rrr.expired_date'],
                activated:result['user_rrr.activated'],
                activated_date: result['user_rrr.activated_date'],
                authNumber: result['user_rrr.authNumber']
                })
                 })

    return res.status(200).json(obj2)
}).catch(err=>{
    return res.status(500).json({err: err.message})
})

    }
    catch(err){
return res.status(500).json({err: err.message})
    }
}
module.exports = {
    deleteEnrolee_rrr_codes,
    getEnrolee_rrr_code,
    getEnrolee_rrr_codes,
    getEnrolee_rrr_codeByUserId,
    getEnrolee_rrr_codeByCode,
    addEnrolee_rrr_code,
    getEnrolee_rrr_codeByUserIdCode,
    addEnrolee_rrr_codes,
    getEnrolee_rrr_codeCount,
    getEnrolee_rrr_codeByUser_rrrId,
    getEnrolee_rrr_codeByUserIdAll,
    getEnrolee_rrr_codeCountBy_In_Op,
    getActiveRegistration
    
}