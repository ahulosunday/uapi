const { account, users, account_type } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')


const getAll = async(req, res)=>{
	const data = await account.findAll({
		include: [users, account_type ],
            order:[['id','ASC']]});
         return res.status(200).json(data);

}
const getAllPagings = async(req, res)=>{
	
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await account.findAndCountAll({ 
            include: [users, account_type ], 
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
const getOneAccount = async (req, res)=>{
    try{
        const Id = req.params.id;
        const data = await account.findOne({where:{id:Id}})
        return res.status(200).json(data)

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const addAccount = async(req, res)=>{
	try{
	
	const data = await account.create({name: req.body.name, acc_type_id: req.body.acc_type_id, entity_id: req.body.entity_id, sub: req.body.sub, table_name: req.body.table_name, table_id: req.body.table_id, acc_code: req.body.acc_code, d_created: req.body.d_created});
	
	return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const deleteAccount = async(req, res)=>{
    try{
      const Id = req.params.id
      const deleteaccount = await account.destroy({where:{id:Id}})
       return res.status(200).json(deleteaccount)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const updateAccount = async(req, res)=>{
    try{
     const Id = req.params.id;
     const data = await account.findOne({where:{id: Id}});
     data.name = req.body.name,
     data.acc_type_id = req.body.acc_type_id,
     data.entity_id = req.body.entity_id,
     data.sub = req.body.sub,
     data.table_name = req.body.table_name,
     data.table_id = req.body.table_id,
     data.acc_code = req.body.acc_code
	 data.d_created = req.body.d_created
     data.save().then(rex=>{
        return res.status(200).json(data)
     })

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
module.exports = {
    updateAccount,
    deleteAccount,
	getAll,
	addAccount,
    getOneAccount,
	getAllPagings,
}
