const { investigation, users,imaging, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');
const getAll = async(req, res)=>{
	try{
     const data = await investigation.findAll(
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
        const filter = req.params.filter
        var data= {}
        switch(filter){
            case 'Cash':
                data = await investigation.findAll(
		{
            include:[imaging, users],
			order:[['name','ASC']],
            where:{
                name:{ [Op.like]: `%${name}%`},
                price:{ [Op.not]: null}
            }
		}
	 )
     break;
     case 'Retainership':
                data = await investigation.findAll(
		{
            include:[imaging, users],
			order:[['name','ASC']],
            where:{
                name:{ [Op.like]: `%${name}%`},
                retainership_price:{ [Op.not]: null}
            }
		}
	 )
     break;
     case 'Private':
                data = await investigation.findAll(
		{
            include:[imaging, users],
			order:[['name','ASC']],
            where:{
                name:{ [Op.like]: `%${name}%`},
                phis_price:{ [Op.not]: null}
            }
		}
	 )
     break;
     default:
       data = await investigation.findAll(
		{
            include:[imaging, users],
			order:[['name','ASC']],
            where:{
                name:{ [Op.like]: `%${name}%`},
                nhis_price:{ [Op.not]: null}
            }
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
        const data = await investigation.findAndCountAll({ 
			include: [enrollee, hmo],
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
		const Id = req.params.investigation_id
     const data = await investigation.findOne(
		{ where:{ id: Id},
        include:[imaging, users],
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
        const data = await investigation.findAndCountAll({ 
            attributes:['id', 'name', 'retainership_price', 'phis_price','nhis_price','is_available_for_nhis','is_available_for_phis', 'price', 'type', 'imaging_id','createdAt', 'updatedAt'],
            include: [imaging, users],
            where:{
                id:{
                    [Op.notIn]: sequelize.literal(
                        `(select mappingcode from mappings where tablename = 'Investigation')`
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
        const data = await investigation.findAndCountAll({ 
            attributes:['id', 'name', 'price', 'type', 'createdAt', 'updatedAt'],
            include: [imaging, users],
            where:{
                id:{
                    [Op.in]: sequelize.literal(
                        `(select mappingcode from mappings where tablename = 'Investigation')`
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

const addInvestigation = async(req, res)=>{
    try{
   const add = await investigation.create(req.body)
   return res.status(200).json(add)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
 }
 const updateInvestigation = async(req, res)=>{
    try{
    const updates = await investigation.update({
    name: req.body.name,
    price: req.body.price,
    nhis_price: req.body.nhis_price,
    phis_price: req.body.phis_price,
    type: req.body.type,
    imaging_id: req.body.imaging_id,
    staff_id: req.body.staff_id,
    retainership_price: req.body.retainership_price
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

 const deleteInvestigation = async(req, res)=>{
    try{
        const id = req.params.id
        const del = await investigation.destroy({
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
    getAllFilter,
	getOne,
	getAllPagings,
	getAllPagingexclude,
    getAllPagingInclude,
    addInvestigation,
    updateInvestigation,
    deleteInvestigation
}