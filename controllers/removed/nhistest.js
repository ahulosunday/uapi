//ntest_id, name, lab_id,price,staff_id,is_active,code, type
const { nhistest, users, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize')
const getAll = async(req, res)=>{
	try{
     const data = await nhistest.findAll(
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
        const data = await nhistest.findAndCountAll({ 
			
			order:[['ntest_id','ASC']],
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
		const Id = req.params.ntest_id
     const data = await nhistest.findOne(
		{ where:{ ntest_id: Id},
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
        const data = await nhistest.findAndCountAll({ 
            attributes:['ntest_id', 'name','code', 'price','createdAt', 'updatedAt'],
            where:{
                ntest_id:{
                    [Op.notIn]: sequelize.literal(
                        `(select mappingcode from mappings where tablename = 'NhisTest')`
                    )

                }
            },
			order:[['ntest_id','ASC']],
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
        const data = await nhistest.findAndCountAll({ 
            attributes:['ntest_id', 'name','code', 'price','createdAt', 'updatedAt'],
            where:{
                ntest_id:{
                    [Op.in]: sequelize.literal(
                        `(select mappingcode from mappings where tablename = 'NhisTest')`
                    )

                }
            },
			order:[['ntest_id','ASC']],
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