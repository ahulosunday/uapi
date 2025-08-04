const { route_of_administration, users,dosage_form, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging');


const getOne = async(req, res)=>{
    const id = req.params.id
    const data = await route_of_administration.findOne({
        include:[users, dosage_form],
        where:{
        id:id
    },
    
    order:[['id','ASC']]});
    return res.status(200).json(data);

}
const getAll = async(req, res)=>{
    try{
       
    const data = await route_of_administration.findAll({
        include:[users, dosage_form],
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
       
     const add = await route_of_administration.create(req.body)
     return res.status(200).json(add)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const updates= async(req, res)=>{
    try{
       
       const up = await route_of_administration.update({
        name: req.body.name,
        staff_id: req.body.staff_id,
        dosage_form_id: req.body.dosage_form_id
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
      const del = await route_of_administration.destroy({
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