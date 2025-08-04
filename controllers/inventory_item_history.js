const { inventory_item, visits, drug,inventory_item_history, inventories, units, measurement, users, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging');


const getOne = async(req, res)=>{
    const id = req.params.id
    const data = await inventory_item_history.findOne({
        where:{
        id:id
    },
    include:[drug, inventories, units,visits,users,inventory_item],
    order:[['id','ASC']]});
    return res.status(200).json(data);

}
const getOneByDrug = async(req, res)=>{
    const id = req.params.drug_id
    const data = await inventory_item.findAll({
        where:{
        drug_id:id
    },
    include:[drug, inventories],
    order:[['id','ASC']]});
    return res.status(200).json(data);

}
const getOneByInventory = async(req, res)=>{
    const id = req.params.inventory_id
    const data = await inventory_item.findAll({
        where:{
        inventory_id:id
    },
    include:[drug, inventories],
    order:[['id','ASC']]});
    return res.status(200).json(data);

}
const getAll = async(req, res)=>{
    try{
       
        const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
    const data = await inventory_item.findAndCountAll({
    include:[drug, inventories, units, measurement, dosage_form,users],
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
const addInventoryitem = async(req, res)=>{
    try{
        const result = await sequelize.transaction(async t => {
     const add = await inventory_item.create(req.body)
     const update = await inventory_item.update({
        quantity_remaining: req.body.quantity_received,
        quantity_consumed: 0
     },
    {
        where:{
            id: add.id
        }
    },{transaction:t}
)
     return res.status(200).json(add)
})
    }
    catch(err){
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
    date_received: req.body.date_received,
    staff_id: req.body.staff_id,
    brand: req.body.brand,
    status: req.body.status
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


module.exports={
    getOne, 
    getAll,
    getOneByDrug,
    getOneByInventory,
    addInventoryitem,
    updateInventoryitem,
    deleteInventoryitem

}