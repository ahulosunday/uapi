const { ewallet, users, patient, sequelize, initialdeposit } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const {Op}= require('sequelize')

const getAll = async(req, res)=>{
	const data = await ewallet.findAll({
        include:[users, patient],
            order:[['custoomer_id','ASC']]});
         return res.status(200).json(data);

}
const getAllById = async(req, res)=>{
    const id = req.params.Id
    const customer_Id = req.params.customer_id
	const data = await ewallet.findAll({
		include: [users ],
        where:{
          id: id,
          customer_id: customer_Id
        },
            order:[['customer_id','ASC']]});
         return res.status(200).json(data);

}
const  getSumAmount=async(req, res)=>{
try{
    const customer_Id  = req.params.customer_Id
    const data = await ewallet.findAll({
        attributes: ['customer_id', [sequelize.fn('SUM', sequelize.col('amt')), 'amount']], 
        where:{ customer_id: customer_Id},
       
        order:[['customer_id','DESC']],
        group: ['customer_id']
    
    });
         return res.status(200).json(data);

    
}
catch(err){

}
}
const  getSumAmountByDate=async(req, res)=>{
    try{
       const sdate  = req.params.sdate
       const edate  = req.params.edate
        const data = await ewallet.findAll({
            attributes: [[sequelize.fn('SUM', sequelize.col('amt')), 'amount']],
            where:{
                updatedAt:{
                    [Op.between]:[sdate, edate]
                }
            }
            
                   
        });
             return res.status(200).json(data);
    
        
    }
    catch(err){
    
    }
    }
const getAllPerPerson = async(req, res)=>{
    try{
    const customer_Id = req.params.customer_id
	const data = await ewallet.findAll({ where:{ customer_id: customer_Id},
		include: [users ],
            order:[['updatedAt','DESC']]});
         return res.status(200).json(data);
    }
    catch(err){
        return res.status(500).json({err: err.message});
    }

}
const getAllPagings = async(req, res)=>{
	
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await ewallet.findAndCountAll({ 
            include: {model: users }, 
            order:[['customer_id','ASC']],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(200).json({err: err.message})
    }
}
const getOneewallet = async (req, res)=>{
    try{
        const Id = req.params.id;
        const data = await ewallet.findOne({where:{id:Id}
        ,include:[users, patient]
    })
        return res.status(200).json(data)

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const add = async(req, res)=>{
	try{
        var data = []
    const narration = req.body.narration + '  # [Mode of payment: ' + req.body.mode + ']'
    const result = await sequelize.transaction(async (t) => {

	const datas = await ewallet.create({customer_id: req.body.customer_id, pmode: req.body.mode, bank:req.body.bank, narration: narration, amt: req.body.amt, vdate: req.body.vdate, tablename: req.body.tablename, tableid: req.body.tableid, uid: req.body.uid}, {transaction: t});
	 if(parseFloat(req.body.amt) > 0 ){
     const initials = await initialdeposit.update( {
            paid: 1,
            attendedby: req.body.uid
        },
        {
        where:{ patient_id: req.body.customer_id }
    },
        {  transaction: t })
    

}
    data.push(datas)

})
    return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const deleteewallet = async(req, res)=>{
    try{
      const Id = req.params.id
      const deletetewallet = await ewallet.destroy({where:{id:Id}})
       return res.status(200).json(deleteewallet)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const updateewallet = async(req, res)=>{
    try{
     const Id = req.params.id;
	 customer_id, namrration, amt, vdate, tablename, tableid, uid

     const data = await ewallet.findOne({where:{id: Id}});
     data.customer_id = req.body.customer_id,
     data.namrration = req.body.namrration,
     data.amt = req.body.amt,
     data.vdate = req.body.vdate,
     data.tablename = req.body.tablename,
     data.tableid = req.body.tableid,
     data.uid = req.body.uid,
     data.bank= req.body.bank
     data.pmode= req.body.mode,
     data.save().then(rex=>{
        return res.status(200).json(data)
     })

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
module.exports = {
    updateewallet,
    deleteewallet,
	getAll,
	add,
    getOneewallet,
	getAllPagings,
    getAllPerPerson,
    getSumAmount,
    getAllById,
    getSumAmountByDate
}

