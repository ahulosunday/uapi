const { refund, journal, ewallet, users, patient, sequelize, outpts } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { formatDate } = require('../helpers/formatDate');

const getAll = async(req, res)=>{
	const data = await refund.findAll({
            order:[['pid','ASC']]});
         return res.status(200).json(data);

}
const getAllByBatch = async(req, res)=>{
    const  refid = req.params.refid
    const  batchno = req.params.batchno
	const data = await refund.findAll({
        where:{
refid: refid,
batchno: batchno
        },
            order:[['pid','ASC']]});
         return res.status(200).json(data);

}
const getAllByBatchOly = async(req, res)=>{
    const  batchno = req.params.batchno
	const data = await refund.findAll({
        where:{
         batchno: batchno
        },
        include: [users, patient],
            order:[['pid','ASC']]});
         return res.status(200).json(data);

}
const getAllByBatchOly4outpatient = async(req, res)=>{
    const  batchno = req.params.batchno
	const data = await refund.findAll({
        where:{
         batchno: batchno
        },
        include: [users, outpts],
            order:[['pid','ASC']]});
         return res.status(200).json(data);

}
const getAllByRefid = async(req, res)=>{
    const  refid = req.params.refid
   	const data = await refund.findAll({
        where:{
refid: refid
        },
        include: [users],
            order:[['createdAt','DESC']]});
         return res.status(200).json(data);

}
const getAllPagings = async(req, res)=>{
	
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await refund.findAndCountAll({ 
			
			order:[['pid','ASC']],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(200).json({err: err.message})
    }
}
const getOne = async (req, res)=>{
    try{
        const Id = req.params.pid;
        const data = await refund.findOne({where:{pid:Id}})
        return res.status(200).json(data)

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const getAllGroupByBatch = async(req, res)=>{
	try{
	const uid = req.params.refid
	const data = await refund.findAll({
		attributes: ['pid','batchno', 'narration', 'qty', 'pmode', [sequelize.fn('SUM', sequelize.col('amount')), 'amount'], 'createdAt', 'updatedAt', 'uid','bank'],          
		include:[ users],   
			  where:{
			  refid: uid
			},
			//order:[['updatedAt', 'DESC']],
		  group:['batchno']
	  
	
	});
         return res.status(200).json(data);
}
catch(err){
	return res.status(500).json({err: err.message})
}

}
const add =async (req, res)=>{
    try{


     const data = await refund.create({narration: req.body.narration, pmode: req.body.mode, amount: req.body.amount, vdate: req.body.vdate, tdate: req.body.tdate, uid: req.body.uid, bank: req.body.bank, batchno: req.body.batchno, tablename: req.body.tablename, refid: req.body.refid, name: req.body.name, phone: req.body.phone, qty: req.body.qty })
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const bulkAdd = async(req, res)=>{
    try{
        const batch_no = new Date().getTime()
        const vdate = (new Date())
        const arr = req.body.data
        const check = req.body.chk
        var amount = 0;
        var data = {}

        const obj = arr.map((item)=>{

           amount = amount + parseFloat(item.amount);
           data.customer_id = item.refid
           data.narration = 'Being posted from refund transaction'
           data.uid = item.uid
           data.bank= item.bank
           data.pmode= item.mode
           data.vdate = vdate

            return Object.assign({
                pid: item.pid,
                narration: item.narration + ' ...#Mode of payment: ' + item.mode,
                amount: item.amount,
                vdate: vdate,
                tdate: vdate,
                uid:  item.uid,
                bank: item.bank,
                batchno: item.uid + '' + batch_no,
                refid:  item.refid,
                tablename: item.tablename,
                name: item.name,
                pmode: item.mode,
                 phone:  item.phone,
                qty:  item.qty
            })
        })

        data.amt = amount
        data.tablename = 'Patients'
        data.tableid = data.customer_id
    
        const result = await sequelize.transaction(async (t) => {
            if(check){
                await ewallet.create(data, {transaction: t})
            }
         await refund.bulkCreate(obj,{transaction: t}).then(resp=>{
            return res.status(200).json(resp)
         })
         .catch(err=>{
            return res.status(500).json({err: err.message})
         })
        })
      
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

const update = async(req, res)=>{
    try{//
     const Id = req.params.pid;
     const data = await refund.findOne({where:{pid: Id}});
     data.narration = narration
	 data.amount = req.body.amount
     data.vdate = req.body.vdate
     data.tdate = req.body.tdate
     data.uid = req.body.uid
     data.bank = req.body.bank
     data.batchno = req.body.batchno
	 data.refid = req.body.refid
	 data.tablename = req.body.tablename
	 data.name = req.body.name
     data.pmode = req.body.mode
	 data.phone = req.body.phone
	 data.qty = req.body.qty
     data.save().then(rex=>{
        return res.status(200).json(data)
     })

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

const deletes = async (req, res)=>{
    try{
        const Id = req.params.pid;
        const data = await refund.destroy({where:{pid:Id}})
        return res.status(200).json(data)

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

module.exports = {
  
	getAll,
	getAllPagings,
	add,
    update,
	getOne,
	deletes,
    bulkAdd,
    getAllByBatch,
    getAllByRefid,
    getAllByBatchOly,
    getAllGroupByBatch,
    getAllByBatchOly4outpatient
}
