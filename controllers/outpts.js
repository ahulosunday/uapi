const { outpts, journal, users, payment, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const {Op} = require('sequelize')

const getAll = async(req, res)=>{
	const data = await outpts.findAll({
		    include:[users],
            order:[['outpt_id','ASC']]});
         return res.status(200).json(data);

}
const getAllPagings = async(req, res)=>{
    try{
        const  fulname =  req.params.name;
        const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await outpts.findAndCountAll({ 
            where:{
                [Op.or]:{
                name:{ [Op.like]: `%${fulname}%`},
                phone:{ [Op.like]: `%${fulname}%`},
                email:{ [Op.like]: `%${fulname}%`}
            }
        },
        
            include:[users],
			order:[['outpt_id','ASC']],
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
        const Id = req.params.outpt_id;
        const data = await outpts.findOne({where:{outpt_id:Id}})
        return res.status(200).json(data)

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const add =async (req, res)=>{
    try{
		const data = await outpts.create({name: req.body.name, address: req.body.address, phone: req.body.phone, tdate: req.body.tdate,addedby: req.body.addedby, email: req.body.email})
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const update = async(req, res)=>{
    try{//
     const Id = req.params.outpt_id;
     const data = await outpts.findOne({where:{outpt_id: Id}});
     data.name = req.body.name
	 data.address = req.body.address
	 data.phone = req.body.phone
     data.tdate = req.body.vdate
     data.addedby = req.body.addedby
     data.email = req.body.email
     data.save().then(rex=>{
        return res.status(200).json(data)
     })

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const deletes = async(req, res)=>{
try{
    const id = req.params.outpt_id;
    const chk = await payment.findOne({
        where:{
            service_name:{
                [Op.like]: 'Outpt%'
            },
            uid:id
        }
    })
    if(chk === null){
        const data = await outpts.destroy({where:{outpt_id: id}})
        return res.status(200).json(data)
    }
    else{
        return res.status(500).json({err: 'Unable to delete ...'})
    }


}
catch(err){
    return res.status(500).json({err: err.message})
}
}
const getAllWithName = async(req, res)=>{
	const fulname = req.params.name;
	try{
     const data = await outpts.findAll(
		{  where:{
			[Op.or]:{
			name:{ [Op.like]: `%${fulname}%`},
		    phone:{ [Op.like]: `%${fulname}%`},
			email:{ [Op.like]: `%${fulname}%`}
		}
		},
        offset: 0,
		 limit: 30,
			include: [users],
			order:[['name','ASC']]
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
	add,
    update,
	getOne,
    deletes,
    getAllWithName
}
