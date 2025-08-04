const { cart, users, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');
const getAll = async(req, res)=>{
	try{
     const data = await cart.findAll(
		{
			order:[['createdAt','DESC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
} 
const getAllPagings = async(req, res)=>{
	
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
		const patient_id = req.params.pid
		const patient_table = req.params.patient_t
         const { limit, offset } = getPagination(page, per_page)
        const data = await cart.findAndCountAll({ 
			where:{
  pid:patient_id,
  patient_table: patient_table
			},
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(200).json({err: err.message})
    }
}
const getDelete = async(req, res)=>{
	try{
	const param = req.params.id;
	const table_n = req.params.table_name
	
	const data = await cart.destroy({
		where:{
			pid:param,
			patient_table: table_n

		}
	})
	return res.status(200).json(data)
}
catch(err){
	return res.status(500).json({ err: err.message})
}
}
const Bulkcreate = async (req, res) => {
    
    try {
		const result = await sequelize.transaction(async () => {
		const data = await cart.create(req.body);
		return data;
	});
        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ err: err.message})
    }
}
const getSumAmount = async(req, res)=>{
	try{
	const pId = req.params.pid
	const data = await cart.findAll({
		attributes: [
		  'pid',
		  [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
		],
		group: ['pid'],
		where:{
			pid: pId,
			patient_table: 'patient'
		}
	  });
	  return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({ err: err.message})	
	}
}
const getSumAmountDependant = async(req, res)=>{
	try{
	const pId = req.params.pid
	const data = await cart.findAll({
		attributes: [
		  'pid',
		  [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
		],
		group: ['pid'],
		where:{
			pid: pId,
			patient_table: 'dependant'
		}
	  });
	  return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({ err: err.message})	
	}
}
const getSumAmountAntenatal = async(req, res)=>{
	try{
	const pId = req.params.pid
	const data = await cart.findAll({
		attributes: [
		  'pid',
		  [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
		],
		group: ['pid'],
		where:{
			pid: pId,
			patient_table: 'antenatal'
		}
	  });
	  return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({ err: err.message})	
	}
}
const getSumAmountOutpatient = async(req, res)=>{
	try{
	const pId = req.params.pid
	const data = await cart.findAll({
		attributes: [
		  'pid',
		  [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
		],
		group: ['pid'],
		where:{
			pid: pId,
			patient_table: 'outpatient'
		}
	  });
	  return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({ err: err.message})	
	}
}
const truncateCart = async(req, res)=>{
	try{
   const data = await cart.findAll();
   if(data.length === 0){
	await cart.truncate();
	console.log('==============Cart trncated ===============')
   }
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
module.exports={
	getAll,
	getDelete,
	Bulkcreate,
	getSumAmount,
	getSumAmountDependant,
	getSumAmountAntenatal,
	getAllPagings,
	getSumAmountOutpatient,
	truncateCart


}