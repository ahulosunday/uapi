//name, description, price, staff_id, imaging_id, code, ninvestigation_id
const { nhisinvestigation, users, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const {Op} = require('sequelize')
const getAll = async(req, res)=>{
	try{
     const data = await nhisinvestigation.findAll(
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
        const data = await nhisinvestigation.findAndCountAll({ 
			
			order:[['ninvestigation_id','ASC']],
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
		const Id = req.params.ninvestigation_id
     const data = await nhisinvestigation.findOne(
		{ where:{ ninvestigation_id: Id},
			order:[['name','ASC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getAllPagingexclude = async(req, res)=>{
	
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await nhisinvestigation.findAndCountAll({ 
            attributes:['ninvestigation_id', 'name','code', 'price', 'createdAt', 'updatedAt'],
            where:{
                ninvestigation_id:{
                    [Op.notIn]: sequelize.literal(
                        `(select mappingcode from mappings where tablename = 'NhisInvestigation')`
                    )

                }
            },
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
const getAllPaginginclude = async(req, res)=>{
	
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await nhisinvestigation.findAndCountAll({ 
            attributes:['ninvestigation_id', 'name','code', 'price', 'createdAt', 'updatedAt'],
            where:{
                ninvestigation_id:{
                    [Op.in]: sequelize.literal(
                        `(select mappingcode from mappings where tablename = 'NhisInvestigation')`
                    )

                }
            },
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

module.exports={
	getAll,
	getOne,
	getAllPagings,
	getAllPagingexclude,
    getAllPaginginclude
}