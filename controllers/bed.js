const { users, bed, ward, service, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');
const getAll = async(req, res)=>{
    try{
     const data = await bed.findAll(
        { include:[users, ward],
          order:[['code','ASC']]
        }
     )
     
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const getOne = async(req, res)=>{
    try{
        const Id = req.params.id
     const data = await bed.findOne(
        { include:[users, ward],
            where:{ id: Id},
            order:[['code','ASC']]
        }
     )
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

const addBed = async(req, res)=>{
    try{
     const add = await bed.create(req.body)
     return res.status(200).json(add)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const updateBed= async(req, res)=>{
    try{
        
       const updates = await bed.update({
    bed_type: req.body.bed_type,
    code: req.body.code,
    status: req.body.status,
    staff_id: req.body.staff_id,
    ward_id: req.body.ward_id
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
const deleteBed = async(req, res)=>{
    try{
        const id = req.params.id
      const del = await bed.destroy({
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
const findByWard = async(req, res)=>{
    try{
        const ward_id = req.params.ward_id
  const data =  await bed.findAll({
       include:[users, ward],
        order:[['ward_id','DESC']], 
    where:{
        ward_id: ward_id,
        status: 'Untaken'
    }
  })
  return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

module.exports={
    findByWard,
    getAll,
    getOne,
    addBed,
    updateBed,
    deleteBed
}