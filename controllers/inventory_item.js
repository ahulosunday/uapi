const { inventory_item, return_item, drug,inventory_item_log, inventories, vendor, units, measurement, dosage_form,users,pharmacy_store_item, pharmacy_store_item_log, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging');
const { Op, where } = require('sequelize');
const moment = require('moment')


const getOne = async(req, res)=>{
    try{
	const id = req.params.id
	const data = await inventory_item.findOne({
		where:{
		id: id
	},
	include:[drug, inventories, units, measurement, dosage_form,users,vendor],
    order:[['id','ASC']]});
    
    return res.status(200).json(data);
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const getOnes = async(req, res)=>{
    try{
	const id = req.params.id
    const type = req.params.type
	const data = await inventory_item.findOne({
		where:{
		id: id,
        drug_type: type
	},
	include:[drug, inventories, units, measurement, dosage_form,users,vendor],
    order:[['id','ASC']]});
    
    return res.status(200).json(data);
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const getOneByDrug = async(req, res)=>{
	const id = req.params.drug_id
	const data = await inventory_item.findAll({
		where:{
		drug_id:id
	},
	include:[drug, inventories, units, measurement, dosage_form,users,vendor],
    order:[['id','ASC']]});
    return res.status(200).json(data);

}
const getOneByInventory = async(req, res)=>{
	const id = req.params.inventory_id
	const data = await inventory_item.findAll({
		where:{
		inventory_id:id
	},
	include:[drug, inventories, units, measurement, dosage_form,users,vendor],
    order:[['id','ASC']]});
    return res.status(200).json(data);

}
const getAll = async(req, res)=>{
	try{
         const drug_id = req.params.drug_id
         const drug_form = req.params.drug_form
		const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
	const data = await inventory_item.findAndCountAll({
      where:{
        [Op.or]:{ drug_id:{[Op.like]: `%${drug_id}%`},
              drug_form: {[Op.like]: `%${drug_id}%`},
              id: {[Op.like]: `%${drug_id}%`},
              drug_group:{[Op.like]: `%${drug_id}%`},
              drug_type: {[Op.like]: `%${drug_id}%`},
            },
        
            drug_form: drug_form
             
    },
	include:[drug, inventories, units, measurement, dosage_form,users, vendor],
    order:[['id','ASC']],
	limit:limit, offset:offset

});
const response = getPagingData(data, page, limit);
return res.status(200).json(response)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
} 
const getAlls = async(req, res)=>{
	try{
       const filter = req.params.filter
       const drug_type = req.params.drug_type
	const data = await inventory_item.findAll({
	include:[drug, inventories, units, measurement, dosage_form,users, vendor],
    where:{
        drug_form: filter,
        drug_type: drug_type
    },
    order:[['id','ASC']],
    limit:1000, offset:0

});
return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
} 
const addInventoryitem = async(req, res)=>{
    const t = await sequelize.transaction();
    try{
       
     //drug_type,drug_form,measurement_id,dosage_form_id,unit_id,drug_id,inventory_id,strength_input
        const view = await inventory_item.findOne({
            where:{
                drug_id: req.body.drug_id,
                inventory_id:req.body.inventory_id,
                drug_type: req.body.drug_type,
                drug_form: req.body.drug_form,
                measurement_id: req.body.measurement_id,
                dosage_form_id : req.body.dosage_form_id,
                unit_id:  req.body.unit_id,
                strength_input: req.body.strength_input,
                drug_group: (req.body.drug_group === 'null'? null : req.body.drug_group)
            }
        });
        
            if(view !== null){
   const update = await inventory_item.update({
        quantity_remaining: (parseFloat(view.dataValues.quantity_remaining) + parseFloat(req.body.quantity_received)),
        //quantity_consumed: 0,
        quantity_received: req.body.quantity_received
     },
    {
        where:{
            id: view.dataValues.id
        }
    },{transaction:t})
   
    req.body.id = view.dataValues.id;
    req.body.quantity_remaining = req.body.quantity_received;
    req.body.acquired_total= (parseFloat(req.body.quantity_received) * parseFloat(req.body.acquired_price))
    req.body.selling_total = (parseFloat(req.body.selling_price) * parseFloat(req.body.quantity_received))
    req.body.drug_group = (req.body.drug_group === 'null'? null : req.body.drug_group)
     await inventory_item_log.create(req.body,{transaction: t})

            }
            else{
                      
     const add = await inventory_item.create({
    inventory_id: req.body.inventory_id,
    drug_id: req.body.drug_id,
    quantity_received: req.body.quantity_received,
    unit_id: req.body.unit_id,
    selling_price: req.body.selling_price,
    acquired_price: req.body.acquired_price,
    expiration: req.body.expiration,
    quantity_consumed: 0 ,//req.body.quantity_consumed,
    dosage_form_id: req.body.dosage_form_id,
    measurement_id: req.body.measurement_id,
    strength_input: req.body.strength_input,
    quantity_remaining: req.body.quantity_received,
    drug_form: req.body.drug_form,
    drug_type: req.body.drug_type,
    drug_group: (req.body.drug_group === 'null'? null : req.body.drug_group),
    date_received: req.body.date_received,
    staff_id: req.body.staff_id,
    brand: req.body.brand,
    status: req.body.status,
    vendor_id: req.body.vendor_id
     },{transaction: t});
    
        req.body.id = add.dataValues.id;
        req.body.quantity_remaining = req.body.quantity_received;
        req.body.acquired_total= (parseFloat(req.body.quantity_received) * parseFloat(req.body.acquired_price))
    req.body.selling_total = (parseFloat(req.body.selling_price) * parseFloat(req.body.quantity_received))
    req.body.drug_group = (req.body.drug_group === 'null'? null : req.body.drug_group)
     await inventory_item_log.create(req.body,{transaction: t})
    }
    await t.commit();    
    return res.status(200).json('pk')

    }
    catch(err){
        await t.rollback();
        return res.status(500).json({err: err.message})
    }
}
const updateInventoryitem = async(req, res)=>{
    try{
        
       const updates = await inventories.update({
		inventory_id: req.body.inventory_id,
    drug_id: req.body.drug_id,
    quantity_received: req.body.quantity_received,
    unit_id: req.body.unit_id,
    selling_price: req.body.selling_price,
    acquired_price: req.body.acquired_price,
    expiration: req.body.expiration,
    quantity_consumed: req.body.quantity_consumed,
    dosage_form_id: req.body.dosage_form_id,
    measurement_id: req.body.measurement_id,
    strength_input: req.body.strength_input,
    quantity_remaining: req.body.quantity_remaining,
    drug_form: req.body.drug_form,
    drug_type: req.body.drug_type,
    drug_group: req.body.drug_group,
    date_received: req.body.date_received,
    staff_id: req.body.staff_id,
    brand: req.body.brand,
    status: req.body.status,
    vendor_id: req.body.vendor_id
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
const deleteInventoryitem = async(req, res)=>{
    try{
        const id = req.params.id
      const del = await inventory_item.destroy({
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
const findFilter = async(req, res)=>{
    try{
        const drug_type = req.params.drug_type
      const data = await inventory_item.findAll({
        where:{
            drug_form: 'Drug',
            drug_type: drug_type,
            status: 'Active'

        }

      })
      return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const approveReturn = async(req, res)=>{
    const t = await sequelize.transaction();
    try{
       
     const data = await return_item.findOne({
        where:{
            id: req.body.id
        }
     })
     const pharmacy = await pharmacy_store_item.findOne({
        where:{
            id: data.dataValues.pharmacy_item_id
        }
     })
    
     const inventory_items = await inventory_item.findOne({
        where:{
                drug_id: data.dataValues.drug_id,
                inventory_id: pharmacy.dataValues.inventory_id,
                drug_type: pharmacy.dataValues.drug_type,
                drug_form: pharmacy.dataValues.drug_form,
                measurement_id: pharmacy.dataValues.measurement_id,
                dosage_form_id : pharmacy.dataValues.dosage_form_id,
                unit_id:  pharmacy.dataValues.unit_id,
                strength_input: pharmacy.dataValues.strength_input
                /*
            drug_form: pharmacy.dataValues.drug_form,
            drug_id:pharmacy.dataValues.drug_id,
            drug_type: pharmacy.dataValues.drug_type,
            inventory_id: pharmacy.dataValues.inventory_id
            */
        }
     })
     await return_item.update({
        inventory_item_id: inventory_items.dataValues.id,
        date_received: moment(new Date()).format('YYYY-MM-DD'),
        status: 'Returned'
     },{
        where:{
            id:req.body.id
        }
     },{transaction: t})
       await inventory_item.update({
         quantity_remaining: (parseInt(inventory_items.dataValues.quantity_remaining) + parseInt(data.dataValues.quantity)),
         quantity_received: parseInt(data.dataValues.quantity)

     },{
        where:{
            id:inventory_items.dataValues.id
        }
     },{transaction: t})
      
            await pharmacy_store_item_log.create({
                id:pharmacy.dataValues.id,
                drug_id: pharmacy.dataValues.drug_id,
            product_code: pharmacy.dataValues.product_code,
            shelf: pharmacy.dataValues.shelf,
            voucher: pharmacy.dataValues.voucher,
            batch: pharmacy.dataValues.batch,
            quantity_remaining: data.dataValues.quantity,
            unit_id: pharmacy.dataValues.unit_id,
            unit_price: pharmacy.dataValues.unit_price,
            selling_price:pharmacy.dataValues.unit_price,
            total_price: pharmacy.dataValues.total_price,
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
            inventory_id: pharmacy.dataValues.inventory_id
            },{
                transaction: t
            },) 
            await t.commit()
     return res.status(200).json({err: 'Transaction complete'})

    }catch(err){
        await t.rollback();
        return res.status(500).json({err: err.message})
    }
}
const historyList = async(req, res)=>{
    try{
        const id = req.params.id
   const data = await inventory_item_log.findAll({
    include:[drug, inventories, units, measurement, dosage_form,users, vendor],
   
    where:{
        id: id
    },
     order:[['id','ASC']]

   })
  
   return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

module.exports={
	getOne, 
    approveReturn,
	getAll,
	getOneByDrug,
	getOneByInventory,
	addInventoryitem,
	updateInventoryitem,
	deleteInventoryitem,
    getAlls,
    findFilter,
    historyList,
    getOnes

}