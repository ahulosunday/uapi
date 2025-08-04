const { users, patient,antenatal_observation,visits, antenatal_account, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');

const getOne = async(req, res)=>{
    try{
        const Id = req.params.id
     const data = await antenatal_observation.findOne(
        { include:[users, patient, visits], antenatal_account,
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
const getOneByVisit = async(req, res)=>{
    try{
        const Id = req.params.visit_id
     const data = await antenatal_observation.findAll(
        { include:[users, patient, visits, antenatal_account],
            where:{ visit_id: Id},
            order:[['id','ASC']]
        }
     )
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const getAll = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
     const data = await antenatal_observation.findAll(
        { include:[users, patient, visits, antenatal_account],
            where:{ patient_id: patient_id},
            order:[['id','ASC']]
        }
     )
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

const viewByPatientId = async(req, res)=>{
    try{

        const Id = req.params.patient_id
        const data = await antenatal_observation.findOne(
           {  include:[users, patient, visits, antenatal_account],
               where: {
                patient_id: Id,

               },
               order:[['id','ASC']]
           }
        )
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const add = async(req, res)=>{
    try{
     const ad =  await antenatal_observation.create(req.body)
       return res.status(200).json(ad)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

const updates = async(req, res)=>{
    try{
    
        const updates = await antenatal_observation.update({
           // patient_id: req.body.patient_id,
    //ante_natal_id: req.body.ante_natal_id,
    //visit_id: req.body.visit_id,
    mother_condition: req.body.mother_condition,
    continuation_sheet: req.body.continuation_sheet,
    doctor_comments: req.body.doctor_comments,
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
const deletes = async(req, res)=>{
    try{
        const id = req.params.id
      const del = await antenatal_observation.destroy({
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
    viewByPatientId,
    add, 
    updates,
    deletes,
    getOneByVisit 

}