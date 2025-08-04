const { patient, visits, diagnose,patient_insurance,icpc2_diseases,icd10_disease, users, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');

const getAllByPatient = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
     const data = await diagnose.findAll(
        {include:[users, patient, visits, icd10_disease, icpc2_diseases],
            order:[['id','ASC']],
            where:{
                patient_id: patient_id,
                type: 'ICD10'
            }
        }
     )
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const getAllByPatientICPC = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
     const data = await diagnose.findAll(
        {include:[users, patient, visits, icd10_disease, icpc2_diseases],
            order:[['id','ASC']],
            where:{
                patient_id: patient_id,
                type: 'ICPC2'
            }
        }
     )
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

const getAllByVisit = async(req, res)=>{
    try{
       
        const visit_id = req.params.visit_id
     const data = await diagnose.findAll(
        { include:[users, patient, visits, icd10_disease, icpc2_diseases],
            order:[['createdAt','DESC']],
            where:{
                visit_id: visit_id,
                type: 'ICD10'
            }
        }
     )
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

const getAllByVisitICPC = async(req, res)=>{
    try{
       
        const visit_id = req.params.visit_id
     const data = await diagnose.findAll(
        { include:[users, patient, visits, icd10_disease, icpc2_diseases],
            order:[['createdAt','DESC']],
            where:{
                visit_id: visit_id,
                type: 'ICPC2'
            }
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
     const data = await diagnose.findOne(
        { where:{ id: Id},
            order:[['id','ASC']],
            include:[users, patient, visits, icd10_disease, icpc2_diseases]
        }
     )
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

const add = async(req, res)=>{
    try{
        const insure = await patient_insurance.findOne({
         where:{
            patient_id: req.body.patient_id
         }
        })
        

     const add = await diagnose.create(req.body)
      if(insure ===null){

      }else{
     const con = await diagnose.update({
        patient_insurance_id: insure.dataValues.id
     },{
        where:{
            id: add.dataValues.id
        }
     })
    }
     return res.status(200).json(add)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const update = async(req, res)=>{
    try{
        
       const updates = await diagnose.update({
        diagnosis_id: req.body.diagnosis_id,
        certainty: req.body.certainty,
        notes: req.body.notes,
        type: req.body.type,
        visit_id: req.body.visit_id,
        staff_id: req.body.staff_id,
        patient_id: req.body.patient_id,
        patient_insurance_id: req.body.patient_insurance_id
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
      const del = await diagnose.destroy({
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

    getAllByPatient,
    getOne,
    getAllByVisit,
    add,
    update,
    deletes,
    getAllByPatientICPC,
    getAllByVisitICPC
}