const { service, users, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');
const getAll = async(req, res)=>{
	try{
     const data = await service.findAll(
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
const getAllFilter = async(req, res)=>{
	try{
        const name = req.params.name
        var data= {}
        data = await service.findAll(
		{
            include:[users],
			order:[['name','ASC']],
            where:{
                name:{ [Op.like]: `%${name}%`},
                price:{ [Op.not]: null}
            }
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}

const getAlls = async(req, res)=>{
	try{
        const id = req.params.id
     const data = await service.findAll(
		{
            where:{
             name: { [Op.like]: `%${id}%`}
            },
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
        const data = await service.findAndCountAll({ 
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
const getOne = async(req, res)=>{
	try{
		const Id = req.params.id
     const data = await service.findOne(
		{ where:{id: Id},
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
        const data = await service.findAndCountAll({ 
            attributes:['id', 'name','code', 'price','createdAt', 'updatedAt', 'type'],
            where:{
                id:{
                    [Op.notIn]: sequelize.literal(
                        `(select mappingcode from mappings where tablename = 'Service')`
                    )

                }
            },
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
const getAllPagingInclude = async(req, res)=>{
	
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await service.findAndCountAll({ 
            attributes:['id', 'name','code', 'price','createdAt', 'updatedAt','type'],
            where:{
                id:{
                    [Op.in]: sequelize.literal(
                        `(select mappingcode from mappings where tablename = 'Service')`
                    )

                }
            },
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
 const addservice = async(req, res)=>{
    const t = await sequelize.transaction();
    try{
   const add = await service.create(req.body)
    await service.update({
        code: ('S' + add.dataValues.id)
    },{
        where:{
            id: add.dataValues.id
        }
    })
    await  t.commit();
   return res.status(200).json(add)
    }
    catch(err){
        await t.rollback();
        return res.status(500).json({err: err.message})
    }
 }
 const updateservice = async(req, res)=>{
    try{
    const updates = await service.update({
        name: req.body.name,
        price: req.body.price,
        staff_id: req.body.staff_id,
        code: req.body.code,
        type: req.body.type
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

 const deleteservice = async(req, res)=>{
    try{
        const id = req.params.id
        const del = await service.destroy({
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
    getAlls,
	getOne,
	getAllPagings,
	getAllPagingexclude,
    getAllPagingInclude,
    addservice,
    updateservice,
    deleteservice,
    getAllFilter
}