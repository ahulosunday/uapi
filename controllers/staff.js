const { staff, users,sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const {Op} = require('sequelize')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getAll = async(req, res)=>{
	try{
     const data = await staff.findAll(
		{
			order:[['firstname','ASC']]
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
		const fulname = req.params.fullname
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await staff.findAndCountAll({ 
			where:{
				[Op.or]:{
					firstname:{ [Op.like]: `%${fulname}%`},
					username:{ [Op.like]: `%${fulname}%`},
					lastname:{ [Op.like]: `%${fulname}%`}
				},
			},
			order:[['department','ASC']],
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
		const Id = req.params.staff_id
     const data = await staff.findOne(
		{ where:{id: Id},
			order:[['firstname','ASC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const add = async(req, res)=>{
	try{
      const add = await staff.create(req.body)
	  return res.status(200).json(add)
	}catch(err){
		return res.status(500).json({err: err.message})
	}
}
const deletes = async(req, res)=>{
	try{
		const id = req.params.id
		const del = await staff.destroy({
		  where: {
			  id: id,
			},
		})
		return res.status(200).json(del)
	}catch(err){
		return res.status(500).json({err: err.message})
	}
}
const updates = async(req, res)=>{
	try{
        const updates = await staff.update({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			middlename: req.body.middlename,
			email: req.body.email,
			department: req.body.department,
			date_of_birth: req.body.date_of_birth,
			gender: req.body.gender,
			photo: req.body.photo,
			photos: req.body.photos,
			role: req.body.role,
			sub_role: req.body.sub_role,
			phone: req.body.phone,
			//username: req.body.username,
			address: req.body.address,
			//password: req.body.password
		},{
			where:{
				id: req.body.id
			}
		})
		return res.status(200).json(updates)
	}catch(err){
		return res.status(500).json({err: err.message})
	}
}
const updateImage = async(req, res)=>{
	try{
        const updates = await staff.update({
			photo: req.body.photo

		},{
			where:{
				username: req.body.username
			}
		})
		return res.status(200).json(updates)
	}catch(err){
		return res.status(500).json({err: err.message})
	}
}
const updatePassword = async(req, res)=>{
	try{
		const salt = bcrypt.genSaltSync(10)
			  const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        const updates = await staff.update({
			password: hashedPassword

		},{
			where:{
				username: req.body.username
			}
		})

		return res.status(200).json(updates)
	}catch(err){
		return res.status(500).json({err: err.message})
	}
}

module.exports={
	getAll,
	getOne,
	getAllPagings,
	add,
	deletes,
	updates,
	updateImage,
	updatePassword
}