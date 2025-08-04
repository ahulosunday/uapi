const { nhisservice, users, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize')
const getAll = async(req, res)=>{
	try{
     const data = await nhisservice.findAll(
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
        const data = await nhisservice.findAndCountAll({ 
			order:[['nservice_id','ASC']],
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
		const Id = req.params.nservice_id
     const data = await nhisservice.findOne(
		{ where:{ nservice_id: Id},
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
        const data = await nhisservice.findAndCountAll({ 
            attributes:['nservice_id', 'name','code', 'price','createdAt', 'updatedAt'],
            where:{
                nservice_id:{
                    [Op.notIn]: sequelize.literal(
                        `(select mappingcode from mappings where tablename = 'NhisService')`
                    )

                }
            },
			order:[['nservice_id','ASC']],
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
        const data = await nhisservice.findAndCountAll({ 
            attributes:['nservice_id', 'name','code', 'price','createdAt', 'updatedAt'],
            where:{
                nservice_id:{
                    [Op.in]: sequelize.literal(
                        `(select mappingcode from mappings where tablename = 'NhisService')`
                    )

                }
            },
			order:[['nservice_id','ASC']],
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