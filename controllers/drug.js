const { drug, users, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');
const getAll = async(req, res)=>{
	try{
     const data = await drug.findAll(
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
const getAll4NHIS = async(req, res)=>{
	try{
        var data =[]
        const type = req.params.type
        const is_available_for_nhis = req.params.is_available_for_nhis
        if(is_available_for_nhis === 'NHIS'){
     data = await drug.findAll(
		{
            where:{
                type: type,
                is_available_for_nhis: 1
            },
			order:[['name','ASC']]
		}
	 )
    }else{
        data = await drug.findAll(
            {
                where:{
               type: type
                },
                order:[['name','ASC']]
            }
         )
    }
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
        const data = await drug.findAndCountAll({ 
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
const getAllPagingexclude = async(req, res)=>{
	
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await drug.findAndCountAll({ 
            attributes:['id', 'name','code','type', 'is_available_for_nhis', 'createdAt', 'updatedAt'],
            where:{
                id:{
                    [Op.notIn]: sequelize.literal(
                        `(select mappingcode from mappings where tablename = 'Drug')`
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
        const data = await drug.findAndCountAll({ 
            attributes:['id', 'name','code', 'createdAt', 'updatedAt'],
            where:{
                id:{
                    [Op.in]: sequelize.literal(
                        `(select mappingcode from mappings where tablename = 'Drug')`
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
const getOne = async(req, res)=>{
	try{
		const Id = req.params.drug_id
     const data = await drug.findOne(
		{   
            include:[users],
            where:{ id: Id},
			order:[['name','ASC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}

const addDrug = async(req, res)=>{
    try{
     const add = await drug.create(req.body)
     await drug.update({
        code: ('D' + add.dataValues.id)
     },{
        where:{ 
            id: add.dataValues.id
        }
     })
     return res.status(200).json(add)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const updateDrug = async(req, res)=>{
    try{
        
       const updates = await drug.update({
        name: req.body.name,
        is_available_for_nhis: req.body.is_available_for_nhis,
        code: req.body.code,
        type: req.body.type,
        
        
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
const deleteDrug = async(req, res)=>{
    try{
        const id = req.params.id
      const del = await drug.destroy({
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
const filterDrug = async(req, res)=>{
	try{
		const name = req.params.name
        const type = req.params.form
     const data = await drug.findAll(
		{   
            include:[users],
            where:{
                [Op.or]:{
			    name:{ [Op.like]: `%${name}%`},
                },
                type: type  
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

module.exports={
	getAll,
    filterDrug,
	getOne,
	getAllPagings,
	getAllPagingexclude,
    getAllPagingInclude,
    addDrug,
    updateDrug,
    deleteDrug,
    getAll4NHIS
}