const { users, ward, service, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');

const getAll = async(req, res)=>{
    try{
     const data = await ward.findAll(
        { include:[users, service],
          order:[['name','ASC']]
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
     const data = await ward.findOne(
        { include:[users, service],
            where:{ id: Id},
            order:[['name','ASC']]
        }
     )
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

const addWard = async(req, res)=>{
    try{
     const add = await ward.create(req.body)
     return res.status(200).json(add)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const updateWard= async(req, res)=>{
    try{
       
       const updates = await ward.update({
        name: req.body.name,
        staff_id: req.body.staff_id,
        service_id: req.body.service_id,
        occupant_type: req.body.occupant_type
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
const deleteWard = async(req, res)=>{
    try{
        const id = req.params.id
      const del = await ward.destroy({
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
    addWard,
    updateWard,
    deleteWard
}