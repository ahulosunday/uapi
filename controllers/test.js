//test_id, name, lab_id,price,staff_id,is_active,code, type
const { test, users,test_sample,  sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op, where } = require('sequelize');

const getAll = async(req, res)=>{
	try{
     const data = await test.findAll(
		{
            include:[test_sample, users],
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
                data = await test.findAll(
		{
            include:[test_sample, users],
			order:[['name','ASC']],
            where:{
                name:{ [Op.like]: `%${name}%`},
                price:{ [Op.not]: null}
            }
		}
	 )
     break;
     case 'Retainership':
                data = await test.findAll(
		{
            include:[test_sample, users],
			order:[['name','ASC']],
            where:{
                name:{ [Op.like]: `%${name}%`},
                retainership_price:{ [Op.not]: null}
            }
		}
	 )
     break;
     case 'Private':
                data = await test.findAll(
		{
            include:[test_sample, users],
			order:[['name','ASC']],
            where:{
                name:{ [Op.like]: `%${name}%`},
                phis_price:{ [Op.not]: null}
            }
		}
	 )
     break;
     default:
       data = await test.findAll(
		{
            include:[test_sample, users],
			order:[['name','ASC']],
            where:{
                name:{ [Op.like]: `%${name}%`},
                nhis_price:{ [Op.not]: null}
            }
		}
	 )

        }

        /*
        const name = req.params.name

     const data = await test.findAll(
		{
            include:[test_sample, users],
			order:[['name','ASC']],
            where:{
                name:{ [Op.like]: `%${name}%`}
            }
		}
	 )
     */
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
        const data = await test.findAndCountAll({ 
			
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
		const Id = req.params.test_id
     const data = await test.findOne(
		{ where:{ id: Id},
			order:[['name','ASC']],
            include:[users, test_sample]
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
        const data = await test.findAndCountAll({ 
            attributes:['id', 'name','code', 'retainership_price', 'phis_price','nhis_price','price','createdAt','type', 'updatedAt'],
            where:{
                id:{
                    [Op.notIn]: sequelize.literal(
                        `(select mappingcode from mappings where tablename = 'Test')`
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
        const data = await test.findAndCountAll({ 
            attributes:['id', 'name','code', 'price','createdAt', 'updatedAt'],
            where:{
                id:{
                    [Op.in]: sequelize.literal(
                        `(select mappingcode from mappings where tablename = 'Test')`
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
const addtest = async(req, res)=>{
  const t = await sequelize.transaction();
    try{
     const add = await test.create(req.body)
     await test.update({
        code: ('T' + add.dataValues.id)
     },{
        where:{
            id: add.dataValues.id
        }
     })
     await t.commit();
     return res.status(200).json(add)
    }
    catch(err){
        await t.rollback();
        return res.status(500).json({err: err.message})
    }
}
const updatetest = async(req, res)=>{
    try{
        
       const updates = await test.update({
        name: req.body.name,
        price: req.body.price,
        code: req.body.code,
        sample_id: req.body.sample_id,
        type: req.body.type,
        result_unit: req.body.result_unit,
        valid_range: req.body.valid_range,
        staff_id: req.body.staff_id,
        nhis_price: req.body.nhis_price,
        phis_price: req.body.phis_price,
        retainership_price: req.body.retainership_price,
        is_available_for_nhis: req.body.is_available_for_nhis,
        is_available_for_phis: req.body.is_available_for_phis,
        result_form: req.body.result_form
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
const deleteTest = async(req, res)=>{
    try{
        const id = req.params.id
      const del = await test.destroy({
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
	getAllPagingexclude,
    getAllPagingInclude,
    addtest,
    updatetest,
    deleteTest,
    getAllFilter
}