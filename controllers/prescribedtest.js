const { patient, cart,test_prescription, test_sample, visits, test, prescribed_test, hmo, test_results, insurance, users, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const {Op, where} = require('sequelize')
const moment = require('moment')

const getAll = async(req, res)=>{
	try{
     const data = await prescribed_test.findAll(
		{
			include: [patient,test],
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
        const data = await prescribed_test.findAndCountAll({ 
			include: [patient,test],
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
     const data = await prescribed_test.findAll(
		{ where:{
         patient_id: patient_Id,
		 payment_status:{[Op.ne]: 'Paid'},
         //billing_status:{[Op.eq]: 'Billed'},
		 id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${patient_Id} and tablename = 'Prescribed Test' and patient_table = 'patient')`)
		 }
		},
		include: [{model: test},{model: patient}],
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
     const data = await prescribed_test.findAll(
		{ where:{
         patient_id: patient_Id,
         payment_status:{
            [Op.notIn]:
            ['Paid','Pending']
         },
         //billing_status:{[Op.eq]: 'Billed'},
		 id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${patient_Id} and tablename = 'Prescribed Test' and patient_table = 'patient')`)
		 }
		},
		include: [{model: test},{model: patient}],
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
     const data = await prescribed_test.findAll(
		{ where:{
         dependant_id: dependant_Id,
         payment_status:{
            [Op.notIn]:
            ['Paid','Pending']
         },
        // billing_status:{[Op.eq]: 'Billed'},
		 id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${dependant_Id} and tablename = 'Prescribed Test' and patient_table = 'dependant')`)
		 }
		},
			include: [{model: test}, {model: patient}],
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
     const data = await prescribed_test.findAll(
		{ where:{
         ante_natal_id: antenal_Id,
         payment_status:{
            [Op.notIn]:
            ['Paid']
         },
         //billing_status:{[Op.eq]: 'Billed'},
		 id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${antenal_Id} and tablename = 'Prescribed Test' and patient_table = 'antenatal')`)
		 }
		},
			//include: [{model: drug, required: true}],
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
		const Id = req.params.pt_id
     const data = await prescribed_test.findOne(
		{ where:{ id: Id},
		include: [patient, test, test_sample, users, visits],
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
  
     const data = await prescribed_test.update(
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
const Billings = async(req, res)=>{
    try{
     const Id = req.params.id;
     var arr = [];
     arr = Id.split(',')
  
     const data = await prescribed_test.update(
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
  
     const data = await prescribed_test.update(
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
  
     const data = await prescribed_test.update(
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
     
        const data = await prescribed_test.findAll({
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
     
        const data = await prescribed_test.findAll({
              where:{
               id:{[Op.in]:arr}
           }
       
     
     });
     const obj2 = data.map((result, index)=>{
        return Object.assign({
          tableid: result.id,
          tablename: 'Prescribed Test',
          amount: result.price,
          pid: result.patient_id,
          patient_table: 'patient',
          service_id: result.test_id

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
const getAll2PayDependant = async(req, res)=>{
    try{
        const Id = req.params.id;
        var arr = [];
        arr = Id.split(',')
     
        const data = await prescribed_test.findAll({
              where:{
               id:{[Op.in]:arr}
           }
       
     
     });
     const obj2 = data.map((result, index)=>{
        return Object.assign({
          tableid: result.id,
          tablename: 'Prescribed Test',
          amount: result.price,
          pid: result.dependant_id,
          patient_table: 'dependant',
          service_id: result.test_id

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
const add = async(req, res)=>{
    const t = await sequelize.transaction();

 try{
    var arr = [];
    var arrs = []
        arr = req.body.id.split(',') 
   const datas = await test.findAll({
              where:{
               id:{[Op.in]:arr}
           }});
          
      for (let i = 0; i < arr.length; i++) {
    const data = await test_prescription.create({
    source: req.body.source,
    requester: req.body.requester,
    visit_id: req.body.visit_id,
    patient_id: req.body.patient_id,
    date_requested: req.body.date_requested ,
    date_sample_received: null,
    is_billed: null,
    has_paid: null,
    accession_number: req.body.accession_number,
    status: 'Pending',
    sample_received_by: null,
    result_notes: null,
    ante_natal_id: null
        },{transaction:t})
        arrs.push(data.dataValues.id)
    }

  
 const obj2 = datas.map((result, index)=>{
    return Object.assign({
    test_id: result.id,
    sample_id: result.sample_id,
    test_prescription_id: arrs[index],
    result_id: null,
    is_urgent: null,
    test_type: req.body.patientType,
    requester: req.body.requester,
    price: ( req.body.patientType === 'Cash'? result.price:req.body.patientType === 'Retainership'? result.retainership_price:req.body.patientType === 'Private'? result.phis_price :  req.body.patientType === 'NHIS'? result.nhis_price: null  ), //***** */
    visit_id: req.body.visit_id,
    patient_id: req.body.patient_id,
    date_requested: req.body.date_requested ,
    payment_status: 'Pending',
    billing_status: 'Unbilled',
    status: 'Pending',
    result_status: 'Pending',
    test_verified_date: null,
    test_approved_date: null,
    test_verified_by: null,
    test_approved_by: null,
    nhis_status: null,
    ante_natal_id: null,
    surgery_id: null,
    source: req.body.source,
    auth_code: null,
    patient_insurance_id: req.body.patient_insurance_id,
    test_group: result.type,
    test_changed_by: null,
    nhis_test_processed_by: null,
    date_nhis_test_processed: null,
    tester_id: null,
    test_conducted_date: null,
    permittedby: null,
    permitted_date: null

        })})
        const con = await prescribed_test.bulkCreate(obj2, {transaction: t})
  t.commit();
  return res.status(200).json(con)
    }catch(err){
        t.rollback();
        return res.status(500).json({err: err.message})
    }
/*
    try{
        const finds = await test.findOne({
            where:{
                id: req.body.id
            }
        })
    const data = await test_prescription.create({
    source: req.body.source,
    requester: req.body.requester,
    visit_id: req.body.visit_id,
    patient_id: req.body.patient_id,
    date_requested: req.body.date_requested ,
    date_sample_received: null,
    is_billed: null,
    has_paid: null,
    accession_number: req.body.accession_number,
    status: 'Pending',
    sample_received_by: null,
    result_notes: null,
    ante_natal_id: null
        },{transaction:t})

    const tests = await prescribed_test.create({
    test_id: finds.dataValues.id,
    sample_id: finds.dataValues.sample_id,
    test_prescription_id: data.dataValues.id,
    result_id: null,
    is_urgent: null,
    test_type: req.body.patientType,
    requester: req.body.requester,
    price: req.body.amount,
    visit_id: req.body.visit_id,
    patient_id: req.body.patient_id,
    date_requested: req.body.date_requested ,
    payment_status: 'Pending',
    billing_status: 'Unbilled',
    status: 'Pending',
    result_status: 'Pending',
    test_verified_date: null,
    test_approved_date: null,
    test_verified_by: null,
    test_approved_by: null,
    nhis_status: null,
    ante_natal_id: null,
    surgery_id: null,
    source: req.body.source,
    auth_code: null,
    patient_insurance_id: req.body.patient_insurance_id,
    test_group: req.body.type,
    test_changed_by: null,
    nhis_test_processed_by: null,
    date_nhis_test_processed: null,
    tester_id: null,
    test_conducted_date: null,
    permittedby: null,
    permitted_date: null
    },{transaction: t})
t.commit()
return res.status(200).json(tests)
    }catch(err){
        t.rollback()
        return res.status(500).json({err: err.message})
    }
    */
}
const addCast = async(req, res)=>{
    const t = await sequelize.transaction();

 try{
    var arr = [];
    var arrs = []
        arr = req.body.id.split(',') 
   const datas = await test.findAll({
              where:{
               id:{[Op.in]:arr}
           }});
          
      for (let i = 0; i < arr.length; i++) {
    const data = await test_prescription.create({
    source: req.body.source,
    requester: req.body.requester,
    visit_id: req.body.visit_id,
    patient_id: req.body.patient_id,
    date_requested: req.body.date_requested ,
    date_sample_received: null,
    is_billed: null,
    has_paid: null,
    accession_number: req.body.accession_number,
    status: 'Pending',
    sample_received_by: null,
    result_notes: null,
    ante_natal_id: null
        },{transaction:t})
        arrs.push(data.dataValues.id)
    }

  
 const obj2 = datas.map((result, index)=>{
    return Object.assign({
    test_id: result.id,
    sample_id: result.sample_id,
    test_prescription_id: arrs[index],
    result_id: null,
    is_urgent: null,
    test_type: req.body.patientType,
    requester: req.body.requester,
    price: result.price, //***** */
    visit_id: req.body.visit_id,
    patient_id: req.body.patient_id,
    date_requested: req.body.date_requested ,
    payment_status: 'Pending',
    billing_status: 'Unbilled',
    status: 'Pending',
    result_status: 'Pending',
    test_verified_date: null,
    test_approved_date: null,
    test_verified_by: null,
    test_approved_by: null,
    nhis_status: null,
    ante_natal_id: null,
    surgery_id: null,
    source: req.body.source,
    auth_code: null,
    patient_insurance_id: req.body.patient_insurance_id,
    test_group: result.type,
    test_changed_by: null,
    nhis_test_processed_by: null,
    date_nhis_test_processed: null,
    tester_id: null,
    test_conducted_date: null,
    permittedby: null,
    permitted_date: null

        })})
        const con = await prescribed_test.bulkCreate(obj2, {transaction: t})
  t.commit();
  return res.status(200).json(con)
    }catch(err){
        t.rollback();
        return res.status(500).json({err: err.message})
    }
/*
    try{
        const finds = await test.findOne({
            where:{
                id: req.body.id
            }
        })
    const data = await test_prescription.create({
    source: req.body.source,
    requester: req.body.requester,
    visit_id: req.body.visit_id,
    patient_id: req.body.patient_id,
    date_requested: req.body.date_requested ,
    date_sample_received: null,
    is_billed: null,
    has_paid: null,
    accession_number: req.body.accession_number,
    status: 'Pending',
    sample_received_by: null,
    result_notes: null,
    ante_natal_id: null
        },{transaction:t})

    const tests = await prescribed_test.create({
    test_id: finds.dataValues.id,
    sample_id: finds.dataValues.sample_id,
    test_prescription_id: data.dataValues.id,
    result_id: null,
    is_urgent: null,
    test_type: req.body.patientType,
    requester: req.body.requester,
    price: req.body.amount,
    visit_id: req.body.visit_id,
    patient_id: req.body.patient_id,
    date_requested: req.body.date_requested ,
    payment_status: 'Pending',
    billing_status: 'Unbilled',
    status: 'Pending',
    result_status: 'Pending',
    test_verified_date: null,
    test_approved_date: null,
    test_verified_by: null,
    test_approved_by: null,
    nhis_status: null,
    ante_natal_id: null,
    surgery_id: null,
    source: req.body.source,
    auth_code: null,
    patient_insurance_id: req.body.patient_insurance_id,
    test_group: req.body.type,
    test_changed_by: null,
    nhis_test_processed_by: null,
    date_nhis_test_processed: null,
    tester_id: null,
    test_conducted_date: null,
    permittedby: null,
    permitted_date: null
    },{transaction: t})
t.commit()
return res.status(200).json(tests)
    }catch(err){
        t.rollback()
        return res.status(500).json({err: err.message})
    }
    */
}
const viewByPerson = async (req, res)=>{
    try{
     const patient_id = req.params.patient_id
     const data = await prescribed_test.findAll({
        where:{
            patient_id: patient_id
        },
        include:[test_sample, visits, test, patient, users]
     })
     return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const check = async(req, res)=>{
    try{
        const finds = await prescribed_test.update(
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
const collectedSample = async(req, res) =>{
    const t = await sequelize.transaction();
    try{
        const view = await prescribed_test.findOne({
            where:{
                id: req.body.id
            }
        })
     await prescribed_test.update({
        status: 'Sample Collected',
        },{
            where:{
                id: req.body.id
            }
        },{
            transaction:t
        })
     await test_prescription.update({
        date_sample_received: moment(new Date()).format('YYYY-MM-DD'),
        status: 'Sample Collected',
        sample_received_by: req.body.staff_id,

     },{
        where:{
            id: view.dataValues.test_prescription_id
        }
     },{
        transaction:t
     })
     t.commit()
     return res.status(200).json({msg: 'Sample colleted successfully'})
    }catch(err){
        t.rollback()
        return res.status(500).json({err: err.message})
    }
}
const result = async(req, res)=>{
    const t = await sequelize.transaction();
    try{
const v = await prescribed_test.findOne({
    where:{
        id: req.body.id
    }
})
const con = await test_results.create({
    prescribed_test_id: req.body.id,
    result: req.body.result,
    test_prescription_id: v.dataValues.test_prescription_id,
    patient_id: v.dataValues.patient_id,
    staff_id: req.body.staff_id,
    date_created: req.body.date_created,
    is_abnormal: req.body.is_abnormal,
    //status: req.body.status,
    //comments: req.body.comment
   }, {transaction:t})

   await test_prescription.update({
   // result_notes: req.body.comment,
    status: 'Completed',
   },
{
    where:{
        id:v.dataValues.test_prescription_id
    }
},{transaction: t})

await prescribed_test.update({
    result_id: con.dataValues.id,
    is_urgent: 0,
    status: 'Completed',
    //result_status: req.body.status,
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
      const data = await test_results.findOne({
        where:{
            prescribed_test_id: id
        }
      })
        return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const view4result = async(req, res)=>{
    try{
      const id = req.params.id
      const data = await test_results.findOne({
        include:[patient,test_prescription, users, prescribed_test ],
        where:{
            test_prescription_id: id
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
        m = 'Accepted'
      }
      else{
        m = 'Rejected'
      }
      const v = await prescribed_test.findOne({
        where:{
            id: req.body.id
        }
      })
      await test_results.update({
        status: m,
        comments: req.body.comment

      },{
        where:{
            prescribed_test_id: req.body.id
        }
      }, {transaction : t})
       
      await test_prescription.update({
        result_notes: req.body.comment,
        test_verified_date: moment(new Date()).format('YYYY-MM-DD'),
        test_approved_by: req.body.staff_id,
        test_approved_date: moment(new Date()).format('YYYY-MM-DD'),
        test_verified_by:req.body.staff_id,
      },{
        where:{
            id: v.dataValues.test_prescription_id
        }
      },{transaction: t})

      await prescribed_test.update({
        result_status: req.body.comment,
        test_verified_date: moment(new Date()).format('YYYY-MM-DD'),
        test_approved_by: req.body.staff_id,
        test_approved_date: moment(new Date()).format('YYYY-MM-DD'),
        test_verified_by:req.body.staff_id,
        
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
const viewAllresult = async(req, res)=>{
    try{
      const id = req.params.patient_id
      const data = await test_results.findAll({
        include:[patient,test_prescription, users, prescribed_test ],
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
    viewAllresult,
    view4result,
    approveResult,
    view4approveResult,
    result,
    collectedSample,
    viewByPerson,
    check,
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
    UnBillings,
    add,
    addCast
}