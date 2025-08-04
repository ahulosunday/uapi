const { patient, visits, service,initialdeposit, users, surgery_request, surgery, surgery_procedure, sequelize } = require('../models');
const {Op }= require('sequelize')
const {getPagination, getPagingData} = require('../helpers/paging')
const moment = require('moment')
const surgerGetAll = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
   const data = await surgery_request.findAll({
    include: [patient, visits, service, users],
    order: [['id', 'DESC']],
    where:{
        patient_id: patient_id
    }
   })
   return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

const surgerGetOne = async (req, res) =>{
    try{
        const id = req.params.id
     const data = await surgery_request.findOne({
        include: [patient, visits, service, users],
    order: [['id', 'DESC']],
    where:{
        id: id
    }
     })
     return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const add = async(req, res) =>{
     const t = await sequelize.transaction();
   try{
    
    const data = await surgery_request.create(req.body,{ transaction: t})
    if(req.body.deposit !== ''){
    const sec = await initialdeposit.create({
         description: 'Initial Deposit for surgery',
    amount: req.body.deposit,
    paid: 0,
    date: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
    patient_id: req.body.patient_id,
    patient_type: req.body.patient_type,
    hospital_id: 1,
    editedby: req.body.staff_id,
    }, {transaction: t})
}
    await t.commit();
    return res.status(200).json(data)
   }catch(err){
    await t.rollback()
    return res.status(500).json({err: err.message})
   }
}
const deletes = async(req, res)=>{
     try{
    const data = await surgery_request.destroy({
        where:{
            id: req.body.id
        }
    })
    return res.status(200).json(data)
   }catch(err){
    return res.status(500).json({err: err.message})
   }
}
const surgery_procedureAdd = async(req, res)=>{
    try{
       const data = await surgery_procedure.create(req.body)
       return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

const Surgery_procedure = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
       const data = await surgery_procedure.findAll({
        include: [patient, visits, surgery_request,users],
        order: [['id', 'DESC']],
        where:{
            patient_id: patient_id
        }
       })
       return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}


module.exports={
    surgery_procedureAdd,
    surgerGetAll,
    Surgery_procedure,
    surgerGetOne,
    add,
    deletes


}


