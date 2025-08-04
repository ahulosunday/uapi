
const { patient, pyrlpsdetail, pyrllevel, pyrlsalary_item, staff, employeepecific, drug, prescribed_drug, hmo, insurance, users, sequelize } = require('../models');
const {Op, where }= require('sequelize')
const {getPagination, getPagingData} = require('../helpers/paging');
const bodyParser = require('body-parser');

const getAll = async(req, res)=>{
	try{
     const data = await employeepecific.findAll(
		{
			include: [users, pyrlpsdetail, pyrlsalary_item, staff],
			order:[['psection','ASC']]
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
	const data = await employeepecific.findOne({
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
const data = await employeepecific.create({
	 
	psection: req.body.psection, 
    psdetail: req.body.psdetail,
	entityid: req.body.entityid,
    amount: req.body.amount,
    employeeid: req.body.employeeid
})
    
return res.status(200).json(data)
}
catch(err){
return res.status(200).json({err: err.message})
}
}
const updateOne= async (req, res) =>{
	try{
		
	const data = await employeepecific.update(
		
		{
			
			psection: req.body.psection,
			entityid: req.body.entityid,
            amount: req.body.amount,
            psdetail: req.body.psdetail,
           employeeid: req.body.employeeid

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

	const deleteOne = async (req, res) =>{
		try{
			const id = req.params.id
		const data = await employeepecific.destroy({
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

}