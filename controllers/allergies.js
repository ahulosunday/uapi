const { users, allergy, patient, visits, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');
const getAll = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
     const data = await allergy.findAll(
        { where:{
           patient_id: patient_id
        },
            include:[users,patient, visits ],
          order:[['id','ASC']]
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
     const data = await allergy.findOne(
        { include:[users, patient, visits],
            where:{ id: Id},
            order:[['id','ASC']]
        }
     )
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const addAllergy = async(req, res)=>{
    try{
     const add = await allergy.create(req.body)
     return res.status(200).json(add)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const updateAllergy= async(req, res)=>{
    try{
        
       const updates = await allergy.update({
        patient_id: req.body.patient_id,
        notes: req.body.notes,
        staff_id: req.body.staff_id,
        allergen: req.body.allergen,
        comment: req.body.comment
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
const deleteAllergy = async(req, res)=>{
    try{
        const id = req.params.id
      const del = await allergy.destroy({
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
    addAllergy,
    updateAllergy,
    deleteAllergy
}