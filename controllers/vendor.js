const { vendor, users, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging');


const getOne = async(req, res)=>{
    const id = req.params.id
    const data = await vendor.findOne({
        include:[users],
        where:{
        id:id
    },
    
    order:[['id','ASC']]});
    return res.status(200).json(data);

}
const getAll = async(req, res)=>{
    try{
       
    const data = await vendor.findAll({
        include:[users],
    order:[['id','ASC']]

});
return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
} 
const add = async(req, res)=>{
    try{
       
     const add = await vendor.create(req.body)
     return res.status(200).json(add)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const updates= async(req, res)=>{
    try{
       
       const up = await vendor.update({
        name: req.body.name,
        staff_id: req.body.staff_id,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
       },
    {
        where:{
            id: req.body.id
        }
    })
    
    return res.status(200).json(up)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const deletes = async(req, res)=>{
    try{
        const id = req.params.id
      const del = await vendor.destroy({
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
    getOne, 
    getAll,
    add,
    deletes,
    updates

}