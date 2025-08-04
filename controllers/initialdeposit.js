const { initialdeposit, users, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging');
const { paid } = require('./prescribeddrug');
const {Op, Sequelize} = require('sequelize');

const getAll = async(req, res)=>{
	const data = await initialdeposit.findAll({
        where:{
paid: 0
        },
		include: [users ],
            order:[['id','ASC']]});
         return res.status(200).json(data);
}
const getAlls = async(req, res)=>{
	const data = await initialdeposit.findAll({
        include: [users ],
            order:[['id','ASC']]});
         return res.status(200).json(data);
}
const getOne = async(req, res)=>{
    const id = req.params.id
	const data = await initialdeposit.findOne({
		where:{
         id: id
        },
            order:[['id','ASC']]});
         return res.status(200).json(data);
}
const getByPatientId = async(req, res)=>{
    const id = req.params.patient_id
	const data = await initialdeposit.findOne({
		where:{
         patient_id: id
        },
            order:[['id','ASC']]});
         return res.status(200).json(data);
}
const getByPatientIdAll = async(req, res)=>{
    const id = req.params.patient_id
	const data = await initialdeposit.findAll({
		where:{
         patient_id: id
        },
        include: [users],
            order:[['id','ASC']]});
         return res.status(200).json(data);
}

const getUpdate = async(req, res)=>{
	const data = await initialdeposit.update(
        {
            paid: 1,
            attendedby: req.body.attendedby
        },
        {
        where:{
         id: req.body.id
        }
});
         return res.status(200).json(data);
}

const getUpdateByPatientId = async(req, res)=>{
	const data = await initialdeposit.update(
        {
            paid: 1,
            attendedby: req.body.attendedby
        },
        {
        where:{
         patient_id: req.body.patient_id
        }
});
         return res.status(200).json(data);
}
const getAdd = async(req, res)=>{
	const data = await initialdeposit.create(req.body);
         return res.status(200).json(data);
}
const getSum = async(req, res)=>{
    try{
  const id = req.params.id
  const data = await initialdeposit.findAll({
  attributes: [[sequelize.fn('SUM', sequelize.col('amount')), 'amount'],  'patient_id'], 
		 where:{
		 patient_id: id,
		 paid: 0
	   },
	   group:['patient_id']
    })
    return res.status(200).json(data)
}
    catch(err){
 return res.status(500).json({err: err.message})
    }
}
module.exports = {
getSum,
getAll,
getAdd,
getByPatientId,
getOne,
getUpdate,
getUpdateByPatientId,
getAlls,
getByPatientIdAll

}
