const {visits, patient, antenatal_account, test,units, test_prescription, test_sample, users, triage, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');

const getAll = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
 const data = await test_prescription.findAll({
            where:{
                patient_id: patient_id
            },
            order:[['id','DESC']]
            
 })
 return res.status(200).json(data)
    }catch(err){
     return res.status(500).json({err: err.message})
    }
}
const getAllVisitpatient = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
        const visit_id = req.params.visit_id
 const data = await test_prescription.findAll({
            where:{
                patient_id: patient_id,
                visit_id: visit_id
            },
            include:[visits, users, patient, antenatal_account],
            order:[['id','DESC']]
            
 })
 return res.status(200).json(data)
    }catch(err){
     return res.status(500).json({err: err.message})
    }
}
const getOne = async(req, res)=>{
    try{
        const id = req.params.id
        const data = await test_prescription.findOne({
            include: [users,visits],
            where:{
                id: id
            }
        }) 
        return res.status(200).json(data)

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}


module.exports={
    getAll,
    getAllVisitpatient,
    getOne
}