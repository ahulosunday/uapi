const { patient, investigation, investigation_prescription, prescribed_investigation, imaging, patient_insurance,visits, antenatal_account, hmo, investigation_result, insurance, users, cart, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const {Op} = require('sequelize')
const moment = require('moment')
const getAll = async(req, res)=>{
	try{
     const data = await prescribed_investigation.findAll(
		{
			include: [patient, investigation, imaging],
			order:[['id','ASC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getAll4Patient = async(req, res)=>{
	try{
	
		const patient_Id = req.params.patient_id
     const data = await prescribed_investigation.findAll(
		{ where:{
         patient_id: patient_Id,
		 payment_status:{[Op.ne]: 'Paid'},
        // billing_status:{[Op.eq]: 'Billed'},
		 id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${patient_Id} and tablename = 'Prescribed Investigation' and patient_table = 'patient')`)
		 }
		},
		 include: [{model: investigation}, {model: patient},  {model: imaging}],//patient, dependant, nhisdrug,drug, antenatals
			order:[['updatedAt','DESC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getAll4PatientHmo = async(req, res)=>{
	try{
	
		const patient_Id = req.params.patient_id
     const data = await prescribed_investigation.findAll(
		{ where:{
         patient_id: patient_Id,
         payment_status:{
            [Op.notIn]:
            ['Paid','Pending']
         },
         //billing_status:{[Op.eq]: 'Billed'},
		 id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${patient_Id} and tablename = 'Prescribed Investigation' and patient_table = 'patient')`)
		 }
		},
			include: [{model: investigation},{model: patient},imaging],//patient, dependant, nhisdrug,drug, antenatals
			order:[['updatedAt','DESC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getAll4DependantHmo = async(req, res)=>{
	try{
	
		const dependant_Id = req.params.dependant_id
     const data = await prescribed_investigation.findAll(
		{ where:{
         dependant_id: dependant_Id,
         payment_status:{
            [Op.notIn]:
            ['Paid','Pending']
         },
        // billing_status:{[Op.eq]: 'Billed'},
		 id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${dependant_Id} and tablename = 'Prescribed Investigation' and patient_table = 'dependant')`)
		 }
		},
		include: [investigation, patient,imaginng],// dependant, nhisdrug,drug, antenatals
			order:[['updatedAt','DESC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getAll4Antenatal = async(req, res)=>{
	try{
	
		const antenal_Id = req.params.ante_natal_id
     const data = await prescribed_investigation.findAll(
		{ where:{
         ante_natal_id: antenal_Id,
		 payment_status:{[Op.ne]: 'Paid'},
        // billing_status:{[Op.eq]: 'Billed'},
		 id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${antenal_Id} and tablename = 'Prescribed Investigation' and patient_table = 'antenatal')`)
		 }
		},
			include: [investigation, patient,imaging],// dependant, nhisdrug,drug, antenatals
			order:[['updatedAt','DESC']]
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
        const data = await prescribed_investigation.findAndCountAll({ 
			include: [patient, investigation, imaging],
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
		const Id = req.params.pi_id
     const data = await prescribed_investigation.findOne(
		{ where:{ id: Id},
		include: [patient,investigation, imaging, users,visits, patient_insurance, antenatal_account],
			order:[['id','ASC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const paid = async(req, res)=>{
	try{
		const Id = req.params.id;
     var arr = [];
     arr = Id.split(',')
  
     const data = await prescribed_investigation.update(
       {
            payment_status:'Paid'
        },
        
        {
            where:{
            id:{[Op.in]:arr}
        }
    });
    return res.status(299).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const Billings = async(req, res)=>{
    try{
     const Id = req.params.id;
     var arr = [];
     arr = Id.split(',')
  
     const data = await prescribed_investigation.update(
       {
            billing_status:'Billed',
            permittedby: req.body.permittedby,
            permitted_date: req.body.permitted_date
        },
        
        {
            where:{
            id:{[Op.in]:arr}
        }
    });
     
        return res.status(200).json(data)

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const UnBillings = async(req, res)=>{
    try{
     const Id = req.params.id;
     var arr = [];
     arr = Id.split(',')
  
     const data = await prescribed_investigation.update(
       {
            billing_status:'Unbilled',
            permittedby: req.body.permittedby,
            permitted_date: req.body.permitted_date
        },
        
        {
            where:{
            id:{[Op.in]:arr}
        }
    });
     
        return res.status(200).json(data)

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const permitted = async(req, res)=>{
    try{
     const Id = req.params.id;
     var arr = [];
     arr = Id.split(',')
  
     const data = await prescribed_investigation.update(
       {
            payment_status:'Permitted',
            permittedby: req.body.permittedby,
            permitted_date: req.body.permitted_date
        },
        
        {
            where:{
            id:{[Op.in]:arr}
        }
    });
     
        return res.status(200).json(data)

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const sumAmount = async(req, res)=>{
    try{
        const Id = req.params.id;
        var arr = [];
        arr = Id.split(',')
     
        const data = await prescribed_investigation.findAll({
         attributes: [ [sequelize.fn('SUM', sequelize.col('price')), 'amount']],          
           
               where:{
               id:{[Op.in]:arr}
           }
       
     
     });
     
           return res.status(200).json(data)
   
       }
       catch(err){
           return res.status(500).json({err: err.message})
       }
}
const getAll2PayPatient = async(req, res)=>{
    try{
        const Id = req.params.id;
        var arr = [];
        arr = Id.split(',')
     
        const data = await prescribed_investigation.findAll({
              where:{
               id:{[Op.in]:arr}
           }
       
     
     });
     const obj2 = data.map((result, index)=>{
        return Object.assign({
          tableid: result.id,
          tablename: 'Prescribed Investigation',
          amount: result.price,
          pid: result.patient_id,
          patient_table: 'patient',
          service_id:result.investigation_id

        })
        })
          await cart.bulkCreate(obj2).then(resp=>{
            return res.status(200).json(data)
          }).catch(error=>{
            return res.status(500).json({err: error.message})
          })
        
           
   
       }
       catch(err){
           return res.status(500).json({err: err.message})
       }

}
const getAll2PayDependant = async(req, res)=>{
    try{
        const Id = req.params.id;
        var arr = [];
        arr = Id.split(',')
     
        const data = await prescribed_investigation.findAll({
              where:{
               id:{[Op.in]:arr}
           }
       
     
     });
     const obj2 = data.map((result, index)=>{
        return Object.assign({
          tableid: result.id,
          tablename: 'Prescribed Investigation',
          amount: result.price,
          pid: result.dependant_id,
          patient_table: 'dependant',
          service_id:result.ninvestigation_id? result.ninvestigation_id: result.investigation_id

        })
        })
          await cart.bulkCreate(obj2).then(resp=>{
            return res.status(200).json(data)
          }).catch(error=>{
            return res.status(500).json({err: error.message})
          })
        
           
   
       }
       catch(err){
           return res.status(500).json({err: err.message})
       }

}
const add = async(req, res)=>{
    const t = await sequelize.transaction();
    
    try{
    var arr = [];
    var arrs = []
        arr = req.body.investigation_id.split(',') 
   const datas = await investigation.findAll({
              where:{
               id:{[Op.in]:arr}
           }});
          
      for (let i = 0; i < arr.length; i++) {
    const data = await investigation_prescription.create({
    source: req.body.source,
    requester: req.body.requester,
    visit_id: req.body.visit_id,
    patient_id: req.body.patient_id,
    date_requested: req.body.date_requested, //moment(new Date()).format('YYYY-MM-DD'),
    is_billed: req.body.is_billed,
    has_paid: req.body.has_paid,
    status: req.body.status,
    result_notes: null,
    ante_natal_id: req.body.ante_natal_id
        },{transaction: t})
        arrs.push(data.dataValues.id)
    }

  
 const obj2 = datas.map((result, index)=>{
    return Object.assign({
    investigation_id: result.id,
    imaging_id: result.imaging_id,
    is_urgent: 0,
    investigation_type: req.body.patientType,
    requester: req.body.requester,
    price: ( req.body.patientType === 'Cash'? result.price:req.body.patientType === 'Retainership'? result.retainership_price:req.body.patientType === 'Private'? result.phis_price :  req.body.patientType === 'NHIS'? result.nhis_price: null  ), //***** */
    visit_id: req.body.visit_id,
    patient_id: req.body.patient_id,
    investigation_prescription_id: arrs[index],
    date_requested: req.body.date_requested,
    payment_status: 'Pending',
    billing_status: 'Unbilled',
    status: 'Pending',
    source: req.body.source,
    patient_insurance_id: req.body.patient_insurance_id,
    investigation_group: result.type,

        })})
        const con = await prescribed_investigation.bulkCreate(obj2, {transaction: t})
/*
    const con = await prescribed_investigation.create({
    investigation_id: req.body.investigation_id,
    imaging_id: req.body.imaging_id,
    is_urgent: 0,
    investigation_type: req.body.patientType,
    requester: req.body.requester,
    price: req.body.amount,
    visit_id: req.body.visit_id,
    patient_id: req.body.patient_id,
    investigation_prescription_id: data.dataValues.id,
    date_requested: req.body.date_requested,
    payment_status: 'Pending',
    billing_status: 'Unbilled',
    status: 'Pending',
    source: req.body.source,
    patient_insurance_id: req.body.patient_insurance_id,
    investigation_group: req.body.type,

        },{transaction: t})
        */
  t.commit();
  return res.status(200).json(con)
    }catch(err){
        t.rollback();
        return res.status(500).json({err: err.message})
    }
}
const addCash = async(req, res)=>{
    const t = await sequelize.transaction();
    
    try{
    var arr = [];
    var arrs = []
        arr = req.body.investigation_id.split(',') 
   const datas = await investigation.findAll({
              where:{
               id:{[Op.in]:arr}
           }});
          
      for (let i = 0; i < arr.length; i++) {
    const data = await investigation_prescription.create({
    source: req.body.source,
    requester: req.body.requester,
    visit_id: req.body.visit_id,
    patient_id: req.body.patient_id,
    date_requested: req.body.date_requested, //moment(new Date()).format('YYYY-MM-DD'),
    is_billed: req.body.is_billed,
    has_paid: req.body.has_paid,
    status: req.body.status,
    result_notes: null,
    ante_natal_id: req.body.ante_natal_id
        },{transaction: t})
        arrs.push(data.dataValues.id)
    }

  
 const obj2 = datas.map((result, index)=>{
    return Object.assign({
    investigation_id: result.id,
    imaging_id: result.imaging_id,
    is_urgent: 0,
    investigation_type: req.body.patientType,
    requester: req.body.requester,
    price: result.price,
    visit_id: req.body.visit_id,
    patient_id: req.body.patient_id,
    investigation_prescription_id: arrs[index],
    date_requested: req.body.date_requested,
    payment_status: 'Pending',
    billing_status: 'Unbilled',
    status: 'Pending',
    source: req.body.source,
    patient_insurance_id: req.body.patient_insurance_id,
    investigation_group: result.type,

        })})
        const con = await prescribed_investigation.bulkCreate(obj2, {transaction: t})
/*
    const con = await prescribed_investigation.create({
    investigation_id: req.body.investigation_id,
    imaging_id: req.body.imaging_id,
    is_urgent: 0,
    investigation_type: req.body.patientType,
    requester: req.body.requester,
    price: req.body.amount,
    visit_id: req.body.visit_id,
    patient_id: req.body.patient_id,
    investigation_prescription_id: data.dataValues.id,
    date_requested: req.body.date_requested,
    payment_status: 'Pending',
    billing_status: 'Unbilled',
    status: 'Pending',
    source: req.body.source,
    patient_insurance_id: req.body.patient_insurance_id,
    investigation_group: req.body.type,

        },{transaction: t})
        */
  t.commit();
  return res.status(200).json(con)
    }catch(err){
        t.rollback();
        return res.status(500).json({err: err.message})
    }
}
const loadImagePrescription = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
        const visit_id = req.params.visit_id
       const view = await investigation_prescription.findAll({
        include:[patient, users, visits, antenatal_account],
        order: [['id', 'DESC']],
         where:{
            patient_id: patient_id,
            visit_id:visit_id
         }
       })
       return res.status(200).json(view)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const viewImaging = async(req, res)=>{
    try{
        const patient_id =  req.params.patient_id
    const data = await prescribed_investigation.findAll({
        where:{
            patient_id: patient_id
        },
        include: [patient,investigation, imaging, users,visits, patient_insurance, antenatal_account],
			order:[['id','DESC']]
    })
    return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const check = async(req, res)=>{
    try{
        const finds = await prescribed_investigation.update(
            {
                payment_status: 'Cleared',
                approve_id: req.body.staff_id
            },
            {
            where:{
                id: req.body.id
            }
        })
        return res.status(200).json(finds)

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const collectedImaging = async(req, res) =>{
    const t = await sequelize.transaction();
    try{
    
        const view = await prescribed_investigation.findOne({
            where:{
                id: req.body.id
            }
        })

     await prescribed_investigation.update({
        status: 'Imaging Taken',
        },{
            where:{
                id: req.body.id
            }
        },{
            transaction:t
        })

     t.commit()
     return res.status(200).json({msg: 'Imaging taken successfully'})
    }catch(err){
        t.rollback()
        return res.status(500).json({err: err.message})
    }
}
const result = async(req, res)=>{
    const t = await sequelize.transaction();
    try{
const v = await prescribed_investigation.findOne({
    where:{
        id: req.body.id
    }
})
const con = await investigation_result.create({
    prescribed_investigation_id: req.body.id,
    result: req.body.result,
    investigation_prescription_id: v.dataValues.investigation_prescription_id,
    patient_id: v.dataValues.patient_id,
    staff_id: req.body.staff_id,
    date_created: req.body.date_created,
   }, {transaction:t})

   await investigation_prescription.update({
    status: 'Result Added',
   },
{
    where:{
        id:v.dataValues.investigation_prescription_id
    }
},{transaction: t})

await prescribed_investigation.update({
    result_id: con.dataValues.id,
    is_urgent: 0,
    status: 'Result Added',
   
    },{
    where:{
        id: req.body.id
    }
},{
    transaction: t
})
t.commit();
return res.status(200).json({msg: 'Result enter successfuly'})

    }catch(err){
        t.rollback();
        return res.status(500).json({err: err.message})
    }
}
const view4approveResult = async(req, res)=>{
    try{
      const id = req.params.id
      const data = await investigation_result.findOne({
        where:{
            prescribed_investigation_id: id
        }
      })
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const approveResult = async(req, res)=>{
    const t = await sequelize.transaction();
    try{
        var m = ''
      //  { msg: 1, id: 4 }
      if(req.body.msg ===1){
        m = 'Approved' 
      }
      else{
        m = 'Rejected'
      }
      const v = await prescribed_investigation.findOne({
        where:{
            id: req.body.id
        }
      })
      await investigation_result.update({
        status: 'Partial Approved',
        comments: req.body.comment

      },{
        where:{
            prescribed_investigation_id: req.body.id
        }
      }, {transaction : t})
       
   
      await investigation_prescription.update({
        result_notes: req.body.comment,
         status: 'Partial Approved'
      },{
        where:{
            id: v.dataValues.investigation_prescription_id
        }
      },{transaction: t})

      await prescribed_investigation.update({
        result_status: req.body.comment,
        investigation_verified_date: moment(new Date()).format('YYYY-MM-DD'),
        status: m,
        investigation_approved_by: req.body.staff_id,
        investigation_approved_date: moment(new Date()).format('YYYY-MM-DD'),
        investigation_verified_by:req.body.staff_id,
        
      },{
        where:{
            id: req.body.id
        }
      },{transaction: t})
      t.commit();
        return res.status(200).json({msg: 'Final checking done succesfully'})
    }catch(err){
        t.rollback();
        return res.status(500).json({err: err.message})
    }
}
const viewResult = async(req, res)=>{
    try{
      const id = req.params.id
   const data = await investigation_result.findOne({
    include:[investigation_prescription,prescribed_investigation,patient,users],
    where:{ 
        investigation_prescription_id: id
    }
   })
   return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const viewAllResult= async(req, res)=>{
    try{
      const id = req.params.patient_id
   const data = await investigation_result.findAll({
    include:[investigation_prescription,prescribed_investigation,patient,users],
    where:{ 
        patient_id: id
    }
   })
   return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
module.exports={
    addCash,
    viewAllResult,
    result,
    viewResult,
    view4approveResult,
    approveResult,
	getAll,
    viewImaging,
    collectedImaging,
    check,
    loadImagePrescription,
    add,
	getOne,
	getAllPagings,
	paid,
	permitted,
	getAll4Patient,
	sumAmount,
	getAll2PayPatient,
    getAll2PayDependant,
    getAll4PatientHmo,
    getAll4DependantHmo,
    getAll4Antenatal,
    Billings,
    UnBillings
	
}