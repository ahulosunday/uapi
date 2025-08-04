const { lga, users,country, regions,states, sequelize } = require('../models');
const jwt = require('jsonwebtoken')
const {getPagination, getPagingData} = require('../helpers/paging')


const getLgas = async(req, res) =>{
    try{
        
        const data = await lga.findAll({ 
            include: [country,users, regions, states],
            order:[['name','ASC'], ['stateId', 'ASC']]
           
            })
         
        return res.status(200).json(data)
    }
    catch(err){
        return res.status(200).json({ err: err.errors[0].message})
    }

}
const getLgasPaging = async(req, res) =>{
    try{
        const  page =  req.params.page
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await lga.findAndCountAll({ 
            include: [country,users, regions, states],
            order:[['name','ASC'], ['stateId', 'ASC']],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(200).json({ err: err.message})
    }

}


const getLga =async(req, res) =>{
   try{
        const LgaId = req.params.id
        const Lga = await lga.findOne({ where:{id : LgaId}})
        return res.status(200).json(Lga)
    }
    catch(err){
        return res.status(200).json({ err: err.errors[0].message})
    }

}

const addLga = async(req, res) =>{
try{
    const body = { name , code, countryId, regionId, stateId, userId} = req.body
     const col = await lga.create(body);
    return res.status(200).json(col)
}
catch(err){
    return res.status(500).json({ err: err.errors[0].message})
}
  
   
}
const BulkaddLga = async(req, res) =>{
try{
     const result = await sequelize.transaction(async (t) => {
     const col = await lga.bulkCreate(req.body, { transaction: t });
    return res.status(200).json(col);
     });
}
catch(err){
    return res.status(500).json({ err: err.message})
}
  
   
}

const deleteLga = async(req, res) =>{
    try{
       
        const LgaId = req.params.id
        await lga.destroy({ where:{id : LgaId}}).then(resp=>{
            return res.status(200).json(resp); 
        }).catch(err=>{
            return res.status(500).json({ err: 'Unable to delete the selected LGA, another record(s) is using it'})
        })
           
        
    }
    catch(err){
        return res.status(500).json({ err: 'Unable to delete the selected LGA, another record(s) is using it'})
    }
}

 const updateLga = async(req, res) =>{
   try{
        const LgaId = req.params.id
        const {name, code, countryId, userId, stateId, regionId } = req.body
        const ress = await lga.findOne({ where:{id : LgaId}})
        ress.name = name
        ress.code= code
        ress.countryId = countryId
        ress.userId = userId
        ress.stateId = stateId
        ress.regionId = regionId
        ress.save().then(resp=>{
        return res.status(200).json(resp);
      }).catch(err=>{
        return res.status(500).json({ err: err.errors[0].message})
      })

    }
    catch(err){
        return res.status(200).json({ err: err.message})
    }
}
const loadLgaswithState = async(req, res) =>{
    try{
        const stateId = req.params.stateId
        const state = await lga.findAll({where:{stateId: stateId}})
        return res.status(200).json(state)
    }
    catch(err){
        return res.status(200).json({ err: err.errors[0].message})
    }

}

module.exports = {
    loadLgaswithState,
    getLga,
    getLgas, 
    addLga, 
    deleteLga, 
    updateLga,
    getLgasPaging,
    BulkaddLga,
    
}