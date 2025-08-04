const { inventories, users } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')

const getAll = async(req, res)=>{
	try{
     const data = await inventories.findAll(
		{
			order:[['name','ASC']]
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
         const { limit, offset } = getPagination(page, per_page)
        const data = await inventories.findAndCountAll({ 
			order:[['name','ASC']],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(200).json({err: err.message})
    }
}
const getOne = async(req, res)=>{
	try{
		const Id = req.params.id
     const data = await inventories.findOne(
		{ where:{ id: Id},
			order:[['name','ASC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}


const addInventory = async(req, res)=>{
    try{
     const add = await inventories.create(req.body)
     return res.status(200).json(add)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const updateInventory = async(req, res)=>{
    try{
        
       const updates = await inventories.update({
		name: req.body.name,
		refill_level: req.body.refill_level,
		accepted_drug_type: req.body.accepted_drug_type,
		desc: req.body.desc,
		staff_id: req.body.staff_id
       },
    {
        where:{
            id: req.body.id
        }
    })
    
    return res.status(200).json(updates)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const deleteInventory = async(req, res)=>{
    try{
        const id = req.params.id
      const del = await inventories.destroy({
        where: {
            id: id,
          },
      })
      return res.status(200).json(del)
      
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}


module.exports={
	getAll,
	getOne,
	getAllPagings,
	addInventory,
	updateInventory,
	deleteInventory
}