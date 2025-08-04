const { inventories, users, drug, inventory_item, request, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');

const add = async(req, res)=>{
    try{
        const data = await request.create(req.body)
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const getAll = async(req, res)=>{
    try{
    
        const data = await request.findAll({
            include: [inventories, users, drug, inventory_item],
           where:{
            status: 'Pending'
           }
        })
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const getAllDeclined = async(req, res)=>{
    try{
    
        const data = await request.findAll({
            include: [inventories, users, drug, inventory_item],
           where:{
            status: 'Declined'
           }
        })
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const getAllGranted = async(req, res)=>{
    try{
    
        const data = await request.findAll({
            include: [inventories, users, drug, inventory_item],
           where:{
            status: 'Granted'
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
        const data = await request.findOne({
             include: [inventories, users, drug, inventory_item],
           where:{
            id: id
           }
        })
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const getUpdate = async(req, res)=>{
    try{
       
        const data = await request.update({
             status: req.body.status,
             processed_by: req.body.processed_by,
             date_processed: req.body.date_processed
        },{
             where:{
            id: req.body.id
           }
        })
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const getAllById = async(req, res)=>{
    try{
          const id = req.params.id
        const data = await request.findAll({
            include: [inventories, users, drug, inventory_item],
           where:{
            requested_by: id
           }
        })
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
module.exports={
	add,
    getAll, 
    getOne,
    getUpdate,
    getAllById,
    getAllDeclined,
    getAllGranted
}
