
const { patient, pyrlsalary_item, pyrlpsdetail, drug, prescribed_drug, hmo, insurance, users, sequelize } = require('../models');
const {Op, where }= require('sequelize')
const {getPagination, getPagingData} = require('../helpers/paging')

const getAll = async(req, res)=>{
	try{
     const data = await pyrlpsdetail.findAll(
		{
			include: [users, pyrlsalary_item],
			order:[['name','ASC']]
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
	const data = await pyrlpsdetail.findOne({
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

const getLookup = async(req, res)=>{
	try{
	const id = req.params.id
	const data = await pyrlpsdetail.findAll({
		where:{
			psection: id
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
const data = await pyrlpsdetail.create({
	name: req.body.name, 
	psection: req.body.psection, 
	entityid: req.body.entityid})
return res.status(200).json(data)
}
catch(err){
return res.status(200).json({err: err.message})
}
}
const updateOne= async (req, res) =>{
	try{
		
	const data = await pyrlpsdetail.update(
		
		{
			name: req.body.name,
			psection: req.body.psection,
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
		const data = await pyrlpsdetail.destroy({
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
getLookup, 

}