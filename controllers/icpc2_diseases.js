const { users, patient, icpc2_diseases, visits, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op, Sequelize } = require('sequelize');

const getAll = async(req, res)=>{
    try{    
        const id = req.params.id
           const data = await icpc2_diseases.findAll({
            where:{
            subcode: id
            },
          order:[['id','ASC']],
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
     const data = await icpc2_diseases.findOne({
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
     const data = await icpc2_diseases.findOne({
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
const getNameGroup = async(req, res)=>{
    try{
     const data = await icpc2_diseases.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('subcode')), 'subcode']],
      where: { is_active: true 
        },
        order:[['subcode','ASC']], 
    })
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const addicpc2_diseases = async(req, res)=>{
    try{
     const add = await icpc2_diseases.create(req.body)
     return res.status(200).json(add)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
 
const deleteicpc2_diseases = async(req, res)=>{
    try{
        const id = req.params.id
      const del = await icpc2_diseases.destroy({
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
const bulkCreates = async(req, res)=>{
    try{
       
        const data = await icpc2_diseases.bulkCreate(req.body)
        return res.status(200).json(data);
        //SET `staff_id` = '1', `insurance_id` = '1', `gifshipId` = '1', `gifshipTypeId` = '1', `gifshipPackageId` = '1' WHERE (`id` > 0);
    }
    catch(err){
       return res.status(500).json({ err: err.message})
    }
}

module.exports={
    bulkCreates,
    getNameGroup,
    getAll,
    getOne,
    addicpc2_diseases,
    deleteicpc2_diseases,
    getOneByName
}