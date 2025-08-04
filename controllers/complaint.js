const { patient, visits, complaint, insurance, users, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const {Op} = require('sequelize')

const getAll = async(req, res)=>{
    try{
        const patient_id= req.params.patient_id
      const data = await complaint.findAll({
        where:{
            patient_id : patient_id
        },
        include:[patient, visits, users],
        order:[['id','ASC']]
      })
      return res.status(200).json(data)
    }catch(err){
return res.status(500).json({err: err.message})
    }
}

const getOne = async(req, res)=>{
    try{
        const id = req.params.id
      const data = await complaint.findOne({
        where:{
            id : id
        },
        order:[['id','ASC']]
      })
      return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

const updateComplaint = async(req, res)=>{
    try{
      const data =await complaint.update({
    complaint: req.body.complaint,
    frequency: req.body.frequency,
    notes: req.body.notes,
    frequency_number: req.body.frequency_number,
    staff_id: req.body.staff_id,
    visit_id: req.body.visit_id,
    patient_id: req.body.patient_id,
    patient_insurance_id: req.body.patient_insurance_id
      },

       {where:{
            id : id
        }
      })
      return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

const addComplaint = async(req, res)=>{
    try{
       const result = await sequelize.transaction(async (t) => {
         const con =   await complaint.create({
            complaint: req.body.complaint,
            frequency: req.body.frequency,
            notes: req.body.notes,
            frequency_number: req.body.frequency_number,
            staff_id: req.body.staff_id,
            visit_id: req.body.visit_id,
            patient_id: req.body.patient_id,
            patient_insurance_id: req.body.patient_insurance_id
            },
            {transaction: t}
        )
            .then(results=>{
                return res.status(200).json(results)
            })
            .catch(ree=>{
        
             return res.status(500).json({err: ree.message})
            })
            
        })
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

const deleteComplaint = async(req, res)=>{
    try{
    const del = await complaint.destroy({
        where:{
            id: req.body.id
        }
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
        updateComplaint,
        addComplaint,
        deleteComplaint
    }