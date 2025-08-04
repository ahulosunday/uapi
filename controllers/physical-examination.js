const { users, physical_exam, patient, visits, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');
const getAll = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
     const data = await physical_exam.findAll(
        { 

            where:{
                patient_id: patient_id
            },
            include:[users, patient, visits ],
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
     const data = await physical_exam.findOne(
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

const addphysical_exam = async(req, res)=>{
    try{
     const add = await physical_exam.create(req.body)
     return res.status(200).json(add)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const updatephysical_exam= async(req, res)=>{
    try{
        
       const updates = await physical_exam.update({
        appearance: req.body.appearance,
    heent: req.body.heent,
    cardiavascular: req.body.cardiavascular,
    respiration: req.body.respiration,
    gestrointestinal: req.body.gestrointestinal,
    gynecology: req.body.gynecology,
    musculoskeleton: req.body.musculoskeleton,
    neurological: req.body.neurological,
    skin: req.body.skin,
    staff_id: req.body.staff_id,
    patient_id: req.body.patient_id,
    visits_id: req.body.visits_id
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
const deletephysical_exam = async(req, res)=>{
    try{
        const id = req.params.id
      const del = await physical_exam.destroy({
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
    addphysical_exam,
    updatephysical_exam,
    deletephysical_exam
}