const { patient_insurance, insurance, hmo, patient,gifship, gifshiptype, gifshipPackage, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging');


const getOne = async(req, res)=>{
try{
	const patient_id = req.params.patient_id
	const data = await patient_insurance.findOne({
		where:{
		patient_id: patient_id
	},
	include:[insurance, hmo, patient,gifship, gifshiptype, gifshipPackage],
    order:[['id','ASC']]});
    return res.status(200).json(data);
}
catch(err){
	return res.status(500).json(err)
}
}
const getOneAll = async(req, res)=>{
	try{
		const patient_id = req.params.patient_id
		const data = await patient_insurance.findAll({
			where:{
			patient_id: patient_id
		},
		include:[insurance, hmo, patient,gifship, gifshiptype, gifshipPackage],
		order:[['id','ASC']]});
		return res.status(200).json(data);
	}
	catch(err){
		return res.status(500).json(err)
	}
	}
const getAll = async(req, res)=>{
	try{
		const data = await patient_insurance.findAll({
		include:[insurance, hmo, patient,gifship, gifshiptype, gifshipPackage],
		order:[['id','ASC']]});
		return res.status(200).json(data);
	}
	catch(err){
		return res.status(500).json(err)
	}
	}
const edit = async(req, res)=>{
	try{
     const data = await patient_insurance.update(req.body,
		{
       where:{
          id: req.body.id
	   }
		})
	 return res.status(200).json(data)
	}catch(err){
		return res.status(500).json({err: err.message})
	}
}

module.exports={
	getOne,
	edit,
	getAll,
	getOneAll
}