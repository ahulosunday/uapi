const { bank, users } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')

const getAll = async(req, res)=>{
	const data = await bank.findAll({
		include: [users ],
            order:[['id','ASC']]});
         return res.status(200).json(data);
}
const getAllPagings = async(req, res)=>{
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await bank.findAndCountAll({ 
            include: {model: users }, 
            order:[['acc_name','ASC']],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(200).json({err: err.message})
    }
}
const getOneBank = async (req, res)=>{
    try{
        const Id = req.params.id;
        const data = await bank.findOne({where:{id:Id}})
        return res.status(200).json(data)

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const add = async(req, res)=>{
	try{
	
	const data = await bank.create({acc_name: req.body.acc_name, acc_number: req.body.acc_number, acc_type: req.body.acc_type, bank: req.body.bank, entity_id: req.body.entity_id, chart_of_account_id: req.body.chart_of_account_id, tdate: req.body.tdate});
	
	return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const deletebank = async(req, res)=>{
    try{
      const Id = req.params.id
      const deletetBank = await bank.destroy({where:{id:Id}})
       return res.status(200).json(deletebank)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const updateBank = async(req, res)=>{
    try{
     const Id = req.params.id;
     const data = await bank.findOne({where:{id: Id}});
     data.acc_name = req.body.acc_name,
     data.acc_number = req.body.acc_number,
     data.acc_type = req.body.acc_type,
     data.bank = req.body.bank,
     data.entity_id = req.body.entity_id,
     data.chart_of_account_id = req.body.chart_of_account_id,
     data.tdate = req.body.tdate
     data.save().then(rex=>{
        return res.status(200).json(data)
     })

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
module.exports = {
    updateBank,
    deletebank,
	getAll,
	add,
    getOneBank,
	getAllPagings,
}
