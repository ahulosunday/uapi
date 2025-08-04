const { users, patient, admission,visits,care_plan, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');
const moment = require('moment')

const getAll = async(req, res)=>{
    try{
     const patient_id = req.params.patient_id
     const data = await care_plan.findAll({
        include:[users, patient, admission,visits, users],
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

const add = async(req, res ) =>{
    try{
    const data = await care_plan.create(req.body)
    return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}


module.exports={
    getAll,
    add,

}