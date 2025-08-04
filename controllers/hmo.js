const { hmo,gform, users, country, regions, states,lga, councilward,  insurance, gifship, gifshipPackage, gifshiptype } = require('../models');
const jwt = require('jsonwebtoken')
const {getPagination, getPagingData }= require('../helpers/paging');

const getHmos = async(req, res) =>{
    try{
       
        const data = await hmo.findAll({ 
            include: [insurance,country,regions,states,lga,councilward, gifship, gifshipPackage, gifshiptype], 
            order:[['name','ASC'], ['hmo_num','ASC']]
            })
        return res.status(200).json(data);
    }
    catch(err){
       return res.status(500).json({ err: err.message})
    }

}
const getHmo4Plan = async(req, res) =>{
    try{
        const insurance_id = req.params.insurance_id
        const gifshipId = req.params.gifshipId
        const gifshipTypeId = req.params.gifshipTypeId
        const gifshipPackageId = req.params.gifshipPackageId

        const data = await hmo.findAll({
            where:{
                insurance_id: insurance_id,
                gifshipId: gifshipId,
                gifshipTypeId: gifshipTypeId,
                gifshipPackageId: gifshipPackageId,
            } ,
            include: [insurance,country,regions,states,lga,councilward, gifship, gifshipPackage, gifshiptype], 
            order:[['name','ASC'], ['hmo_num','ASC']]
            })
        return res.status(200).json(data);
    }
    catch(err){
       return res.status(500).json({ err: err.message})
    }

}
const getHmosByInsurance = async(req, res) =>{
    try{
       const insurance_id = req.params.insurance_id
        const data = await hmo.findAll({ 
            include: [insurance,country,regions,states,lga,councilward, gifship, gifshipPackage, gifshiptype], 
            where:{
insurance_id: insurance_id
            },
            order:[['name','ASC'], ['hmo_num','ASC']]
            })
        return res.status(200).json(data);
    }
    catch(err){
       return res.status(500).json({ err: err.message})
    }

}
const getHmoAll = async(req, res) =>{
    try{
        const  page =  req.params.page
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await hmo.findAndCountAll({ 
            include: [insurance, country,regions,states,lga,councilward, gifship, gifshipPackage, gifshiptype], 
            order:[['insurance_id'],['name','ASC'], ['hmo_num','ASC']],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(500).json({ err: err.message})
    }

}

const getHmo =async(req, res) =>{
   try{
        const HmoId = req.params.id
        const Hmos = await hmo.findOne({ 
        where:{id : HmoId},
        include: [insurance, country,regions,states,lga,councilward, gifship, gifshipPackage, gifshiptype],
        order:[['name','ASC'], ['hmo_num','ASC']]
        })
        return res.status(200).json(Hmos)
    }
    catch(err){
        return res.status(500).json({ err: err.message})
    }

}
const lookupHmo =async(req, res) =>{
    try{
         const HmoId = req.params.id
         const Hmos = await hmo.findOne({ 
         where:{id : HmoId}
         })
         return res.status(200).json(Hmos)
     }
     catch(err){
         return res.status(500).json({ err: err.message})
     }
 
 }
const addHmo = async(req, res) =>{
try{
     const col = await hmo.create({ name: req.body.name , hmo_num: req.body.hmo_num,staff_id: req.body.staff_id,insurance_id: req.body.insurance_id, address:req.body.address, phone: req.body.phone, email: req.body.email, countryId: req.body.countryId, regionId:req.body.regionId,stateId:req.body.stateId, lgaId: req.body.lgaId,councilwardId:req.body.wardId, types:req.body.types, gifshipId: req.body.gifshipId, gifshipPackageId:req.body.gifshipPackageId, gifshipTypeId:req.body.gifshipTypeId});
    return res.status(200).json(col)
}
catch(err){
    return res.status(500).json({ err: err.message})
}
  
   
}

const deleteHmo = async(req, res) =>{
    try{
       
        const HmoId = req.params.id
        const check = await gform.findOne({where:{hmoId: HmoId}})
             if(!check){
        await hmo.destroy({ where:{id : HmoId}}).then(ress=>{
            return res.status(200).json(ress);
        
        }).catch(err=>{
             return res.status(500).json({ err: 'Unable to delete data already used'})
        })

    }
    else{
return res.status(500).json({ err: 'Unable to delete data already used'})
    }
    }
    catch(err){
      
       return res.status(500).json({ err: err.message})
    }
}

 const updateHmo = async(req, res) =>{
   try{
        const HmoId = req.params.id
        const {name, hmo_num, staff_id, insurance_id, address, phone, email, countryId, regionId,stateId,lgaId,wardId, types,gifshipId, gifshipPackageId, gifshipTypeId } = req.body
        const ress = await hmo.findOne({ where:{id : HmoId}})
        ress.name = name
        ress.hmo_num= hmo_num
        ress.insurance_id = insurance_id
        ress.staff_id = staff_id
        ress.address = address
        ress.phone = phone
        ress.email=email
        ress.countryId = countryId
        ress.regionId = regionId
        ress.stateId = stateId
        ress.lgaId = lgaId
        ress.councilwardId = wardId
        ress.types = types //
        ress.gifshipId = gifshipId
        ress.gifshipPackageId = gifshipPackageId
         ress.gifshipTypeId  = gifshipTypeId
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
const bulkCreates = async(req, res)=>{
  try{
        const data = await hmo.bulkCreate(req.body)
        return res.status(200).json(data);
        //SET `staff_id` = '1', `insurance_id` = '1', `gifshipId` = '1', `gifshipTypeId` = '1', `gifshipPackageId` = '1' WHERE (`id` > 0);
    }
    catch(err){
       return res.status(500).json({ err: err.message})
    }
}

module.exports = {
    bulkCreates,
    getHmos,
    getHmo, 
    addHmo, 
    deleteHmo, 
    updateHmo,
    getHmoAll,
    lookupHmo,
    getHmosByInsurance,
    getHmo4Plan
    
}