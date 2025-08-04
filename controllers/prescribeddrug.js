const { patient, cart, drug, prescribed_drug, pharmacy_store_item,
	 route_of_administration, measurement, users, visits, dosage_form, inventories,drug_prescription, pharmacy_store_item_log, sequelize } = require('../models');
const {Op, where }= require('sequelize')
const {getPagination, getPagingData} = require('../helpers/paging')
const moment = require('moment');

const getAll = async(req, res)=>{
	try{
     const data = await prescribed_drug.findAll(
		{
			include: [patient, drug],
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
		//const tablename = req.params.tablename
     const data = await prescribed_drug.findAll(
		{ 
			//include:[cart, drug, patient, route_of_administration, measurement, users, visits, inventories],
			where:{
         patient_id: patient_Id,
		 payment_status:{[Op.ne]: 'Paid'},
		 //billing_status:{[Op.eq]: 'Billed'},
		 id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${patient_Id} and tablename = 'Prescribed Drugs' and patient_table = 'patient')`)
		 }
		},
			include: [{model: drug}, {model: patient},{model: route_of_administration},{model:measurement},{model: users},{model: visits},{model:inventories}],
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
		const tablename = req.params.tablename
     const data = await prescribed_drug.findAll(
		{ where:{
         patient_id: patient_Id,
		 payment_status:{
			[Op.notIn]:
			['Paid','Pending']
		 },
		 //billing_status:{[Op.eq]: 'Billed'},
		 id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${patient_Id} and tablename = 'Prescribed Drugs' and patient_table = 'patient')`)
		 }
		},
		include: [{model: drug}, {model: patient} ],
			order:[['updatedAt','DESC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getAll4DeoendantHmo = async(req, res)=>{
	try{
	
		const dependant_Id = req.params.dependant_id
     const data = await prescribed_drug.findAll(
		{ where:{
         patient_id: dependant_Id,
		 payment_status:{
			[Op.notIn]:
			['Paid','Pending']
		 },
		 //billing_status:{[Op.eq]: 'Billed'},
		 id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${dependant_Id} and tablename = 'Prescribed Drugs' and patient_table = 'dependant')`)
		 }
		},
		include: [{model: drug}, {model: patient} ],
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
		const tablename = req.params.tablename
     const data = await prescribed_drug.findAll(
		{ where:{
         ante_natal_id: antenal_Id,
		 payment_status:{
			[Op.notIn]:
			['Paid']
		 },
		// billing_status:{[Op.eq]: 'Billed'},
		 id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${antenal_Id} and tablename = 'Prescribed Drugs' and patient_table = 'antenatal')`)
		 }
		},
		include: [{model: drug, required: true}, {model: patient, required: true} ],
			order:[['updatedAt','DESC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
/*
const getAll4PatientHmo = async(req, res)=>{
	try{
	
		const patient_Id = req.params.patient_id
     const data = await prescribed_drug.findAll(
		{ where:{
         patient_id: patient_Id,
		 payment_status:{[Op.ne]: 'Paid'},
		 drug_id:{[Op.is]: null}
		},
			include: [{model: nhisdrug, required: true}],//patient, dependant, nhisdrug,drug, antenatals
			order:[['updatedAt','DESC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getAllPatientOnly = async(req, res)=>{
	try{
	
     const data = await prescribed_drug.findAll(
		{ where:{
         payment_status:{
			[Op.ne]: 'Paid'
		 },
		  hmo_id:{
			[Op.is]: null
		 }
		 
		},
		attributes:[['patient_id', 'patient_id']],
		group:['patient_id'],
		include: [{model: patient, required: true}] //patient, dependant, nhisdrug,drug, antenatals
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getAllPatientOnlyHmo = async(req, res)=>{
	try{
	
     const data = await prescribed_drug.findAll(
		{ where:{
         payment_status:{
			[Op.ne]: 'Paid'
		 },
		  hmo_id:{
			[Op.ne]: null
		 }
		 
		},
		attributes:['patient_id', 'patient_id'],
		group:['patient_id'],
		include: [{model: patient, required: true}] //patient, dependant, nhisdrug,drug, antenatals
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
*/
const getAllPagings = async(req, res)=>{
	
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await prescribed_drug.findAndCountAll({ 
			include: [{model: drug, required: true}, {model: patient, required: true} ],
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
		const Id = req.params.pd_id
     const data = await prescribed_drug.findOne(
		{ where:{ id: Id},
		include: [{model: drug}, {model: patient} ],
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
  
     const data = await prescribed_drug.update(
       {
            payment_status:'Paid'
        },
        
        {
            where:{
            id:{[Op.in]:arr}
        }
    });
	return res.statu(200).json(data)

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
  
     const data = await prescribed_drug.update(
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
  
     const data = await prescribed_drug.update(
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
  
     const data = await prescribed_drug.update(
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
        return res.status(500).json({err: err.message});
    }
}

const sumAmount = async(req, res)=>{
    try{
        const Id = req.params.id;
        var arr = [];
        arr = Id.split(',')
     
        const data = await prescribed_drug.findAll({
         attributes: [ [sequelize.fn('SUM', sequelize.col('total_price')), 'amount']],          
           
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
     
        const data = await prescribed_drug.findAll({
              where:{
               id:{[Op.in]:arr}
           }
       
     
     });
     const obj2 = data.map((result, index)=>{
        return Object.assign({
          tableid: result.id,
          tablename: 'Prescribed Drugs',
          amount: result.total_price,
          pid: result.patient_id,
          patient_table: 'patient',
		  service_id:result.drug_id

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
     
        const data = await prescribed_drug.findAll({
              where:{
               id:{[Op.in]:arr}
           }
       
     
     });
     const obj2 = data.map((result, index)=>{
        return Object.assign({
          tableid: result.pd_id,
          tablename: 'Prescribed Drugs',
          amount: result.capitated_price,
          pid: result.dependant_id,
          patient_table: 'dependant',
		  service_id:result.drug_id

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
		
		/**

inputs.immunization_id = null
inputs.auth_code = null
inputs.ante_natal_id = null
inputs.surgery_id = null
inputs.dispensed_by =null
inputs.returned_by = null
inputs.nhis_status = null
inputs.quantity_dispensed = null
inputs.quantity_returned = null
inputs.strength_id =null  //coming back later
inputs.reason_for_return = null
inputs.drug_prescription_id =null
		 */

req.body.dispense_status = 'Pending'
req.body.date_prescribed = moment(new Date()).format('YYYY-MM-DD')

if((req.body.drug_type === "NHIS") && (req.body.drug_group === 'Secondary')){
//Note that authorisation is required, come back later
var cal = 0//parseFloat(total) * parseInt(prescribed)
req.body.total_price = cal
}
else if(req.body.drug_type === "NHIS"){
var cal = parseFloat(req.body.total_price) * parseInt( req.body.quantity_prescribed)
var calculate = ((10/100) * parseFloat(cal))
req.body.total_price = calculate
}
else{
var cal = parseFloat(req.body.total_price) * parseInt(req.body.quantity_prescribed)
req.body.total_price = cal
}

const ast = await drug_prescription.create({
	source: req.body.source,
	requester: req.body.examiner,
	visit_id: req.body.visit_id,
	patient_id: req.body.patient_id,
	date_prescribed: req.body.date_prescribed,
	is_billed: 1,
	has_paid: 0,
	ante_natal_id: req.body.ante_natal_id,
	status: 'Pending',
	},{transaction: t},)
 
	req.body.drug_prescription_id = ast.dataValues.id
	req.body.original_total_price = (parseFloat(req.body.total_price) * parseFloat(req.body.quantity_prescribed))

const ass = await prescribed_drug.create(req.body,{transaction: t})
	await t.commit();
	   return res.status(200).json(ass)
	}catch(err){
		await t.rollback();
		return res.status(500).json({err: err.message})
	}
}
const getAll4Patient2dispense = async(req, res)=>{
	try{
	
		const patient_Id = req.params.patient_id
     const data = await prescribed_drug.findAll(
		{ 
			where:{
         patient_id: patient_Id,
	      
		},
			include: [patient,route_of_administration,measurement,users, visits,inventories, drug ],
			order:[['id','DESC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getAll4Patient2Dispenses = async(req, res)=>{
	try{
	
		const id = req.params.id
     const data = await prescribed_drug.findOne(
		{ 
			where:{
         id: id,
	      
		},
			include: [patient,dosage_form, route_of_administration,measurement,users, visits,inventories, drug ],
			order:[['id','DESC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const dispensedDrug = async(req, res)=>{
	const t = await sequelize.transaction();

	try{
		const finds = await prescribed_drug.findOne(
			{
				where:{
					id: req.body.id
				}
			}
		)

        const pharmacy= await pharmacy_store_item.findOne({
		where:{
			id: finds.dataValues.pharmacy_id
				/*
			    drug_id: finds.dataValues.drug_id,
                inventory_id: finds.dataValues.inventory_id,
                drug_type: finds.dataValues.drug_type,
                drug_form: 'Drug',
                measurement_id: finds.dataValues.measurement_id,
                dosage_form_id : finds.dataValues.dosage_form_id,
                unit_id:  finds.dataValues.unit_id,
                strength_input: finds.dataValues.strength_input
			
			drug_id: finds.dataValues.drug_id,
			drug_form: 'Drug', 
			drug_type: finds.dataValues.drug_type,
			inventory_id: finds.dataValues.inventory_id
			*/
		}
	})

	if((parseInt(pharmacy.dataValues.quantity_remaining) < parseInt(req.body.quantity_dispensed)) || parseInt(req.body.quantity_dispensed === 0)){
     return res.status(500).json({msg: 'Insufficient quantity: You must dispense all then later do return'})
	}else{
     //drug_id,drug_form, drug_type,inventory_id
		const add = await prescribed_drug.update({
			dispensed_by: req.body.staff_id,
			quantity_dispensed: req.body.quantity_dispensed,
			dispense_status: 'Dispensed',
			date_dispensed: moment(new Date()).format('YYYY-MM-DD')
		},{
			where:{
				id: req.body.id
			}
		},{
	transaction: t
		},)
		const phe = await pharmacy_store_item.update({
			quantity_remaining: parseInt(pharmacy.dataValues.quantity_remaining) - parseInt(req.body.quantity_dispensed)
		},{
			where:{
				id: pharmacy.dataValues.id
			}
		},{
			transaction: t
		})
		await pharmacy_store_item_log.create({
		id:pharmacy.dataValues.id,
		drug_id: pharmacy.dataValues.drug_id,
		product_code: pharmacy.dataValues.product_code,
		shelf: pharmacy.dataValues.shelf,
		voucher: pharmacy.dataValues.voucher,
		batch: pharmacy.dataValues.batch,
		quantity_remaining:  ((-1)*(req.body.quantity_dispensed)),
		quantity_received:((-1)*(req.body.quantity_dispensed)),
		unit_id: pharmacy.dataValues.unit_id,
		unit_price: (parseFloat(pharmacy.dataValues.unit_price)),
		selling_price: (parseFloat(pharmacy.dataValues.unit_price)),
		total_price: (parseFloat(req.body.quantity_dispensed) * (parseFloat(pharmacy.dataValues.unit_price) * (-1))),
		expiration: pharmacy.dataValues.expiration,
		staff_id: req.body.staff_id,
		date_received: moment(new Date()).format('YYYY-MM-DD'),
		drug_form: pharmacy.dataValues.drug_form,
		drug_type: pharmacy.dataValues.drug_type,
		drug_group: pharmacy.dataValues.drug_group,
		status: pharmacy.dataValues.status,
		route_id: pharmacy.dataValues.route_id,
		strength_input: pharmacy.dataValues.strength_input,
		measurement_id: pharmacy.dataValues.measurement_id,
		dosage_form_id: pharmacy.dataValues.dosage_form_id,
		brand: pharmacy.dataValues.brand,
		inventory_id: pharmacy.dataValues.inventory_id,
		vendor_id: pharmacy.dataValues.vendor_id,
		inventory_item_id: pharmacy.dataValues.inventory_item_id
		},{
			transaction: t
		},) 
	
		await t.commit()
		return res.status(200).json({msg: 'OK'})
	}
	
	}catch(err){
	await t.rollback()
		return res.status(500).json({err: err.message})
	}
}
const refundDrug = async(req, res)=>{
	const t = await sequelize.transaction();
	try{

		const finds = await prescribed_drug.findOne(
			{
				where:{
					id: req.body.id
				}
			}
		)
		const pharmacy= await pharmacy_store_item.findOne({
			where:{
				id: finds.dataValues.pharmacy_id
				/*
				drug_id: finds.dataValues.drug_id,
				drug_form: 'Drug', 
				drug_type: finds.dataValues.drug_type,
				inventory_id: finds.dataValues.inventory_id
				*/
			}
		})
		 
		//drug_id,drug_form, drug_type,inventory_id
	const add = await prescribed_drug.update({
		quantity_returned: req.body.quantity_returned,
		returned_by: req.body.staff_id,
		reason_for_return: req.body.reason_for_return,
		date_returned: moment(new Date()).format('YYYY-MM-DD')
	},{
		where:{
			id: req.body.id
		}
	}, {
		transaction: t
	}) 
	
	
	await pharmacy_store_item.update({
		quantity_remaining: parseInt(pharmacy.dataValues.quantity_remaining) +  parseInt(req.body.quantity_returned),
		
	},{
		where:{
			id: pharmacy.dataValues.id
		}
	},{
		transaction: t
	})
	await pharmacy_store_item_log.create({
	id:pharmacy.dataValues.id,
	drug_id: pharmacy.dataValues.drug_id,
    product_code: pharmacy.dataValues.product_code,
    shelf: pharmacy.dataValues.shelf,
    voucher: pharmacy.dataValues.voucher,
    batch: pharmacy.dataValues.batch,
    quantity_remaining: req.body.quantity_returned,
	quantity_received: req.body.quantity_returned,
    unit_id: pharmacy.dataValues.unit_id,
    unit_price: pharmacy.dataValues.unit_price,
    selling_price:pharmacy.dataValues.unit_price,
    total_price: (parseFloat(pharmacy.dataValues.unit_price) * parseFloat(req.body.quantity_returned)),
    expiration: pharmacy.dataValues.expiration,
    staff_id: req.body.staff_id,
    date_received: moment(new Date()).format('YYYY-MM-DD'),
    drug_form: pharmacy.dataValues.drug_form,
    drug_type: pharmacy.dataValues.drug_type,
    drug_group: pharmacy.dataValues.drug_group,
    status: pharmacy.dataValues.status,
    route_id: pharmacy.dataValues.route_id,
    strength_input: pharmacy.dataValues.strength_input,
    measurement_id: pharmacy.dataValues.measurement_id,
    dosage_form_id: pharmacy.dataValues.dosage_form_id,
    brand: pharmacy.dataValues.brand,
    vendor_id: pharmacy.dataValues.vendor_id,
    inventory_id: pharmacy.dataValues.inventory_id,
	inventory_item_id: pharmacy.dataValues.inventory_item_id
	},{
		transaction: t
	}) 
	await t.commit()
return res.status(200).json(add)
	}catch(err){
		await t.rollback()
		return res.status(500).json({err: err.message})
	}
}
const hmodrug = async(req, res)=>{

	try{
		const id = req.params.patient_id
		const ap = await prescribed_drug.findAll({
          where:{
			patient_id: id
		  },
		  include: [ patient, drug,	route_of_administration, measurement, users, visits, dosage_form, inventories],
		  order:[['id','DESC']]
		})
      return res.status(200).json(ap)
	}catch(err){
		return res.status(500).json({err: err.message})
	}
}
const nhisCleared = async(req, res)=>{
	try{
		const add = await prescribed_drug.findOne({
			where:{
				id: req.body.id
			}
		})
		if(add.dataValues.drug_type ==='Retainership' || add.dataValues.drug_type ==='Private'){
			const data = await prescribed_drug.update({
				payment_status: 'Cleared',
				nhis_status: 'Approved',
			   },{
				where:{
					id: req.body.id
		
				}
			   })
			   return res.status(200).json(data)
		}
		else{
			const data = await prescribed_drug.update({
				payment_status: 'Cleared',
				nhis_status: 'Approved',
			   },{
				where:{
					id: req.body.id,
					drug_group: 'Primary',
		
				}
			   })
			   return res.status(200).json(data)
		}
       
	}catch(err){
		return res.status(500).json({err: err.message})
	}
}
const nhisAutharisation = async(req, res)=>{
	try{
		
    const data = await prescribed_drug.update({
		nhis_status: 'Approved',
		auth_code: req.body.auth_code,
		nhis_drug_processed_by: req.body.staff_id,
		date_nhis_drug_processed: moment(new Date()).format('YYYY-MM-DD')
	},
{
	where:{
		id: req.body.id,
		drug_group: 'Secondary',
	}
})
return res.status(200).json(data)
	}catch(err){
		return res.status(500).json({err:err.message})
	}
}
module.exports={
	nhisAutharisation,
	add,
	hmodrug,
	refundDrug,
	dispensedDrug,
	nhisCleared,
	getAll4Patient2Dispenses,
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
	getAll4DeoendantHmo,
	getAll4Antenatal,
	Billings,
	UnBillings,
	getAll4Patient2dispense
	
}