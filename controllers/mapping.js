const { mapping, users, chart_of_account, test, drug, service, investigation,  sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const {Op } = require('sequelize')

const getAll = async(req, res)=>{
	try{
    const data = await mapping.findAll({
		include: [users ],
            order:[['tablename','ASC']]});
         return res.status(200).json(data);
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
        const data = await mapping.findAndCountAll({ 
            include: [users, chart_of_account], 
            order:[['tablename','ASC']],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(200).json({err: err.message})
    }
}
const getAllPagings2Params = async(req, res)=>{
	
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
		const tablename = req.params.tablename
		const tableInclude = req.params.tableinclude
		var id = '';
		if(tableInclude === 'test')
		id = test
	else if(tableInclude === 'drug')
	id= drug
else if(tableInclude === 'service')
id = service
else if(tableInclude === 'investigation')
id = investigation


		
         const { limit, offset } = getPagination(page, per_page)
        const data = await mapping.findAndCountAll({ where:{
tablename: tablename
		},
            include: [
			{
				model: users,
				required: true
			},
				{
					model: chart_of_account,
					required: true
				}, 
					{
					model: id,
					required: true
				}
			], 
            order:[['chartofaccount_id','ASC']],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(200).json({err: err.message});
    }
}
const add = async(req, res) =>{
	try{
       const data = await mapping.create({chartofaccount_id: req.body.chartofaccount_id,mappingcode: req.body.mappingcode, tablename: req.body.tablename, userid: req.body.userid});
	   return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const Bulkcreate = async (req, res) => {
    
    try {
        const data = await mapping.bulkCreate(req.body);
        return res.status(201).json(data);
    } catch (err) {
        return res.status(500).json({ err: err.message})
    }
}
const update = async(req, res) =>{
	try{
		const Id = req.params.id;
       const data = await mapping.findOne({where:{id: Id}})
	   data.chartofaccount_id = req.body.chartofaccount_id,
	   data.mappingcode = req.body.mappingcode,
	   data.tablename = req.body.tablename,
	   data.userid = req.body.userid
	   data.save();
	   return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}

const deletes = async(req, res)=>{
try{
	const Id = req.params.id;
    const data = await mapping.destroy({where:{id: Id}})
	return res.status(200).json(data)
}
catch(err){
	return res.status(500).json({err: err.message})
}
}
const deleteBulk = async(req, res)=>{
	try{
		const Tablename = req.params.tablename;
		const arr = req.params.arr
		var arrs = []
		arrs = arr.split(',')
		const data = await mapping.destroy({where:{mappingcode: {
			[Op.in]: arrs
		},
		tablename: Tablename
	}})
		return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
	}
	const deleteBulkPK = async(req, res)=>{
		try{
			const Tablename = req.params.tablename;
			const arr = req.params.ar
			var arrs = []
			arrs = arr.split(',')
			const data = await mapping.destroy({where:{id: {
				[Op.in]: arrs
			},
			tablename: Tablename
		}})
			return res.status(200).json(data)
		}
		catch(err){
			return res.status(500).json({err: err.message})
		}
		}

module.exports ={
	deletes,
	add,
	getAll,
	getAllPagings,
	update,
	Bulkcreate,
	deleteBulk,
	deleteBulkPK,
    getAllPagings2Params

	
}