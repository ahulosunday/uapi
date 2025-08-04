const {imaging, users, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');
const getAll = async(req, res)=>{
    try{
     const data = await imaging.findAll(
        {
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
        const data = await imaging.findAndCountAll({ 
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
        const Id = req.params.investigation_id
     const data = await imaging.findOne(
        { where:{ id: Id},
            order:[['name','ASC']]
        }
     )
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const addImaging = async(req, res)=>{
    try{
   const add = await imaging.create(req.body)
   return res.status(200).json(add)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
 }
 const updateImaging = async(req, res)=>{
    try{
    const updates = await imaging.update({
        name: req.body.name,
        description: req.body.description,
        staff_id: req.body.staff_id
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

 const deleteImaging = async(req, res)=>{
    try{
        const id = req.params.id
        const del = await imaging.destroy({
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
    addImaging,
    updateImaging,
    deleteImaging
}