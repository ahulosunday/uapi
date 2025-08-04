const { dependant, users,hmo, enrollee, patient, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const {Op} = require('sequelize')

const getAll = async(req, res)=>{
	const data = await dependant.findAll({
		include: [{model: patient, required: true} ],
            order:[['dependant_id','ASC']]});
         return res.status(200).json(data);

}
const getAllPagings = async(req, res)=>{
	
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await dependant.findAndCountAll({ 
			include: [{model: patient, required: true} ],
			order:[['patient_id','ASC']],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(200).json({err: err.message})
    }
}
const getOne = async (req, res)=>{
    try{
        const Id = req.params.dependant_id;
        const data = await dependant.findOne({where:{dependant_id:Id},include: [{model: patient, required: true}, {model: hmo, required: true}] })
        return res.status(200).json(data)

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

const getAllWithName = async(req, res)=>{
	const fulname = req.params.fullname
	try{
     const data = await dependant.findAll(
		{  where:{is_active:1,
			[Op.or]:{
			name:{ [Op.like]: `%${fulname}%`},
		    hospital_id:{ [Op.like]: `%${fulname}%`} 
		},
		hmo_id:{[Op.ne]: null}
		},
		
			order:[['hospital_id','ASC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message});
	}
}

module.exports = {
  
	getAll,
	getAllPagings,
	getOne,
    getAllWithName
}
