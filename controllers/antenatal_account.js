const { users, patient,prescribed_service, antenatal_account, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');

const getOne = async(req, res)=>{
    try{
        const Id = req.params.id
     const data = await antenatal_account.findOne(
        { include:[users, patient],
            where:{ id: Id},
            order:[['id','ASC']]
        }
     )
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const viewByPatientId = async(req, res)=>{
    try{

        const Id = req.params.patient_id
        const data = await antenatal_account.findOne(
           {  include: [users, patient],
               where: {
                patient_id: Id,

               },
               order:[['id','ASC']]
           }
        )
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const add = async(req, res)=>{
      const t = await sequelize.transaction();
    try{

     const ad =  await antenatal_account.create(req.body,{transaction: t})
     const data = await prescribed_service.create({
            service_id: req.body.service_id,
            is_urgent: 0,
            service_type: req.body.service_type,
            payment_status: 'Pending',
            requester: req.body.staff_id,
            price: req.body.amount,
            visit_id: req.body.visit_id,
            patient_id: req.body.id,
            date_requested: new Date(),
            billing_status: 'Unbilled',
            quantity: 1,
            source: 'Antenatal',
            ante_natal_id: req.body.antenatal_id,
            patient_insurance_id: req.body.insurance_id,
            service_group: req.body.primary,
            nhis_status: req.body.nhis_status
            },{
                transaction: t
            })
          await t.commit();    
       return res.status(200).json(ad)
    }catch(err){
        await t.rollback();
        return res.status(500).json({err: err.message})
    }
}

const updates = async(req, res)=>{
    try{
        const updates = await antenatal_account.update({
            //patient_id: req.body.patient_id,
            //antenatal_number: req.body.antenatal_number,
            parity: req.body.parity,
            gravida: req.body.gravida,
            last_menses_period: req.body.last_menses_period,
            estimated_delivery_date: req.body.estimated_delivery_date,
            estimated_concept_time: req.body.estimated_concept_time,
            fetal_age: req.body.fetal_age,
            medical_history: req.body.medical_history,
            family_history: req.body.family_history,
            blood_transfusion_history: req.body.blood_transfusion_history,
            surgical_history: req.body.surgical_history,
            staff_id: req.body.staff_id,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            account_status: req.body.account_status,
            for_whom: req.body.for_whom
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
const deletes = async(req, res)=>{
    try{
        const id = req.params.id
      const del = await antenatal_account.destroy({
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
    viewByPatientId,
    add, 
    updates,
    deletes, 

}