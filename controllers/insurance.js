const { insurance, users } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging');


const getAll = async(req, res)=>{
	try{
     const data = await insurance.findAll(
		{
			//attributes: ['name', 'description', 'staff_id', 'createdAt','updatedAt'],
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
        const data = await insurance.findAndCountAll({ 
			//attributes: ['name', 'description', 'staff_id', 'createdAt','updatedAt'],
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
		const Id = req.params.insurance_id
     const data = await insurance.findOne(
		{ 
		//	attributes: ['name', 'description', 'staff_id', 'createdAt','updatedAt'],
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
const addInsurance = async(req, res)=>{
	try{
	const data = await insurance.create({name:req.body.name, description:req.body.description, staff_id:req.body.staff_id});
	return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}

}
const editInsurance = async(req, res)=>{
	try{
		 const data = await insurance.update(
		
			{
				
				name: req.body.name,
				description: req.body.description,
				staff_id: req.body.staff_id,
				
	
			},
		{
			where:{id: req.body.id}
		})
		return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}

}
const deleteInsurance = async(req, res)=>{
	try{
		const id = req.params.id
		await insurance.destroy({ where:{id : id}}).then(ress=>{
            return res.status(200).json(ress);
        
        }).catch(err=>{
             return res.status(500).json({ err: 'Unable to delete data'})
        })
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}

}
module.exports={
	getAll,
	getOne,
	getAllPagings,
	addInsurance,
	editInsurance,
	deleteInsurance
}