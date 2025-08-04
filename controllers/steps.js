const { patient,salaryscale, step,  pyrllevel, drug, prescribed_drug, hmo, insurance, users, sequelize } = require('../models');
const {Op, where }= require('sequelize')
const {getPagination, getPagingData} = require('../helpers/paging')

const getAll = async(req, res)=>{
	try{
     const data = await step.findAll(
		{
			include: [users, salaryscale, pyrllevel],
			order:[['level','ASC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getBelong = async(req, res)=>{
	try{
        const scale = req.params.scale
     const data = await pyrllevel.findAll(
		{
			include: [users, salaryscale],
			where:{
scale: scale
            }
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getBelongStep = async(req, res)=>{
	try{
        const scale = req.params.step
     const data = await step.findAll(
		{
			include: [users, salaryscale, pyrllevel],
			where:{
level: scale
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
	const id = req.params.id
	const data = await step.findOne({
		where:{
			id: id
		}
	})
	return res.status(200).json(data)
}
catch(err){
	return res.status(500).json({err: err.message})
}
}
const createAll = async (req, res) =>{
try{
const data = await step.create({
    step: req.body.step,
	level: req.body.level, 
	scale: req.body.scale, 
	entityid: req.body.entityid})
return res.status(200).json(data)
}
catch(err){
return res.status(200).json({err: err.message})
}
}
const updateOne= async (req, res) =>{
	try{
		
	const data = await step.update(
		
		{
			step: req.body.step,
            level: req.body.level,
			scale: req.body.scale,
			entityid: req.body.entityid

		},
	{
		where:{id: req.body.id}
	})
	return res.status(200).json(data)
	}
	catch(err){
	return res.status(200).json({err: err.message})
	}
	}

	const deleteOne= async (req, res) =>{
		try{
			const id = req.params.id
		const data = await step.destroy({
			where:{
				id: id}
		})
		return res.status(200).json(data)
		}
		catch(err){
		return res.status(200).json({err: err.message})
		}
		}
	
module.exports = {
getAll,
createAll,
deleteOne, 
updateOne,
getOne,
getBelong,
getBelongStep
}