const { users, patient,antenatal_account,visits, admission,
    delivery, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');

const getOne = async(req, res) =>{
    try{
        const id = req.params.id
        const data = await delivery.findOne({

            include:[users, patient,antenatal_account,visits, admission],
            where:{
                id: id
            }
        })
        return res.status(200).json(data)

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

const getAll = async(req, res) =>{
    try{
        const id = req.params.patient_id
        const data = await delivery.findAll({
           include:[users, patient,antenatal_account,visits, admission],
            where:{
                patient_id: id
            },
            order: [['id', 'DESC']]
        })
        return res.status(200).json(data)

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

const add = async(req, res) =>{
    try{
    const data = await delivery.create(req.body)
        return res.status(200).json(data)

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

module.exports={
    getAll, 
    getOne,
    add,
}

