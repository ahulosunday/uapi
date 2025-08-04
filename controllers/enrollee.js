const { enrollee, users } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')

const getAll = async(req, res)=>{
	try{
     const data = await enrollee.findAll(
		{
			include: [hmo ],
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
        const data = await enrollee.findAndCountAll({ 
			include: [enrollee, hmo],
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
		const Id = req.params.enrollee_id
     const data = await enrollee.findOne(
		{ where:{ enrollee_id: Id},
		include: [hmo ],
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
	getOne,
	getAllPagings
}