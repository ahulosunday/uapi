const { user_rrr, users, gifship, gifshiptype, gifshipPackage, enrolee_rrr_code, sequelize } = require('../models');
const jwt = require('jsonwebtoken')
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');
const moment = require('moment')
const msg = require('../helpers/messages')
const mails = require('../helpers/email');
const speakeasy = require('speakeasy');


const getUser_rrrs = async(req, res) =>{
    try{
       
        const data = await user_rrr.findAll({ 
            include: [users,gifship, gifshiptype, gifshipPackage ]
           
            })
         
        return res.status(500).json(data)
    }
    catch(err){
        return res.status(500).json({ err: err.message})
    }

}
const getUser_rrrsByNotActivated = async(req, res) =>{
    try{
       
        const data = await user_rrr.findAll({ where:{activated: 0},
            include: [users,gifship, gifshiptype, gifshipPackage ],
            order :[['id', 'DESC']]
           
            })
         
        return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({ err: err.message})
    }

}
const getUser_rrrsPaging = async(req, res) =>{
    try{
        const  page =  req.params.page
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await user_rrr.findAndCountAll({ 
            include: [users,gifship, gifshiptype, gifshipPackage ],
            order:[['id','DESC']],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(500).json({ err: err.message})
    }

}
const getAllByUserId = async (req, res) =>{
    try{
        const userId = req.params.userId;
        const qurey = await user_rrr.findOne({where:{userId: userId}, order:[['id', 'DESC']]})
        return res.status(200).json(qurey)
    }
    catch(err){
     return res.status(500).json({ err: err.message})
    }
}
const getUser_rrr =async(req, res) =>{
   try{
        const User_rrrId = req.params.id
        const User_rrrs = await user_rrr.findOne({
            include: [users,gifship, gifshiptype, gifshipPackage ], 
            where:{id : User_rrrId}
            })
        return res.status(200).json(User_rrrs)
    }
    catch(err){
       return res.status(500).json({ err: err.message})
    }

}
const getUser_rrrByRRR =async(req, res) =>{
   try{
        const rrr_number = req.params.id
        const User_rrrs = await user_rrr.findOne({include: [users,gifship, gifshiptype, gifshipPackage ], where:{rrr_number : rrr_number}})
        return res.status(200).json(User_rrrs)
    }
    catch(err){
       return res.status(500).json({ err: err.message})
    }

}
const getUser_rrrByUserId =async(req, res) =>{
   try{
        const userId = req.params.userId
        const User_rrrs = await user_rrr.findAll({
            include: [users,gifship, gifshiptype, gifshipPackage ], 
            where:{userId : userId, activated: 1} })
        return res.status(200).json(User_rrrs)
    }
    catch(err){
       return res.status(500).json({ err: err.message})
    }

}
const getUser_rrrByUserIdAll =async(req, res) =>{
   try{
        const userId = req.params.userId
        const User_rrrs = await user_rrr.findAll({
            include: [users,gifship, gifshiptype, gifshipPackage ], 
            where:{userId : userId},  order:[['id', 'DESC']] })
        return res.status(200).json(User_rrrs)
    }
    catch(err){
        return res.status(500).json({ err: err.message})
    }

}
const getUser_rrrByUserIdAllBy4params =async(req, res) =>{
   try{
        const gifshipId = req.params.gifshipId
         const gifshipTypeId = req.params.gifshipTypeId
          const gifshipPackageId = req.params.gifshipPackageId
           const userId = req.params.userId
        const User_rrrs = await user_rrr.findAll({
            include: [users,gifship, gifshiptype, gifshipPackage ], 
            where:{gifshipId : gifshipId, gifshipTypeId : gifshipTypeId, gifshipPackageId : gifshipPackageId, userId : userId}, 
             order:[['id', 'DESC']] })
        return res.status(200).json(User_rrrs)
    }
    catch(err){
        return res.status(500).json({ err: err.message})
    }

}
const getUser_rrrByExpired =async(req, res) =>{
   try{
        const startedDate = new Date(req.params.sdate);
        const endDate = new Date(req.params.edate);

      const User_rrrs = await  user_rrr.findAll({
        where : { expired_date : {[Op.between] : [startedDate , endDate ]}},
         include: [users, gifship, gifshiptype, gifshipPackage ]
        })
       
        return res.status(200).json(User_rrrs)
    }
    catch(err){
        return res.status(500).json({ err: err.message})
    }

}
const getUser_rrrByExpireToday = async(startedDates) =>{
   try{
        const startedDate = new Date(startedDates);
       var obj =[]
       const user = await  user_rrr.findAll({
        where : { expired_date : startedDate, activated: 1 },
         include: [users, gifship, gifshiptype, gifshipPackage ]
        })
      
        const results = user.map(async(result)=>{
            const del = await user_rrr.findOne({where:{id:result.dataValues.id}})
            del.activated = 0
            del.save()
            obj.push(result.dataValues.user.dataValues.email)
            //return result.dataValues.user.dataValues.email
        })
            const obj3 = Object.assign({
                      msg: msg.deactivationMsg,
                      to: obj,
                      subject: msg.deactivationTitle
                    })
                  
            const email = mails.mails(obj3)
           results (1)
     
    }
    catch(err){
        return (err.message)
    }

}
const getUser_rrrByExpireNotify = async(days) =>{
   try{
     var obj =[]
      const User_rrrs = await  user_rrr.findAll({
        where : { expired_date :  {
      [Op.gte]: moment().subtract(days, 'days').toDate()
    }, activated: 1 },
         include: [users, gifship, gifshiptype, gifshipPackage ]
        })
       
         const results = User_rrrs.map(async(result)=>{
            const del = await user_rrr.findOne({where:{id:result.dataValues.id}})
            del.activated = 1
            del.save()
            obj.push(result.dataValues.user.dataValues.email)
        })
            const obj3 = Object.assign({
                      msg: msg.noticeMsg + '-- remaining period: '+ days + ' days',
                      to: obj,
                      subject: msg.noticeTitle
                    })
                   
            const email = mails.mails(obj3)
           results (1)
    }
    catch(err){
        return (err.message)
    }

}
const RenewUser_rrr = async(req, res) =>{
try{
    const result = await sequelize.transaction(async (t) => {

    const { rrr_number,	userId,	activated,	activatedby,	amount,	duration,	gifshipId,	gifshipTypeId,	gifshipPackageId,	activated_date,	expired_date, maxNumber, minNumber, authNumber, oldId} = req.body
    const q = await user_rrr.findOne({ where:{userId:userId, activated: 1}})
    if(q){
    q.activated = 0
    q.save()
    }
   const col = await user_rrr.create({ 

    rrr_number:rrr_number,	userId:userId,	
    activated:activated,	activatedby:activatedby,
    	amount:amount,	duration:duration,	gifshipId:gifshipId,
        	gifshipTypeId:gifshipTypeId,	gifshipPackageId:gifshipPackageId,
            	activated_date:activated_date,	expired_date:expired_date, 
                maxNumber:maxNumber, minNumber:minNumber,
                 authNumber: authNumber},{ transaction: t }).then(async (results)=>{
                const code = await enrolee_rrr_code.findAll({where:{user_rrrId: oldId}})
//===================================
const secret = speakeasy.generateSecret({ length: 50 });
    const codex = speakeasy.totp({
      // Use the Base32 encoding of the secret key
    secret: secret.base32,
      // Tell Speakeasy to use the Base32 
    // encoding format for the secret key
    encoding: 'base32'
});
//==============================
              const obj2 = code.map((result, index)=>{
              return Object.assign({
                userId: result.dataValues.userId,
                user_rrrId:results.id,
                code:  codex + index 
                })
                 })
                
                 //renew the code table also ==============
                    await enrolee_rrr_code.bulkCreate(obj2, { transaction: t })
                    .then( async (resp)=>{
                         const obj3 = code.map((result)=>{
                        return Object.assign(
                            result.dataValues.userId
                            )
                            })
                            // get the members email address =================
                       await users.findAll({where:{id:{[Op.in]: obj3}}})
                       .then(user=>{
                        const obj4 = user.map((userx)=>{
                        return Object.assign(
                          userx.dataValues.email
                        )
                            })
                           
                        
                            return res.status(200).json(obj4)
                       })   
                    //=========================
                   
                    })
                    .catch(erro=>{
                        return res.status(500).json({err: erro})
                    })
                    })
                     .catch(errors1=>{
                        return res.status(500).json({err: errors1})
                    })
                 
    });
}
catch(err){
    return res.status(500).json({ err: err.message} );
}

}
const addUser_rrr = async(req, res) =>{
try{
    const { rrr_number,	userId,	activated,	activatedby,	amount,	duration,	gifshipId,	gifshipTypeId,	gifshipPackageId,	activated_date,	expired_date, maxNumber, minNumber, authNumber} = req.body
    const q = await user_rrr.findOne({ where:{userId:userId, activated: 1}})
    if(q){
    q.activated = 0
    q.save()
    }
   const col = await user_rrr.create({ rrr_number:rrr_number,	userId:userId,	activated:activated,	activatedby:activatedby,	amount:amount,	duration:duration,	gifshipId:gifshipId,	gifshipTypeId:gifshipTypeId,	gifshipPackageId:gifshipPackageId,	activated_date:activated_date,	expired_date:expired_date, maxNumber:maxNumber, minNumber:minNumber, authNumber: authNumber});
    return res.status(200).json(col)
}
catch(err){
    return res.status(500).json({ err: err.message} );
}  
}
const addUser_rrrAndCode = async(req, res) =>{
try{
    //===================================
const secret = speakeasy.generateSecret({ length: 50 });
    const codex = speakeasy.totp({
      // Use the Base32 encoding of the secret key
    secret: secret.base32,
      // Tell Speakeasy to use the Base32 
    // encoding format for the secret key
    encoding: 'base32'
});
//==============================
    const result = await sequelize.transaction(async (t) => {
    const { rrr_number,	userId,	activated,	activatedby,	amount,	duration,	gifshipId,	gifshipTypeId,	gifshipPackageId,	activated_date,	expired_date, maxNumber, minNumber, authNumber} = req.body
    const q = await user_rrr.findOne({ where:{userId:userId, activated: 1}})
    if(q){
    q.activated = 0
    q.save({transaction: t})
    }
    const uid = await users.findOne({ where:{id:userId}})
    if(uid){
    uid.isActive = 1
    uid.save({transaction: t})
    }
   await user_rrr.create({ rrr_number:rrr_number,
   	userId:userId,	activated:activated,
    	activatedby:activatedby,
        amount:amount,	duration:duration,
        	gifshipId:gifshipId,	gifshipTypeId:gifshipTypeId,
            	gifshipPackageId:gifshipPackageId,
                	activated_date:activated_date,
                    	expired_date:expired_date, maxNumber:maxNumber, 
                        minNumber:minNumber, authNumber: authNumber}
                        ,{transaction:t}
                        )
                        .then(async resp=>{
                        await enrolee_rrr_code.create({user_rrrId:resp.dataValues.id,
                         userId:resp.dataValues.userId, code:codex +'XYz'},{transaction: t})
                         .then(result=>{
                            return res.status(200).json(result)
                         })
                          
                        })
})
}
catch(err){
    return res.status(500).json({ err: err.message} );
}
  
   
}
const deleteUser_rrr = async(req, res) =>{
    try{
       // const token = req.cookies.access_token
       // if(!token) return res.status(401).json({err: "Not authenticated"})
        const User_rrrId = req.params.id
        await enrolee_rrr_code.destroy({where:{user_rrrId: User_rrrId}})
        .then( async resp =>{
             await user_rrr.destroy({ where:{id : User_rrrId}})
             .then(ress=>{
                return res.status(200).json(ress);  
             })
             .catch(errs=>{
                return res.status(500).json({ err: 'Error occured, can not delete ...'})
             })
        }).catch(err=>{
            return res.status(500).json({ err: 'Error occured ...'})
        })
       

          
        
    }
    catch(err){
        return res.status(500).json({ err: err.errors[0].message})
    }
}
 const updateUser_rrr = async(req, res) =>{
   try{
        const User_rrrId = req.params.id
       const { rrr_number,	userId,	activated,	activatedby,	amount,	duration,	gifshipId,	gifshipTypeId,	gifshipPackageId,	activated_date,	expired_date, maxNumber, minNumber, authNumber: authNumber} = req.body
        const ress = await user_rrr.findOne({ where:{id : User_rrrId}})
        ress.rrr_number = rrr_number
        ress.userId= userId
        ress.activated = activated
        ress.activatedby = activatedby
        ress.amount= amount
        ress.duration = duration
        ress.gifshipId = gifshipId
        ress.gifshipTypeId = gifshipTypeId
        ress.gifshipTypePackageId = gifshipPackageId
        ress.activated_date = activated_date
        ress.expired_date = expired_date
        ress.minNumber = minNumber
        ress.maxNumber = maxNumber
        ress.authNumber = authNumber
        ress.save()
        .then(resp=>{
        return res.status(200).json(resp);
      }).catch(err=>{
        return res.status(500).json({ err: err.message})
      })

    }
    catch(err){
        return res.status(500).json({ err: err.message})
    }
}
const bulkUpdate = async(req, res) =>{
    try{
        var data = []
         data = req.body
        data.map( async (item)=>{
       const ress = await user_rrr.findOne({ where:{id : item.id}})
        ress.activated = 1
        ress.activatedby = item.activatedby
        ress.activated_date =item.activated_date
        ress.expired_date = item.expired_date
        ress.save()
      })
   
 return res.status(200).json(data.length)
    }
    catch(err){
         return res.status(500).json({ err: err.message})
    }
}
const activateUser_rrr = async(req, res) =>{
   try{
        const User_rrrId = req.params.id
       const {activated,	activatedby,	activated_date,	expired_date} = req.body
        const ress = await country.findOne({ where:{id : User_rrrId}})
       ress.expired_date = expired_date
       ress.activated_date = activated_date
        ress.activated = activated
        ress.activatedby = activatedby
        ress.save()
        return res.status(200).json(ress)
   }
   catch(err){
     return res.status(500).json({ err: err.message})
   }
}


module.exports = {
    
    activateUser_rrr,
    getUser_rrrs,
    getUser_rrr, 
    addUser_rrr, 
    deleteUser_rrr, 
    updateUser_rrr,
    getUser_rrrByRRR,
    getUser_rrrByUserId,
    getUser_rrrsPaging,
    getAllByUserId,
    getUser_rrrByExpired,
    getUser_rrrsByNotActivated,
    getUser_rrrByUserIdAll,
    bulkUpdate,
    getUser_rrrByExpireToday,
    getUser_rrrByExpireNotify,
    RenewUser_rrr,
    getUser_rrrByUserIdAllBy4params,
    addUser_rrrAndCode
    
    
}