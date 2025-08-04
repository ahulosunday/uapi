
const { patient, pyrlsalary_item, salaryscale, pyrlpsdetail, pyrllevel, levelwide, drug, prescribed_drug, hmo, insurance, users, sequelize } = require('../models');
const {Op, where }= require('sequelize')
const {getPagination, getPagingData} = require('../helpers/paging');
const bodyParser = require('body-parser');

const getAll = async(req, res)=>{
	try{
     const data = await levelwide.findAll(
		{
			include: [users, pyrlsalary_item, salaryscale, pyrlpsdetail, pyrllevel],
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
	const data = await levelwide.findOne({
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
const data = await levelwide.create({
	 
	psection: req.body.psection, 
    psdetail: req.body.psdetail,
	entityid: req.body.entityid,
    amount: req.body.amount,
    scale: req.body.scale,
    level: req.body.level
})
    
return res.status(200).json(data)
}
catch(err){
return res.status(200).json({err: err.message})
}
}
const updateOne= async (req, res) =>{
	try{
		
	const data = await levelwide.update(
		
		{
			
			psection: req.body.psection,
			entityid: req.body.entityid,
            amount: req.body.amount,
            psdetail: req.body.psdetail,
            scale: req.body.scale,
            level: req.body.level

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
		const data = await levelwide.destroy({
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