
const { patient, pyrlsalary_item, salaryscale, pyrlpsdetail, pyrllevel, step, stepwide, drug, prescribed_drug, hmo, insurance, users, sequelize } = require('../models');
const {Op }= require('sequelize')
const {getPagination, getPagingData} = require('../helpers/paging');
const bodyParser = require('body-parser');

const getAll = async(req, res)=>{
	try{
     const data = await stepwide.findAll(
		{
			include: [users, pyrlsalary_item, salaryscale, pyrlpsdetail, pyrllevel, step],
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
	const data = await stepwide.findOne({
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
const data = await stepwide.create({
	 
	psection: req.body.psection, 
    psdetail: req.body.psdetail,
	entityid: req.body.entityid,
    amount: req.body.amount,
    scale: req.body.scale,
    level: req.body.level,
    steps: req.body.steps
})
    
return res.status(200).json(data)
}
catch(err){
return res.status(200).json({err: err.message})
}
}
const updateOne= async (req, res) =>{
	try{
		
	const data = await stepwide.update(
		
		{
			
			psection: req.body.psection,
			entityid: req.body.entityid,
            amount: req.body.amount,
            psdetail: req.body.psdetail,
            scale: req.body.scale,
            level: req.body.level,
            steps: req.body.steps

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
		const data = await stepwide.destroy({
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