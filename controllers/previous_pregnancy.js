const { users, antenatal_account,previous_pregnancy, patient, visits, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');
const getAll = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
     const data = await previous_pregnancy.findAll(
        {
             where:{
           patient_id: patient_id
        },
            include:[users,patient,antenatal_account ],
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
     const data = await previous_pregnancy.findOne(
        { include:[users, patient, antenatal_account],
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
const add = async(req, res)=>{
    try{
     const adds = await previous_pregnancy.create(req.body)
     return res.status(200).json(adds)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const updates= async(req, res)=>{
    try{
        
       const updates = await previous_pregnancy.update({
        patient_id: req.body.patient_id,
        ante_natal_id: req.body.ante_natal_id,
        year: req.body.year,
        delivery_place: req.body.delivery_place,
        maturity: req.body.maturity,
        duration: req.body.duration,
        delivery_type: req.body.delivery_type,
        weight: req.body.weight,
        sex: req.body.sex,
        fate: req.body.fate,
        baby_type: req.body.baby_type,
        puerperium: req.body.puerperium,
        staff_id: req.body.staff_id,
        date_added: req.body.date_added
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
      const del = await previous_pregnancy.destroy({
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
    add,
    updates,
    deletes
}