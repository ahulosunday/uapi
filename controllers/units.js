const { test,units, users, triage, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const { Op } = require('sequelize');


const getAll = async(req, res)=>{
    try{
     const data = await units.findAll(
        {
            order:[['name','ASC']]
        }
     )
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

module.exports={
    getAll,
}