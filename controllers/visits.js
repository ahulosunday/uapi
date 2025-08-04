const { patient, hmo, service,prescribed_service, visits, insurance, users, patient_insurance,gifship, gifshiptype, gifshipPackage, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const {Op, where } = require('sequelize')

const getAll = async(req, res)=>{
    try{
        const name = req.params.name
     const data = await visits.findAll({
       include:[patient, service, users],
       order:[['createdAt','DESC'],['status','ASC']],
       offset: 0,
	   limit: 30,
       where:{
        patient_id:{[Op.like]:`%${name}%`}
       }
     })
     return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

const addvisits = async(req, res)=>{
    try{
       
        var patientType = 'Cash'
        var visit_id = ''
        const view = await patient.findOne({
            where:{
            id: req.body.patient_id
            }
        })

        if(view.dataValues.has_insurance === 1){
             
         const dataHmo = await patient_insurance.findOne({
            include:[insurance, hmo, patient,gifship, gifshiptype, gifshipPackage],
            where:{
                patient_id: req.body.patient_id
            }
         })
         
         if(dataHmo.dataValues.hmo.name === 'Retainership')
            patientType = 'Retainership'
        else if(dataHmo.dataValues.hmo.name === 'Private')
            patientType = 'Private'
        else
           patientType = 'NHIS'

        }
      
       const result = await sequelize.transaction(async (t) => {
              await visits.update({
                status: 'Ended'
              },{
                where:{
                    patient_id: req.body.patient_id
                }
              },{transaction: t})
        
         const con =   await visits.create({
                patient_id: req.body.patient_id,
                date_visit_ended: req.body.date_visit_ended,
                category: req.body.category,
                time_visit: req.body.time_visit,
                staff_id: req.body.staff_id,
                date_visit_start: req.body.date_visit_start,
                department: req.body.department,
                professional: req.body.profession,
                type: req.body.type,
                status: req.body.status,
                ante_natal_id: req.body.ante_natal_id,
                admission_id: req.body.admission_id,
                has_done_vitals: req.body.has_done_vitals,
                is_taken: 1,
                immunization_id: req.body.immunization_id,
                consultation_id: req.body.consultation_id,
                service_id: 1,
                 vtype: req.body.vtype,
                 amount: 0
            },
            {transaction: t}
        )
            .then(results=>{
                visit_id = results.dataValues.id
            })
            .catch(ree=>{
        
             return res.status(500).json({err: ree.message})
            })
       /*     
        const data = await prescribed_service.create({
            service_id: req.body.service_id,
            is_urgent: 0,
            service_type: patientType,
            payment_status: 'Pending',
            requester: req.body.staff_id,
            price: req.body.amount,
            visit_id: visit_id,
            patient_id: req.body.patient_id,
            date_requested: new Date(),
            billing_status: 'Unbilled',
            quantity: 1,
            source: 'Consultation',//req.body.vtype,
            patient_insurance_id:  (view.dataValues.has_insurance === 1)? req.body.patient_id: null ,
            
              },{
                transaction:t
              })
        */
              return res.status(200).json(con) 
        })
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const updatevisits = async(req, res) =>{
    try{
    const update = await visits.update({
        patient_id: req.body.patient_id,
        date_visit_ended: req.body.date_visit_ended ,
        time_visit: req.body.time_visit,
        category: req.body.category,
        staff_id: req.body.staff_id,
        date_visit_start: req.body.date_visit_start,
        department: req.body.department,
        professional: req.body.professional,
        type: req.body.type,
        status: req.body.status,
        ante_natal_id: req.body.ante_natal_id,
        admission_id: req.body.admission_id,
        has_done_vitals: req.body.has_done_vitals,
        is_taken: req.body.is_taken,
        immunization_id: req.body.immunization_id,
        consultation_id: req.body.consultation_id,
        service_id: req.body.service_id,
        vtype: req.body.vtype,
        amount: req.body.amount
    }, 
    {
        where:{
            id: req.body.id
        }
    }
)
return res.status(200).json(update)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const deletevisits = async(req, res)=>{
try{
const del = await visits.destroy({
    where:{
        id: req.body.id
    }
})
}
catch(err){
    return res.status(500).json({err: err.message})
}
}
const selectbypatientid =  async(req, res)=>{
    try{
       const patient_id = req.params.patient_id
       const view = await visits.findAll({
        include:[patient, service, users],
        where:{
            patient_id: patient_id
                        },
                        order:[['createdAt','DESC']]
       })
       return res.status(200).json(view)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const selectbyID =  async(req, res)=>{
    try{
       const id = req.params.id
       const view = await visits.findOne({
        include:[patient, service, users],
        where:{
            id: id
                        },
                        order:[['createdAt','DESC']]
       })
       return res.status(200).json(view)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const visits_view = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
        const view = await visits.findAll({
            include:[patient, service, users],
         where:{
             patient_id: patient_id,
             [Op.or]:{
             status:{ [Op.ne]: 'Ended' },
             date_visit_ended: { [Op.lte]: new Date() }

               }      },
                         order:[['createdAt','DESC']]
        })
        
        return res.status(200).json(view)
     }
     catch(err){
         return res.status(500).json({err: err.message})
     }
}
const closedVisit = async (req, res)=>{
    
try{
    const data = await visits.update({
        date_visit_ended : req.body.date_visit_ended,
        status: 'Ended'
    },
        {
      where:{
            id: req.body.id
        }
    })
    return res.status(200).json(data)
}
catch(err){
    return res.status(500).json({err: err.message})
}
}
const hasdonevitals = async(req, res)=>{
    try{
        const data = await visits.update({
           has_done_vitals: 1,
        },
            {
          where:{
                id: req.body.id
            }
        })
        return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
module.exports ={
  addvisits, 
  updatevisits, 
  deletevisits,
  selectbypatientid,
  closedVisit,
  hasdonevitals,
  visits_view,
  selectbyID,
  getAll,

}