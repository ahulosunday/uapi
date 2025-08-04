const { where } = require('sequelize');
const { chart_of_account, account, users,reportchart, sequelize } = require('../models');


const getChartofaccount = async(req, res) =>{
    try{
        const data = await chart_of_account.findAll({
           order:[['id','ASC']]
        });
      return res.status(200).json(data);
    }
    catch(err){
        return res.status(500).json({err: err.message});
    }

}
const lookupAccount = async(id)=>{
    try{
const data = await chart_of_account.findOne({ where:{id: id},
            order:[['name','ASC']]});
         return (data.dataValues.name);
    }
    catch(err){

    }
}
const getChartofaccountlookup = async(req, res) =>{
    try{
        const data = await chart_of_account.findAll({
        include: [{ model : chart_of_account, as: 'child'}],
           order:[['id','ASC']]
        });
      const obj = data.map((result)=>{
		return Object.assign({
        id:  result.dataValues.id,
          accountCode:  result.dataValues.accountCode,
            name: result.child?.name  + ' ---> '+   result.dataValues.name,
       })
    })
      return res.status(200).json(obj);
    }
    catch(err){
        return res.status(500).json({err: err.message});
    }

}

const getOneChartofaccount = async(req, res) =>{
    try{
		const Id = req.params.id
        const data = await chart_of_account.findOne({ where:{id: Id},
            order:[['name','ASC']]});
         return res.status(200).json(data);
    }
    catch(err){
        return res.status(500).json({err: err.message});
    }

}
const editChartofaccount = async(req, res) =>{
    try{
		const Id = req.params.id
        const {accountCode, name} = req.body
        const data = await chart_of_account.findOne({ where:{id: Id} });
        data.accountCode = accountCode,
        data.name = name
        data.save()
        const acc = await account.findOne({where:{table_id: Id, table_name:'chart_of_account'}});
      
        acc.name= name,
        acc.acc_code = accountCode
        acc.save()
            return (res.status(200).json(acc))
                
    }
    catch(err){
        return res.status(500).json({err: err.message});
    }

}
const addChartofaccount = async(req, res) =>{
    try{
        const result = await sequelize.transaction(async (t) => {
        const col = await chart_of_account.create({ accountCode: req.body.accountCode , lineCode: req.body.lineCode,name: req.body.name,parendId: req.body.parendId, levelCode: req.body.levelCode, isParent: req.body.isParent, inuse: req.body.inuse, entity_id: req.body.entity_id, acc_type_id: req.body.acc_type_id, tdate: req.body.tdate}, { transaction: t}).then( async result=>{
             const accountAdd = await account.create({name: req.body.name, acc_type_id: req.body.acc_type_id, entity_id: req.body.entity_id, sub: req.body.parendId, table_name: 'chart_of_account', table_id: result.id, acc_code: req.body.accountCode, d_created: req.body.tdate  }, {transaction: t})
                 return res.status(200).json(accountAdd)
             })
             
        .catch(err=>{

        });
         })
   }
   catch(err){
       return res.status(500).json( {err: err.message} )
   }

}

const deletechartofaccount = async(req, res) =>{
    try{
        
        const Id = req.params.id
        const check = await chart_of_account.findOne({where:{parendId: Id}});
       
        if(check){
            return res.status(500).json({err: 'Unable to delete the selected chart of account, another record(s) is using it.'});
        }
        else{
            const result = await sequelize.transaction(async (t) => {
        await chart_of_account.destroy({ where:{id : Id}}, {transaction: t})
        .then(async resp=>{
            const del = await account.destroy({where:{table_id: Id, table_name: 'chart_of_account'}},{transaction: t});
           return res.status(200).json(resp); 
        
        })
        .catch(errs=>{
            return res.status(500).json({err: 'Unable to delete the selected chart of account, another record(s) is using it.'}); 
        })
    }) 
    }
}
    catch(err){
       return res.status(200).json({err: err.message});
    }
}

module.exports = {
    getChartofaccount,
    getOneChartofaccount,
    addChartofaccount,
    deletechartofaccount, 
    editChartofaccount,
    getChartofaccountlookup,
    lookupAccount,
    
    
    
}