const { drug, measurement, dosage_form,  users, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op, where } = require('sequelize');
const getAll = async(req, res)=>{
    try{
     const data = await measurement.findAll(
        {  include:[users, dosage_form ],
            order:[['name','ASC']]
        }
     )
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

const getAllByDosage = async(req, res)=>{
    try{
        const dosage_form_id = req.params.dosage_form_id
     const data = await measurement.findAll(
        {  include:[users, dosage_form ],
            order:[['name','ASC']],
            where:{
                dosage_form_id: dosage_form_id
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
     const data = await measurement.findOne(
        { where:{ id: Id},
            order:[['name','ASC']]
        }
     )
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

const addmeasurement = async(req, res)=>{
    try{
     const add = await measurement.create(req.body)
     return res.status(200).json(add)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const updatemeasurement = async(req, res)=>{
    try{
        
       const updates = await measurement.update({
        name: req.body.name,
        staff_id: req.body.staff_id,
        dosage_form_id: req.body.dosage_form_id
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
const deletemeasurement = async(req, res)=>{
    try{
        const id = req.params.id
      const del = await measurement.destroy({
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
    addmeasurement,
    updatemeasurement,
    deletemeasurement,
    getAllByDosage
}