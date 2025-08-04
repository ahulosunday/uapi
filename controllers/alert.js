const {users, patient, alert } = require('../models');
 
const getAll = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
  const data = await alert.findAll({
    include: [users, patient],
    order: [['id', 'DESC']],
    where:{
        patient_id: patient_id,
    }
  })
  return res.status(200).json(data)

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const getOne = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
  const data = await alert.findOne({
    include: [users, patient],
    order: [['id', 'DESC']],
    where:{
        patient_id: patient_id,
        status: 'Active'
    }
  })
  return res.status(200).json(data)

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const add = async(req, res)=>{
    try{
    await alert.update({
        status: 'Inactive'
    },{
        where:{
            patient_id: req.body.patient_id
        }
    })   
  const data = await alert.create(req.body)
  return res.status(200).json(data)

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const Updates = async(req, res)=>{
    try{
       
  const data = await alert.update({
    status: 'Inactive',
  },{
    where:{id: req.body.id}
  })
  return res.status(200).json(data)

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}


module.exports={
    getAll,
    add,
    Updates,
    getOne,
}