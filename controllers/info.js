const { info, users } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')


const getOne = async(req, res)=>{
	const data = await info.findOne({where:{
		id:1
	},
      order:[['id','ASC']]});
         return res.status(200).json(data);

}
const updateInfo = async(req, res)=>{
	try{
   const data = info.update(req.body);
   return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}

module.exports={
	getOne,
	updateInfo
}