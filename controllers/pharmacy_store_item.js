const { pharmacy_store_item, inventory_item_log, pharmacy_store_item_log, drug, units, route_of_administration,users, measurement,inventory_item, dosage_form, vendor,inventories, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');
const { transcode } = require('buffer');

const getAll = async(req, res)=>{
    try{ 
        const drug_id = req.params.drug_id
        const  page =  req.params.page
        const per_page = req.params.per_page
        const drug_type = req.params.drug_type
         const { limit, offset } = getPagination(page, per_page)
        const data = await pharmacy_store_item.findAndCountAll({ 
            include:[drug, units, route_of_administration,users, measurement, dosage_form, vendor, inventories ],
            order:[['id','DESC']],
            limit:limit, offset:offset,
         where:{
            [Op.or]:{
                drug_id: { [Op.like]: `%${drug_id}%` },
                drug_form: { [Op.like]: `%${drug_id}%` },
                drug_type: { [Op.like]: `%${drug_id}%` },

            },
            drug_form: drug_type
            }
            

            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(200).json({ err: err.message})
    }
  
}
const getOne = async(req, res)=>{
    try{
        const Id = req.params.id
     const data = await pharmacy_store_item.findOne(
        { include:[drug, units, route_of_administration,users, measurement, dosage_form, vendor, inventories],
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

const add = async(req, res)=>{
    
        try{
            const result = await sequelize.transaction(async t => {
            const view = await pharmacy_store_item.findOne({
                where:{
                    inventory_item_id: req.body.id
                    /*
                    drug_id: req.body.drug_id,
                    inventory_id:req.body.inventory_id,
                    drug_type: req.body.drug_type,
                    drug_form: req.body.drug_form
                    */
                }
            }).then( async response =>{
                if(response !== null){

       const update = await pharmacy_store_item.update({
            quantity_remaining: (parseFloat(response.dataValues.quantity_remaining) + parseFloat(req.body.quantity_received)),
            quantity_consumed: 0,
            quantity_received: req.body.quantity_received
         },
        {
            where:{
                id: response.dataValues.id
            }
        },{transaction:t}

    )
    }
                else{
                   
     const add = await pharmacy_store_item.create(req.body, {transaction: t})
    
                }
        const adds = await inventory_item.findOne({
            where:{
                id:req.body.id
            }
            }).then(async r=>{
                const inv = await inventory_item.update({
                    quantity_remaining:(parseInt(r.dataValues.quantity_remaining) - parseInt(req.body.quantity_received)),
                    quantity_consumed: (parseInt(r.dataValues.quantity_consumed )+ parseInt(req.body.quantity_received))
                },
                {
                    where:{
                        id: req.body.id
                    }
                },
                {transaction: t}
            )
        })
        
        const up = await pharmacy_store_item_log.create(req.body,{transaction: t}) 

        req.body.quantity_received = (-1) * parseInt(req.body.quantity_received)
        req.body.acquired_total =  ( (parseFloat(req.body.quantity_received) * parseFloat(req.body.acquired_price) ) * (-1))
    req.body.selling_total = ((parseFloat(req.body.selling_price) * parseFloat(req.body.quantity_received)) * (-1))
    req.body.drug_group = (req.body.drug_group === 'null'? null : req.body.drug_group)
 
        const log = await inventory_item_log.create(req.body,{transaction: t})
 
     return res.status(200).json({id:'Ok'})
            })
        })
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const updates = async(req, res)=>{
    try{
        
       const up = await pharmacy_store_item.update({
        inventory_id: req.body.inventory_id,
        drug_id: req.body.drug_id,
        product_code: req.body.product_code,
        shelf: req.body.shelf,
        voucher: req.body.voucher,
        batch: req.body.batch,
        quantity_received: req.body.quantity_received,
        quantity_remaining: req.body.quantity_remaining,
        unit_id: req.body.unit_id,
        unit_price: req.body.unit_price,
        selling_price: req.body.selling_price,
        total_price: req.body.total_price,
        expiration: req.body.expiration,
        staff_id: req.body.staff_id,
        date_received: req.body.date_received,
        drug_form: req.body.drug_form,
        drug_type: req.body.drug_type,
        drug_group: req.body.drug_group,
        status: req.body.status,
        route_id: req.body.route_id,
        strength_input: req.body.strength_input,
        measurement_id: req.body.measurement_id,
        dosage_form_id: req.body,dosage_form_id,
        brand: req.body.brand,
        vendor_id: req.body.vendor_id
       },
    {
        where:{
            id: req.body.id
        }
    })
    
    return res.status(200).json(up)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const deletes = async(req, res)=>{
    try{
        const id = req.params.id
      const del = await pharmacy_store_item.destroy({
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
        var drug_type = req.params.drug_type
         if(drug_type === 'Cash'){
            const data = await pharmacy_store_item.findAll({
                include:[drug, units, route_of_administration,users, measurement, dosage_form, vendor, inventories ],
                where:{
                    drug_form: 'Drug',
                    drug_type: drug_type,
                    status: 'Active'
        
                }
        
              })
              return res.status(200).json(data)
         }
       else if(drug_type === 'Retainership' || drug_type === 'Private'){
            const data = await pharmacy_store_item.findAll({
                include:[drug, units, route_of_administration,users, measurement, dosage_form, vendor, inventories ],
                where:{
                    drug_form: 'Drug',
                    drug_type: drug_type,
                    status: 'Active'
        
                }
        
              })
              return res.status(200).json(data)
        }
        else{
            drug_type = 'NHIS'
      const data = await pharmacy_store_item.findAll({
        include:[drug, units, route_of_administration,users, measurement, dosage_form, vendor, inventories ],
        where:{
            drug_form: 'Drug',
            drug_type: drug_type,
            status: 'Active'

        }

      })
      return res.status(200).json(data)
    }
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

const findFilterConsumable = async(req, res)=>{
    try{
        const drug_type = req.params.drug_type
      const data = await pharmacy_store_item.findAll({
        include:[drug, units, route_of_administration,users, measurement, dosage_form, vendor, inventories ],
        where:{
            drug_form: 'Consumable',
            drug_type: drug_type,
            status: 'Active'

        }

      })
      return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

const findAllStore = async(req, res) =>{
    try{
        const id = req.params.drug_form
      const data = await pharmacy_store_item.findAll({
      where:{
        drug_form: id
      },
      include: [inventories, drug]
      })
      return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
const findStoreQty = async(req, res) =>{
    try{
        const id = req.params.id
      const data = await pharmacy_store_item.findOne({
      where:{
        id: id
      },
      include: [inventories, drug]
      })
      return res.status(200).json(data)
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

module.exports={
    findStoreQty,
    getAll,
    getOne,
    add,
    updates,
    deletes,
    findFilter,
    findFilterConsumable,
    findAllStore
}