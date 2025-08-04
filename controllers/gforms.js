const {gform,user_rrr, lga, users,country, regions,states,hmo, hospital, gifship, gifshiptype, gifshipPackage, sequelize } = require('../models');
const jwt = require('jsonwebtoken')
const { getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');

const getGforms = async(req, res) =>{
    try{
     
        const data = await gform.findAll({ 
             include: [country,users, regions, states, lga, hospital],
              order:[['surname', 'ASC'], ['middlename', 'ASC'], ['lastname', 'ASC']]
          
            })
        
           return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }

}
const getGformsPaging = async(req, res) =>{
    try{
     const  page =  req.params.page
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await gform.findAndCountAll({ 
             include: [country,users, regions, states, lga, hospital],
              order:[['surname', 'ASC'], ['middlename', 'ASC'], ['lastname', 'ASC']],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
           return res.status(200).json(response)
    }
    catch(err){
         return res.status(500).json({err: err.message})
    }

}
const getGformuserId = async(req, res) =>{
    try{
        const userId = req.params.userId
        const Gform = await gform.findAll({ where:{userId: userId},
            include: [country,users, regions, states, lga, hospital,gifship,gifshiptype, gifshipPackage, hmo],
            order:[['surname', 'ASC']] 
             })
        return res.status(200).json(Gform)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }

}
const getGformByuserId = async(req, res) =>{
    try{
        const userId = req.params.userId
        const Gform = await gform.findOne({ where:{userId: userId},
            include: [country,users, regions, states, lga, hospital,gifship,gifshiptype, gifshipPackage, hmo],
             order:[['surname', 'ASC']]
             })
        return res.status(200).json(Gform)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }

}
const getGform =async(req, res) =>{
   try{
        const GformId = req.params.id
        const Gform = await gform.findOne({ include:[users, states,lga,country,regions,hospital, hmo, gifship, gifshipPackage, gifshiptype],
         where:{id : GformId}})
        return res.status(200).json(Gform)
    }
    catch(err){
         return res.status(500).json({err: err.message})
    }

}

const addGform = async(req, res) =>{
try{
      const { idCode, surname,	middlename,	lastname, sex,	dob,	marital,	phone,	email, address,	bloodGroup,	countryOrigin,	regionOrigin,	stateOrigin,	lgaOrigin,	regiteredCountry,	regiteredRegion,	regiteredState,	regiteredLga,	residentCountry,	residentRegion,	residentState,	residentLga,	gifshipId,	gifshipTypeId,	nin,	hospitalId,	hmoId,	userId, gifshipPackageId, residentWard,	registeredWard,	wardOrigin} = req.body
     const col = await gform.create({ idCode, surname,	middlename,	lastname, sex,	dob,	marital,	phone,	email, address,	bloodGroup,	countryOrigin,	regionOrigin,	stateOrigin,	lgaOrigin,	regiteredCountry,	regiteredRegion,	regiteredState,	regiteredLga,	residentCountry,	residentRegion,	residentState,	residentLga,	gifshipId, gifshipTypeId,	nin,	hospitalId,	hmoId,	userId, gifshipPackageId, residentWard,	registeredWard,	wardOrigin});
    return res.status(200).json(col)
}
catch(err){
    return res.status(500).json({ err: err.errors[0].message})
}
  
   
}

const deleteGform = async(req, res) =>{
    try{
        
        const GformId = req.params.id;
        const gforms = await gform.findOne({
            where:{id : GformId}
            });
           
        const user_rrrs = await user_rrr.findOne({
            where:{userId : gforms.userId}
            });
        if(!user_rrrs){ 
        const ress = await gform.destroy({ where:{id : GformId}})
        return res.status(200).json(ress); 
         }
          return res.status(200).json("Can not delete the parent data while dependants exist.");   
        
    }
    catch(err){
        return res.status(200).json({err: err.errors[0].message})
    }
}

 const updateGform = async(req, res) =>{
   try{
        const GformId = req.params.id
       const {surname,	middlename,	lastname, sex,	dob,	marital,	phone,	email, address,	bloodGroup,	countryOrigin,	regionOrigin,	stateOrigin,	lgaOrigin,	regiteredCountry,	regiteredRegion,	regiteredState,	regiteredLga,	residentCountry,	residentRegion,	residentState,	residentLga,	gifshipId,	gifshipTypeId,	nin,	hospitalId,	hmoId,	userId, gifshipPackageId, residentWard,	registeredWard,	wardOrigin} = req.body
        const ress = await gform.findOne({ where:{id : GformId}})
        ress.surname = surname
        ress.middlename= middlename
        ress.lastname = lastname
        ress.sex = sex
        ress.dob = dob
        ress.marital = marital
        ress.phone = phone
        ress.email = email
        ress.address = address
        ress.bloodGroup = bloodGroup
        ress.countryOrigin = countryOrigin
        ress.regionOrigin = regionOrigin
        ress.stateOrigin = stateOrigin
        ress.lgaOrigin = lgaOrigin
        ress.regiteredCountry = regiteredCountry
        ress.regiteredRegion= regiteredRegion
        ress.regiteredState = regiteredState
        ress.residentCountry = residentCountry
        ress.residentRegion = residentRegion
        ress.residentState = residentState
        ress.residentLga = residentLga
        ress.gifshipId = gifshipId
        ress.gifshipTypeId = gifshipTypeId
        ress.gifshipPackageId = gifshipPackageId
        ress.nin = nin
        ress.hospitalId = hospitalId
        ress.hmoId = hmoId
        ress.userId = userId
        ress.residentWard = residentWard
        ress.registeredWard	= registeredWard
        ress.wardOrigin = wardOrigin
        ress.save().then(resp=>{
            return res.status(200).json(resp)
        })
        .catch(err=>{
             return res.status(500).json({err: err.errors[0].message})
        })
        
    }
    catch(err){
        return res.status(200).json({err: err.errors[0].message})
    }
}


module.exports = {
    getGform,
    getGforms, 
    addGform, 
    deleteGform, 
    updateGform,
    getGformuserId,
    getGformsPaging,
    getGformByuserId,
  
}