const { users, drug, return_item, inventories, pharmacy_store_item,inventory_item, pharmacy_store_item_log, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');
const moment = require('moment');

const add = async(req, res)=>{
    const t = await sequelize.transaction();
    try{
       
        if(req.body.inventory_item_id ===null){
            const pharmacy= await pharmacy_store_item.findOne({
                where:{
                    id: req.body.pharmacy_item_id
                }
            })
            if(parseInt(pharmacy.dataValues.quantity_remaining) < parseInt(req.body.quantity) ){
                return res.status(500).json({err: 'Insufficient quantity'})
            }else{
                const data = await return_item.create(req.body, {transaction: t})

                const update = await pharmacy_store_item.update({
                    quantity_remaining: (parseFloat(pharmacy.dataValues.quantity_remaining) - parseFloat(req.body.quantity)),
                    quantity_received: req.body.quantity
                 },
                {
                    where:{
                        id: pharmacy.dataValues.id
                    }
                },{transaction:t})

                await pharmacy_store_item_log.create({
                            id:pharmacy.dataValues.id,
                            drug_id: pharmacy.dataValues.drug_id,
                        product_code: pharmacy.dataValues.product_code,
                        shelf: pharmacy.dataValues.shelf,
                        voucher: pharmacy.dataValues.voucher,
                        batch: pharmacy.dataValues.batch,
                        quantity_remaining: req.body.quantity,
                        unit_id: pharmacy.dataValues.unit_id,
                        unit_price: pharmacy.dataValues.unit_price,
                        selling_price: pharmacy.dataValues.unit_price,
                        total_price: (parseInt(pharmacy.dataValues.unit_price) * parseInt(req.body.quantity)),
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
                        return res.status(200).json(data)
            }
        }else{


        }
       

       
        
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const getAll = async(req, res)=>{
    try{
     const data = await return_item.findAll({
        include: [{model: users}, {model: pharmacy_store_item}, {model: drug}, {model: inventory_item},{model: inventories} ],
     })
     return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err:err.message})
    }
}
 const getOne = async(req, res)=>{
    try{
        const id = req.params.id
       const data = await return_item.findOne({
        include: [{model: users}, {model: pharmacy_store_item}, {model: drug}, {model: inventory_item},{model: inventories} ],
        where:{
            id: id
        }
       })
         return res.status(200).json(data)
        }catch(err){
        return res.status(500).json({err: err.message})
    }
 }
module.exports={
    add,
    getAll,
    getOne
}
