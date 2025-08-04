const { additional_item_prescription, pharmacy_store_item, drug_prescription,patient, drug, users, visits, pharmacy_store_item_log, prescribed_drug, patient_insurance,admission, inventories, additional_treatment, antenatal_account,cart, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const {Op} = require('sequelize')
const moment = require('moment');

const getAll = async(req, res)=>{
	const data = await additional_item_prescription.findAll({
		include: [patient, drug ],
            order:[['id','ASC']]});
         return res.status(200).json(data);

}
const getAll4Patient = async(req, res)=>{
	try{
	const patient_Id = req.params.patient_id
     const data = await additional_item_prescription.findAll(
		{ where:{
         patient_id: patient_Id,
		 payment_status:{[Op.ne]: 'Paid'},
         //billing_status:{[Op.eq]: 'Billed'},
         id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${patient_Id} and tablename = 'Additional Item' and patient_table = 'patient')`)
		 }
		},
		include: [{model: drug},{model: patient}],
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
     const data = await additional_item_prescription.findAll(
		{ where:{
         patient_id: patient_Id,
		 payment_status:{
            [Op.notIn]:
            ['Paid','Pending']
         },
         //billing_status:{[Op.eq]: 'Billed'},
         id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${patient_Id} and tablename = 'Additional Item' and patient_table = 'patient')`)
		 }
		},
		include: [{model: drug}, {model: patient}],
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
     const data = await additional_item_prescription.findAll(
		{ where:{
         dependant_id: dependant_Id,
		 payment_status:{
            [Op.notIn]:
            ['Paid','Pending']
         },
         //billing_status:{[Op.eq]: 'Billed'},
         
         id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${dependant_Id} and tablename = 'Additional Item' and patient_table = 'dependant')`)
		 }
		},
		include: [{model: drug}, {model: patient}],
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
     const data = await additional_item_prescription.findAll(
		{ where:{
         ante_natal_id: antenatal_Id,
		 payment_status:{
            [Op.notIn]:
            ['Paid']
         },
         //billing_status:{[Op.eq]: 'Billed'},
         id:{
			[Op.notIn]: sequelize.literal(`(select tableid from carts where pid = ${antenatal_Id} and tablename = 'Additional Item' and patient_table = 'antenatal')`)
		 }
		},
        include: [{model: drug}, {model: patient}],
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
        const data = await additional_item_prescription.findAndCountAll({ 
			include: [{model: drug}, {model: patient}],
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
const getOne = async (req, res)=>{
    try{
        const Id = req.params.id;
        const data = await additional_item_prescription.findOne({
            where:{id:Id}, 
            include: [{model: drug}, {model: patient}]
        })
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
  
     const data = await additional_item_prescription.update(
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
  
     const data = await additional_item_prescription.update(
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
  
     const data = await additional_item_prescription.update(
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
const payment = async(req, res)=>{
    try{
        const Id = req.params.id;
        var arr = [];
        arr = Id.split(',')
     
        const data = await additional_item_prescription.update(
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
const sumAmount = async(req, res)=>{
    try{
        const Id = req.params.id;
        var arr = [];
        arr = Id.split(',')
     
        const data = await additional_item_prescription.findAll({
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
     
        const data = await additional_item_prescription.findAll({
              where:{
               id:{[Op.in]:arr}
           }
       
     
     });
     const obj2 = data.map((result, index)=>{
        return Object.assign({
          tableid: result.id,
          tablename: 'Additional Item',
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
     
        const data = await additional_item_prescription.findAll({
              where:{
               id:{[Op.in]:arr}
           }
       
     
     });
     const obj2 = data.map((result, index)=>{
        return Object.assign({
          tableid: result.id,
          tablename: 'Additional Item',
          amount: result.price,
          pid: result.patient_id,
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
       
        const prescribed_drug_ids = await drug_prescription.findOne({
            where:{
                id: req.body.prescribed_drug_id
            }
        })      
        req.body.total_price = parseFloat(req.body.total_price) * parseInt(req.body.quantity_prescribed)
        req.body.drug_prescription_id = prescribed_drug_ids.dataValues.id
        //req.body.dispense_status = req.body.dispense_status
        req.body.date_prescribed = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        const data = await additional_item_prescription.create(req.body,{transaction: t},)
        await t.commit()
         return res.status(200).json(data)
    }catch(err){
        await t.rollback();
        return res.status(500).json({err: err.message})
    }
 }
 const getAll4Patient4dispense = async(req, res)=>{
	try{
	const patient_Id = req.params.patient_id
     const data = await additional_item_prescription.findAll(
		{ where:{
         patient_id: patient_Id,
        },
		include: [patient, drug,users, visits, prescribed_drug, patient_insurance, inventories, antenatal_account],
			order:[['updatedAt','DESC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getOne2dispense = async (req, res)=>{
    try{
        const Id = req.params.id;
        const data = await additional_item_prescription.findOne({
            where:{id:Id}, 
            include: [{model: drug}, {model: patient}, {model: users}]
        })
        return res.status(200).json(data)

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const dispensedadditional = async(req, res)=>{
    const t = await sequelize.transaction();
    try{
        const finds = await additional_item_prescription.findOne(
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
                drug_form: 'Consumable', 
                drug_type: finds.dataValues.drug_type,
                inventory_id: finds.dataValues.inventory_id
                */
            }
        })

        if((parseInt(pharmacy.dataValues.quantity_remaining) < parseInt(req.body.quantity_dispensed)) || parseInt(req.body.quantity_dispensed) === 0){
            return res.status(500).json({msg: 'Insufficient quantity: You must dispense all then later do return'})
           }else{   
        //drug_id,drug_form, drug_type,inventory_id
    const add = await additional_item_prescription.update({
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
    quantity_remaining: (parseInt(req.body.quantity_dispensed) * (-1)),
    unit_id: pharmacy.dataValues.unit_id,
    unit_price: pharmacy.dataValues.unit_price,
    selling_price:pharmacy.dataValues.unit_price,
    total_price: (parseFloat(pharmacy.dataValues.unit_price) * parseInt(req.body.quantity_dispensed) * (-1)),
    expiration: pharmacy.dataValues.expiration,
    staff_id: req.body.staff_id,
    quantity_received: (parseInt(req.body.quantity_dispensed) * (-1)),
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
    },) 
    await t.commit()
    return res.status(200).json({msg: 'OK'})
           }
           
    }catch(err){
    await t.rollback()
        return res.status(500).json({err: err.message})
    }
}
const refundAdditional = async(req, res)=>{
    const t = await sequelize.transaction();
    try{

        const finds = await additional_item_prescription.findOne(
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
                drug_form: 'Consumable', 
                drug_type: finds.dataValues.drug_type,
                inventory_id: finds.dataValues.inventory_id
                */
            }
        }) 

        //drug_id,drug_form, drug_type,inventory_id
    const add = await additional_item_prescription.update({
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
    },)
    await pharmacy_store_item_log.create({
    id:pharmacy.dataValues.id,
    drug_id: pharmacy.dataValues.drug_id,
    product_code: pharmacy.dataValues.product_code,
    shelf: pharmacy.dataValues.shelf,
    voucher: pharmacy.dataValues.voucher,
    batch: pharmacy.dataValues.batch,
    quantity_remaining: (parseInt(req.body.quantity_returned)),
    unit_id: pharmacy.dataValues.unit_id,
    unit_price: pharmacy.dataValues.unit_price,
    selling_price:pharmacy.dataValues.unit_price,
    total_price: (parseFloat(pharmacy.dataValues.unit_price) * parseFloat(req.body.quantity_returned)),
    expiration: pharmacy.dataValues.expiration,
    staff_id: req.body.staff_id,
    date_received: moment(new Date()).format('YYYY-MM-DD'),
    drug_form: pharmacy.dataValues.drug_form,
    drug_type: pharmacy.dataValues.drug_type,
    quantity_received: req.body.quantity_returned,
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
    },) 
    await t.commit()
return res.status(200).json(add)
    }catch(err){
        await t.rollback()
        return res.status(500).json({err: err.message})
    }
}
const nhisCleared = async(req, res)=>{
	try{
       
       const data = await additional_item_prescription.update({
		payment_status: 'Cleared',
	   },{
		where:{
			id: req.body.id,

		}
	   })
	   return res.status(200).json(data)
	}catch(err){
		return res.status(500).json({err: err.message})
	}
}
const addAdditionalTreatment = async(req, res)=>{
    try{
    const data = await additional_treatment.create(req.body)
    return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const ViewAdditionalTreatmentByPatient = async(req, res)=>{
    try{
        const patient_id = req.params.patient_id
    const data = await additional_treatment.findAll({
        include:[users, patient, visits, admission],
        where:{
            patient_id: patient_id
        },
        order: [['id', 'DESC']]
    })
    return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const ViewAdditionalTreatmentById = async(req, res)=>{
    try{
        const id = req.params.id
    const data = await additional_treatment.findOne({
        include:[users, patient, visits, admission],
        where:{
            id: id
        },
        order: [['id', 'DESC']]
    })
    return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
module.exports = {
    addAdditionalTreatment,
    ViewAdditionalTreatmentByPatient,
    ViewAdditionalTreatmentById,
    nhisCleared,
    getAll4Patient4dispense,
    add,
    refundAdditional,
	getAll,
	getAllPagings,
	permitted,
	payment,
	getOne,
    getAll4Patient,
    sumAmount,
    getAll2PayPatient,
    getAll2PayDependant,
    getAll4PatientHmo,
    getAll4DependantHmo,
    getAll4Antenatal,
    Billings,
    UnBillings,
    getOne2dispense,
    dispensedadditional

}
