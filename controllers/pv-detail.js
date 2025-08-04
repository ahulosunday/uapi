const { info, users, pv_detail} = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')


const getOne = async(req, res)=>{
    try{
        const Id = req.params.id
	const data = await pv_detail.findOne({where:{
		id:Id
	},
      order:[['id','ASC']]});
         return res.status(200).json(data);
}
catch(err){
    return res.status(500).json({err: err.message})
}
}
const getPVheader = async(req, res)=>{
    try{
        const pvheaderid = req.params.pvheaderid
	const data = await pv_detail.findOne({where:{
		pv_header_id: pvheaderid
	},
      order:[['id','ASC']]});
         return res.status(200).json(data);
}
catch(err){
    return res.status(500).json({err: err.message})
}

}
const getPVheaderList = async(req, res)=>{
    try{
        const pvheaderid = req.params.pvheaderid
	const data = await pv_detail.findAll({where:{
		pv_header_id: pvheaderid
	},
      order:[['id','ASC']]});
         return res.status(200).json(data);
}
catch(err){
    return res.status(500).json({err: err.message})
}

}
const getAll= async(req, res)=>{
	const data = await pv_detail.findAll({
      order:[['id','ASC']]});
         return res.status(200).json(data);

}
const updatepv_detail = async(req, res)=>{
	try{
   const data = await pv_detail.update(req.body);
   return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const deletepv_detail = async(req, res)=>{
	try{
        const Id = req.params.id;
   const data = await pv_detail.delete({where:{id: Id}});
   return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}

}
const addpv_detail = async(req, res)=>{
    try{
   const data = await pv_detail.create(req.body);
   return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const addBulkpv_detail = async(req, res)=>{
    try{
   const data = await pv_detail.bulkCreate(req.body);
   return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
module.exports={
	getOne,
	updatepv_detail,
    getAll,
    addpv_detail,
    deletepv_detail,
    getPVheader,
    addBulkpv_detail,
    getPVheaderList,
}