const { info, users, pvheader, sequelize, chart_of_account, pv_detail} = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const {Op, Sequelize} = require('sequelize');

const getOne = async(req, res)=>{
    try{
        const Id = req.params.id
	const data = await pvheader.findOne({where:{
		id:Id
	},
    include:[chart_of_account, pv_detail],
      order:[['id','DESC']]});
         return res.status(200).json(data);
}
catch(err){
    return res.status(500).json({err: err.message})
}

}
const getAll= async(req, res)=>{
	const data = await pvheader.findAll({
        include:[chart_of_account, pv_detail, users],
      order:[['id','DESC']]});
         return res.status(200).json(data);

}
const updatePvheader = async(req, res)=>{
	try{
   const data = await pvheader.update(req.body);
   return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const deletePvheader = async(req, res)=>{
	try{
       // console.log('===================================================')
        const Id = req.params.id;
        const result = await sequelize.transaction(async (t) => {
 const del = await pv_detail.destroy({where:{pv_header_id: Id}}, {transaction: t})
   const data = await pvheader.destroy({where:{id: Id}}, {transaction: t});
        })
   return res.status(200).json({data: true})
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}

}
const addPvheader = async(req, res)=>{
    try{
        let amt = []
        const header = req.body.header
        const detail = req.body.pvdetail
        let status = ''
        let errs =''
        let headerid = 0
        const obj = detail.map((r)=>{
            amt.push(r.amount)
        })
        let sum = 0;
        if(parseFloat(header.amount) === 0 ){
            status = 'Please fill the field correctly ...';
            errs ='error'
        }
        else{
        amt.forEach((a)=> sum += parseFloat(a))

       if(parseFloat(header.amount) !== sum){
       status = 'The total CREDIT must equal to DEBIT ...';
       errs ='error'
       }
       else{
const result = await sequelize.transaction(async (t) => {
   const data = await pvheader.create(header)

   const obj = detail.map((result)=>{
	return Object.assign({
    pv_header_id: data.dataValues.id,
    acc_code: result.acc_code,
    acc_number: result.acc_number,
    line_narration: result.line_narration,
    fund: result.acc_code,
    amount: result.amount,
    tdate: result.tdate,


    })
})
   const data2 = await pv_detail.bulkCreate(obj, {transaction: t})
        status ='Transaction complete successfully.'
        errs ='success'
        headerid = data.dataValues.id
})
} 
        }
   return res.status(200).json({header: status, errs: errs, ids: headerid})
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
module.exports={
	getOne,
	updatePvheader,
    getAll,
    addPvheader,
    deletePvheader,
}