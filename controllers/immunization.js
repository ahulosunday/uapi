const {immunization, patient, users, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');

const viewAll = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
        const data = await immunization.findAll({
            include:[patient, users],
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
const viewOne = async(req, res) =>{
     try{
        const id = req.params.id
        const data = await immunization.findOne({
            include:[patient, users],
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
const viewOneByPatient = async(req, res) =>{
     try{
        const id = req.params.patient_id
        const data = await immunization.findOne({
            include:[patient, users],
            order: [['id', 'DESC']],
            where:{
                patient_id: id
            }
        })
    return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const add = async(req, res) =>{
     try{
        const data = await immunization.create(req.body)
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }

}
const updatedAt6weeks = async(req, res) =>{
     try{
        const data = await immunization.update({
            at_six_weeks: req.body.at_six_weeks
        },{
            where:{
                patient_id: req.body.patient_id
            }
        })
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }

}
const updatedAt10weeks = async(req, res) =>{
     try{
        console.log(req.body)
        const data = await immunization.update({
            at_ten_weeks: req.body.at_ten_weeks
        },{
            where:{
                patient_id: req.body.patient_id
            }
        })
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }

}
const updatedAt14weeks = async(req, res) =>{
     try{
        const data = await immunization.update({
            at_fourteen_weeks: req.body.at_fourteen_weeks
        },{
            where:{
                patient_id: req.body.patient_id
            }
        })
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }

}
const updatedAt6months = async(req, res) =>{
     try{
        const data = await immunization.update({
            at_six_months: req.body.at_fourteen_weeks
        },{
            where:{
                patient_id: req.body.patient_id
            }
        })
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }

}
const updatedAt9months = async(req, res) =>{
     try{
        const data = await immunization.update({
            at_nine_months: req.body.at_fourteen_weeks
        },{
            where:{
                patient_id: req.body.patient_id
            }
        })
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }

}
const updatedAt1year = async(req, res) =>{
     try{
        const data = await immunization.update({
            at_one_year: req.body.at_fourteen_weeks
        },{
            where:{
                patient_id: req.body.patient_id
            }
        })
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }

}
const updatedAt15months = async(req, res) =>{
     try{
        const data = await immunization.update({
            at_fifteen_months: req.body.at_fourteen_weeks
        },{
            where:{
                patient_id: req.body.patient_id
            }
        })
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }

}
const updatedAt2years = async(req, res) =>{
     try{
        const data = await immunization.update({
            at_two_years: req.body.at_fourteen_weeks
        },{
            where:{
                patient_id: req.body.patient_id
            }
        })
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }

}

const closeImmunization = async(req, res) =>{
     try{
        console.log(req.body)
        const data = await immunization.update({
            status: req.body.status
        },{
            where:{
                patient_id: req.body.patient_id
            }
        })
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }

}

module.exports={
    updatedAt2years,
    closeImmunization,
    updatedAt15months,
    updatedAt1year,
    updatedAt9months,
    updatedAt14weeks,
    updatedAt6months,
    viewAll,
    updatedAt10weeks,
    updatedAt6weeks,
    viewOne,
    add,
    viewOneByPatient,
}