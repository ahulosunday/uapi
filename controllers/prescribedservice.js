const { patient, cart, service,admission, prescribed_service, hmo, insurance, users, visits, antenatal_account,bed, patient_insurance, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const {Op } = require('sequelize')

const getAll = async(req, res)=>{
	try{
     const data = await prescribed_service.findAll(
		{
			include: [patient,service],
			order:[['id','ASC']]
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
        const data = await prescribed_service.findAndCountAll({ 
			include: [patient,service],
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
const getAll4Patient = async(req, res)=>{
	try{
	
		const patient_Id = req.params.patient_id
     const data = await prescribed_service.findAll(
		{ where:{
         patient_id: patient_Id,
		 payment_status:{[Op.ne]: 'Paid'},
        //billing_status:{[Op.eq]: 'Billed'},
		 id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${patient_Id} and tablename = 'Prescribed Services' and patient_table = 'patient')`)
		 }
		},
		include: [{model: service}, {model: patient}],
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
     const data = await prescribed_service.findAll(
		{ where:{
         patient_id: patient_Id,
         payment_status:{
            [Op.notIn]:
            ['Paid', 'Pending']
         },
         //billing_status:{[Op.eq]: 'Billed'},
		 id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${patient_Id} and tablename = 'Prescribed Services' and patient_table = 'patient')`)
		 }
		},
		include: [{model: service}, {model: patient}],
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
     const data = await prescribed_service.findAll(
		{ where:{
         dependant_id: dependant_Id,
         payment_status:{
            [Op.notIn]:
            ['Paid','Pending']
         },
         //billing_status:{[Op.eq]: 'Billed'},
		 id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${dependant_Id} and tablename = 'Prescribed Services' and patient_table = 'dependant')`)
		 }
		},
		include: [service, patient],
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
	
		const antenatal_Id = req.params.ante_natal_id
     const data = await prescribed_service.findAll(
		{ where:{
         ante_natal_id: antenatal_Id_Id,
         payment_status:{
            [Op.notIn]:
            ['Paid']
         },
         //billing_status:{[Op.eq]: 'Billed'},
		 id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${antenatal_Id} and tablename = 'Prescribed Services' and patient_table = 'antenatal')`)
		 }
		},
		include: [service, patient],
			order:[['updatedAt','DESC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getOne = async(req, res)=>{
	try{
		const Id = req.params.pd_id
     const data = await prescribed_service.findOne(
		{ where:{ id: Id},
		include: [patient, service, users, visits, antenatal_account, patient_insurance ],
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
  
     const data = await prescribed_service.update(
       {
            payment_status:'Paid'
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
  
     const data = await prescribed_service.update(
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
const Billings = async(req, res)=>{
    try{
     const Id = req.params.id;
     var arr = [];
     arr = Id.split(',')
  
     const data = await prescribed_service.update(
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
  
     const data = await prescribed_service.update(
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
const sumAmount = async(req, res)=>{
    try{
        const Id = req.params.id;
        var arr = [];
        arr = Id.split(',')
     
        const data = await prescribed_service.findAll({
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
     
        const data = await prescribed_service.findAll({
              where:{
               id:{[Op.in]:arr}
           }
       
     
     });
     const obj2 = data.map((result, index)=>{
        return Object.assign({
          tableid: result.id,
          tablename: 'Prescribed Services',
          amount: result.price,
          pid: result.patient_id,
          patient_table: 'patient',
          service_id:result.service_id

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
     
        const data = await prescribed_service.findAll({
              where:{
               id:{[Op.in]:arr}
           }
       
     
     });
     const obj2 = data.map((result, index)=>{
        return Object.assign({
          tableid: result.id,
          tablename: 'Prescribed Services',
          amount: result.price,
          pid: result.dependant_id,
          patient_table: 'dependant',
          service_id:result.nservice_id? result.nservice_id : result.service_id

        })
        })
          await cart.bulkCreate(obj2).then(resp=>{
            return res.status(200).json(data)
          }).catch(err=>{
            return res.status(500).json({err: err.message})
          })
        
           
   
       }
       catch(err){
           return res.status(500).json({err: err.message})
       }

}

const add = async(req, res) =>{
     const t = await sequelize.transaction();
    try{
        var arr = [];
                arr = req.body.service_id.split(',') 
           const datas = await service.findAll({
                      where:{
                       id:{[Op.in]:arr}
                   }});

    const obj2 = datas.map((result, index)=>{
    return Object.assign({
    service_id: result.id,
    is_urgent: 0,
    service_type: req.body.service_type,
    requester: req.body.requester,
    price: result.price ,
    date_requested: req.body.date_requested,
    visit_id: req.body.visit_id,
    patient_id: req.body.patient_id,
     payment_status: req.body.payment_status,
    billing_status: req.body.billing_status,
    quantity: 1,
    source: req.body.source,
    patient_insurance_id: req.body.patient_insurance_id,
    service_group: result.type
    })
})
       const data = await prescribed_service.bulkCreate(
        obj2, {transaction: t}
       )
  await t.commit();
  return res.status(200).json(data)
    }catch(err){
        await t.rollback();
        return res.status(500).json({err: err.message})
    }
}
const viewService = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
      const data = await prescribed_service.findAll({
        include: [patient, service, users, visits, antenatal_account, patient_insurance ],
        order:[['payment_status','DESC']],
        where:{
            patient_id: patient_id
        }
      })
      return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const admissionAdd = async(req, res)=>{
    const t = await sequelize.transaction();
    try{
       const ad =  await admission.findOne({
            where:{
                patient_id: req.body.patient_id,
                discharge_status: 'On Admission'
            }
        })
        if(ad === null){
        const dataservice = await service.findOne({
            where:{
                id: req.body.service_id
            }
        })
      
    const data = await admission.create({
    patient_id: req.body.patient_id,
    ward_id: req.body.ward_id,
    bed_id: req.body.bed_id,
    visit_id: req.body.visit_id,
    admitted_by: req.body.admitted_by,
    discharge_status: req.body.discharge_status,
    comment: req.body.comment,
    date_admitted: req.body.date_admitted,
    patient_insurance_id: req.body.patient_insurance_id,
    ante_natal_id: req.body.ante_natal_id
    },{transaction : t})
     
    await bed.update({
        status: 'Taken'
    },{
     where:{
        id: req.body.bed_id
     }
    }, {transaction: t})
    const presService = await prescribed_service.create({
    service_id: req.body.service_id,
    is_urgent: 0,
    service_type: req.body.type,
    requester: req.body.admitted_by,
    price: dataservice.dataValues.price ,
    visit_id: req.body.visit_id,
    patient_id: req.body.patient_id,
    date_requested: req.body.date_admitted,
    payment_status: 'Pending',
    billing_status: 'Pending',
    quantity: 1,
    source: req.body.source,
    patient_insurance_id: req.body.patient_insurance_id,
    service_group: dataservice.dataValues.type
    }, {transaction: t})
   await t.commit();
    return res.status(200).json(presService)
}else{
return res.status(500).json({mgs: 'Patient aleady admitted'})
}
    }catch(err){
     await t.rollback();
        return res.status(500).json({err: err.message})
    }
}
const cleared = async(req, res)=>{
    try{
      const data = await prescribed_service.update({
        payment_status: 'Cleared',
      },{
        where:{
            id: req.body.id
        }
      })
      return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

module.exports={
    add,
    cleared,
    admissionAdd,
    viewService,
	getAll,
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