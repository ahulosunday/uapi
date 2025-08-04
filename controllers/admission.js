const { patient, cart, service,admission,observation, discharge, prescribed_service, hmo, nursing_note,  insurance, users, visits, antenatal_account, patient_insurance, ward,bed, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const {Op} = require('sequelize');
const moment = require('moment')


const getAllByPatient = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
   const data = await admission.findAll({
      include: [patient, ward,bed, visits, users, antenatal_account, patient_insurance],
    where:{
        patient_id: patient_id
    }
   })
   return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const discharged = async(req, res)=>{
    const t = await sequelize.transaction();
    try{
    const finds = await admission.findOne({
        where:{
            id: req.body.id
        }
    })
    const data = await admission.update({
        discharge_status: 'Discharged',
        comment: req.body.comment,
        should_discharge: 1,
        discharged_by: req.body.staff_id,
    },{
        where:{
            id: req.body.id
        }
    },{transaction: t})
    const d = await bed.update({
        status: 'Untaken'
    },{
        where:{
            id: finds.dataValues.bed_id
        }
    },{transaction: t})
    const charge = await discharge.create({
        patient_id: finds.dataValues.patient_id,
        ward_id: finds.dataValues.ward_id,
        admission_id: finds.dataValues.id,
        visit_id: finds.dataValues.visit_id,
        bed_id: finds.dataValues.bed_id,
        discharged_by:  req.body.staff_id,
        discharge_type: req.body.discharge_type,
        date_discharged: moment(new Date()).format('YYYY-MM-DD'),
        conditions_of_patient: req.body.conditions_of_patient,
        transfer_location: req.body.transfer_location
    },{transaction: t})
    await t.commit()
    return res.status(200).json(data)
    }catch(err){
        await t.rollback();
        return res.status(500).json({err: err.message})
    }
}
const addNusingNotes = async( req, res)=>{
    try{
        const adm = await admission.findOne({
            where:{
                id: req.body.admission_id
            }
        })
    const data = await nursing_note.create({
        patient_id: req.body.patient_id,
        admission_id: req.body.admission_id ,
        visit_id: adm.dataValues.visit_id,
        type_of_duty: req.body.type_of_duty,
        notes: req.body.notes,
        staff_id: req.body.staff_id
    })
    return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const viewNotes = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
        const data = await nursing_note.findAll({
            include: [patient, admission,visits, users],
            order:[['id','DESC']],
            where:{
                patient_id: patient_id
            }
        })
        return res.status(200).json(data)

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const dischargeHistory = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
    const data = await discharge.findAll({
        include: [patient, ward, admission, visits, users, bed],
        order:[['id','DESC']],
     where:{
        patient_id: patient_id
     }
    })
    return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const getOne = async(req, res)=>{
    try{
    const id = req.params.id
    const data = await admission.findOne({
        include: [patient, ward,bed, visits, users, antenatal_account, patient_insurance],
        where:{
            id:id
        }
    })
    return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const addObservation = async(req, res )=>{
    try{
     const data = await observation.create(req.body)
     return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const observationlist = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
    const data = await observation.findAll({
        include:[patient, visits, admission],
        order:[['id','DESC']],
        where:{
            patient_id: patient_id
        }
    })
    return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const viewByOnadmission = async (req, res)=>{
    try{
        const patient_id = req.params.patient_id
     const data = await admission.findOne({
        where:{
            patient_id: patient_id,
            discharge_status: 'On Admission'
        }
     })
     return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
module.exports ={
    viewByOnadmission,
    addNusingNotes,
    getAllByPatient,
    discharged,
    viewNotes,
    dischargeHistory,
    getOne,
    addObservation,
    observationlist
}