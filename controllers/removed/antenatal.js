const { patient, dependant, hmo , antenatals, users, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const {Op} = require('sequelize')

const getAll = async(req, res)=>{
	const data = await antenatals.findAll({
		include: [patient,dependant, hmo ],
            order:[['ancId','ASC']]});
         return res.status(200).json(data);

}
const getAllPagings = async(req, res)=>{
	
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await antenatals.findAndCountAll({ 
			include: [patient,dependant, hmo],
			order:[['ancId','ASC']],
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
        const Id = req.params.ante_natal_id;
        const data = await antenatals.findOne({
            where:{ante_natal_id:Id},
            include: [{model: hmo}]
        })
        return res.status(200).json(data)

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const getAllWithName = async(req, res)=>{
	const fulname = req.params.patient_name
	try{
     const data = await antenatals.findAll(
		{  where:{
			[Op.or]:{
			patient_name:{ [Op.like]: `%${fulname}%`},
		    ancId:{ [Op.like]: `%${fulname}%`},
            hospital_id:{ [Op.like]: `%${fulname}%`}  
		}
		},
		include: [{model: hmo}],
			order:[['ancId','ASC']]
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
