const { patient, patient_treatment, visits, users, admission, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging');


const getOne = async(req, res)=>{
try{
    const patient_id = req.params.patient_id
    const data = await patient_treatment.findOne({
        where:{
        patient_id: patient_id
    },
    include:[patient, visits,users, admission],
    order:[['id','ASC']]});
    return res.status(200).json(data);
}
catch(err){
    return res.status(500).json(err)
}
}
const getAll = async(req, res)=>{
try{
    const patient_id = req.params.patient_id
    const data = await patient_treatment.findAll({
        where:{
        patient_id: patient_id
    },
    include:[users, patient, visits, admission],
    order:[['id','ASC']]});
    return res.status(200).json(data);
}
catch(err){
    return res.status(500).json({err: err.message})
}
}
const add = async(req, res)=>{
    try{
    const data = await patient_treatment.create(req.body)
     
     return res.status(200).json(data)
    }catch(err){
        return res.status(500).json(err)
    }
}
module.exports={
    add,
    getAll,
    getOne

}