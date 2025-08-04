const { drug, dosage_form,  users, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');
const getAll = async(req, res)=>{
    try{
     const data = await dosage_form.findAll(
        { include:[users],
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
     const data = await dosage_form.findOne(
        { where:{ id: Id},
            order:[['name','ASC']]
        }
     )
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

const addDosageForm = async(req, res)=>{
    try{
     const add = await dosage_form.create(req.body)
     return res.status(200).json(add)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const updateDosaForm = async(req, res)=>{
    try{
        
       const updates = await dosage_form.update({
        name: req.body.name,
        staff_id: req.body.staff_id
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
const deleteDosageForm = async(req, res)=>{
    try{
        const id = req.params.id
      const del = await dosage_form.destroy({
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
    addDosageForm,
    updateDosaForm,
    deleteDosageForm
}