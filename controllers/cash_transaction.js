const { cash_transaction, journal, users } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')


const getAll = async(req, res)=>{
	const data = await cash_transaction.findAll({
		include: [journal],
            order:[['id','ASC']]});
         return res.status(200).json(data);

}
const getAllPagings = async(req, res)=>{
	
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await cash_transaction.findAndCountAll({ 
			include: [journal ],
			order:[['id','ASC']],
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
        const Id = req.params.id;
        const data = await cash_transaction.findOne({where:{id:Id}})
        return res.status(200).json(data)

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const add =async (req, res)=>{
    try{
     const data = await cash_transaction.create({bank_id: req.body.bank_id, description: req.body.description, ampunt: req.body.amount, vdate: req.body.vdate, tdate: req.body.tdate, entity_id: req.body.entity_id, jid: req.body.jid, jid2: req.body.jid2})
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

const update = async(req, res)=>{
    try{//
     const Id = req.params.id;
     const data = await cash_transaction.findOne({where:{id: Id}});
     data.bank_id = bank_id
	 data.description = req.body.description
	 data.amount = req.body.amount
     data.vdate = req.body.vdate
     data.tdate = req.body.vdate
     data.entity_id = req.body.entity_id
     data.jid = req.body.jid
     data.jid2 = req.body.jid2
     data.save().then(rex=>{
        return res.status(200).json(data)
     })

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
	getOne
}
