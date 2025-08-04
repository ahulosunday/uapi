const { states,gform, users,country, regions, lga, hospital, councilward } = require('../models');
const jwt = require('jsonwebtoken')
const {getPagination, getPagingData } = require('../helpers/paging')


const getHospitals = async(req, res) =>{
    try{
       
        
        const data = await hospital.findAll({ 
           include: [country,users, regions, states,lga, councilward], 
            order:[['name','ASC']]
           
            })
          
        return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({ err: err.message})
    }

}
const getHospitalsPaging = async(req, res) =>{
    try{
       
        const  page =  req.params.page
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await hospital.findAndCountAll({ 
           include: [country,users, regions, states,lga, councilward], 
            order:[['name','ASC']],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
         return res.status(500).json({ err: err.message})
    }

}


const getHospital =async(req, res) =>{
   try{
        const hospitalId = req.params.id
        const hospitals = await hospital.findAll({include: [country,users, regions, states,lga], where:{id : hospitalId}})
        return res.status(200).json(hospitals)
    }
    catch(err){
         return res.status(500).json({ err: err.message})
    }

}
//,
const getHospitalWithInclude = async(req, res)=>{
try{
        const hospitalId = req.params.id
        const hospitals = await hospital.findOne({ where:{id : hospitalId}, include: [country,users, regions, states,lga, councilward]})
        return res.status(200).json(hospitals)
    }
    catch(err){
        return res.status(500).json({ err: err.message})
    }
}
const getHospitalWithLga = async(req, res)=>{
try{
        const hospitalId = req.params.countryId
        const regionIdId = req.params.regionId
        const stateIdId = req.params.stateId
        const lgaId = req.params.lgaId

        const hospitals = await hospital.findAll({ where:{countryId : hospitalId, regionId: regionIdId, stateId: stateIdId, lgaId: lgaId}, include: [country,users, regions, states,lga]})
        return res.status(200).json(hospitals)
    }
    catch(err){
         return res.status(500).json({ err: err.message})
    }
}
//
const addHospital = async(req, res) =>{
try{
    /*
    const body = { hospitalCode, name, address, phone,contactAddress, countryId, regionId, stateId,lgaId, userId, councilwardId} = req.body
    */
     const col = await hospital.create({hospitalCode: req.body.hospitalCode, name: req.body.name, address: req.body.address, phone: req.body.phone,contactAddress:req.body.contactAddress, countryId:req.body.countryId, regionId:req.body.regionId, stateId:req.body.stateId,lgaId:req.body.lgaId, userId:req.body.userId, councilwardId: req.body.wardId, email: req.body.email, bank: req.body.bank, accnumber: req.body.accnumber, sortCode: req.body.sortCode});
    
    return res.status(200).json(col);
}
catch(err){
    console.log(err.message)
    return res.status(500).json( { err: err.message} )
}
  
   
}

const deleteHospital = async(req, res) =>{
    try{
        
        const hospitalId = req.params.id
        const check = await gform.findOne({where:{hospitalId: hospitalId}})
        if(check.length === 0){
        await hospital.destroy({ where:{id : hospitalId}}).then(ress=>{
             return res.status(200).json(ress); 
        }).catch(err=>{
             return res.status(500).json({ err: "Something went wrong, can not delete ..."})
        })
          
        }
        else{
            return res.status(500).json({ err: "Already been used, can not delete ..."})
        }
    }
    catch(err){
        return res.status(200).json({ err: err.message})
    }
}

 const updateHospital = async(req, res) =>{
   try{
        const hospitalId = req.params.id
       const body = { hospitalCode, name, address, phone,contactAddress, countryId, regionId, stateId,lgaId, userId, wardId} = req.body
        const ress = await hospital.findOne({ where:{id : hospitalId}})
        ress.name = name
        ress.hospitalCode= hospitalCode
        ress.countryId = countryId
        ress.userId = userId
        ress.councilwardId = wardId
        ress.regionId = regionId
        ress.stateId = stateId
        ress.lgaId = lgaId
        ress.address = address
        ress.phone = phone
        ress.contactAddress = contactAddress
        ress.email = req.body.email
        ress.bank =  req.body.bank
        ress.accnumber = req.body.accnumber
        ress.sortCode = req.body.sortCode
        ress.save()
       .then(resp=>{
        return res.status(200).json(resp);
      }).catch(err=>{
        return res.status(200).json({ err: err.errors[0].message})
      })

    }
    catch(err){
        return res.status(200).json({ err: err.message})
    }
}

module.exports = {
    getHospitals,
    getHospital, 
    addHospital, 
    deleteHospital, 
    updateHospital,
    getHospitalWithInclude,
    getHospitalWithLga,
    getHospitalsPaging
}