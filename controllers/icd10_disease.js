const { users, patient, icd10_disease, visits, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');

const getAll = async(req, res)=>{
    try{    
        const id = req.params.id
           const data = await icd10_disease.findAll({
            where:{
            diagnosis: { [Op.like]: `%${id}%`}
            },
          order:[['diagnosis','ASC']],
          limit: 1000,
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
     const data = await icd10_disease.findOne({
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
const getOneByName = async(req, res)=>{
    try{
        const Id = req.params.id
     const data = await icd10_disease.findOne({
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

const addicd10_disease = async(req, res)=>{
    try{
     const add = await icd10_disease.create(req.body)
     return res.status(200).json(add)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

   
const deleteicd10_disease = async(req, res)=>{
    try{
        const id = req.params.id
      const del = await icd10_disease.destroy({
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
    addicd10_disease,
    deleteicd10_disease,
    getOneByName
}