const { users, insurance, gifship, gifshiptype, gifshipPackage, hmoplan, hmo, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');
const getAll = async(req, res)=>{
    try{
        const insurance_id = req.params.insurance_id
        const gifshipId = req.params.gifshipId
        const gifshipTypeId = req.params.gifshipTypeId
        const gifshipPackageId = req.params.gifshipPackageId
        const hmo_id = req.params.hmo_id
     const data = await hmoplan.findAll(
        { 
            where:{
                insurance_id: insurance_id,
                gifshipId: gifshipId,
                gifshipTypeId: gifshipTypeId,
                gifshipPackageId: gifshipPackageId,
                hmo_id: hmo_id
            },
        include:[users, insurance, gifship, gifshiptype, gifshipPackage,hmo],
          order:[['plan','ASC']]
        }
     )
     
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const getAlls = async(req, res)=>{
    
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await hmoplan.findAndCountAll({ 
            include: [users, insurance, gifship, gifshiptype, gifshipPackage,hmo ], 
            order:[['id','ASC']],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(200).json({err: err.message})
    }
}
const getOne = async(req, res)=>{
    try{
        const Id = req.params.id
     const data = await hmoplan.findOne(
        { include:[users, insurance, gifship, gifshiptype, gifshipPackage,hmo],
            where:{ id: Id},
            order:[['plan','ASC']]
        }
     )
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

const addhmoplan = async(req, res)=>{
    try{
     const add = await hmoplan.create(req.body)
     return res.status(200).json(add)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const updatehmoplan= async(req, res)=>{
    try{
        
       const updates = await hmoplan.update({
        insurance_id: req.body.insurance_id,
        gifshipId: req.body.gifshipId,
        gifshipTypeId: req.body.gifshipTypeId,
        gifshipPackageId: req.body.gifshipPackageId,
        hmo_id: req.body.hmo_id,
        staff_id: req.body.staff_id,
        plan: req.body.plan
       },
    {
        where:{
            id: req.body.id
        }
    })
    
    return res.status(200).json(updates)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const deletehmoplan = async(req, res)=>{
    try{
        const id = req.params.id
      const del = await hmoplan.destroy({
        where: {
            id: id,
          },
      })
      return res.status(200).json(del)
      
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

module.exports={
    getAll,
    getOne,
    addhmoplan,
    updatehmoplan,
    deletehmoplan,
    getAlls
}