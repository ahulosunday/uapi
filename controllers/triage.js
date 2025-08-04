const { test, users, triage, visits, patient, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op, where } = require('sequelize');


const getAll = async(req, res)=>{
	try{
     const data = await triage.findAll(
		{   include:[patient, visits, users],
			order:[['visit_id','DESC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const viewOne = async(req, res)=>{
    try{
        const id = req.params.id
        const data = await triage.findAll(
           {   include:[patient, visits, users],
               order:[['visit_id','DESC']],
               where:{
                id: id
               }
           }
        )
        return res.status(200).json(data)
       }
       catch(err){
           return res.status(500).json({err: err.message})
       }
}
const createTriage = async(req, res) =>{
    try{

            const add = await triage.create(req.body
                /*{
                visit_id: req.body.visit_id,
                patient_id: req.body.patient_id,
                weight: req,body,weight,
                height: req.body.height,
                bmi: req.body.bmi,
                rvs: req.body.rvs,
                pulse: req.body.pulse,
                respiration:req.body.respiration,
                temperature: req.body.temperature,
                systolic: req.body.systolic,
                diastolic: req.body.diastolic,
                heart_rate: req.body.heart_rate,
                spo2: req.body.spo2,
                muac: req.body.muac,
                staff_id: req.body.staff_id,
                comment: req.body.comment,
                arrival_time: req.body.arrival_time,
                mode_of_arrival: req.body.mode_of_arrival
            }*/
                )
            
        return res.status(200).json(add)
      
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const deleteTriage = async(req, res) =>{
    try{
        const id = req.params.id
        const result = await sequelize.transaction(async (t) => {
         const deletes = await triage.destroy({
            where:{
               id: id
            }
         },{
            transaction: t
         })
         return res.status(200).json(deletes)
        })
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const viewByPatientId = async(req, res)=>{
    const patient_id = req.params.patient_id
    
    try{
     const view = await triage.findAll({
        include:[patient, visits, users],
        order:[['visit_id','DESC']],
        where:{
            patient_id: patient_id
        }
     })
     return res.status(200).json(view)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const selectMax = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
        const data = await sequelize.query(`select * from triages where id = (select max(id) from triages) and patient_id =${patient_id}`)
        return res.status(200).json(data)

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
module.exports={
    selectMax,
    getAll,
    createTriage,
    deleteTriage,
    viewByPatientId,
    viewOne

}