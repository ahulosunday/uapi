const {users, account_type } = require('../models');

const getAllAccpount_type = async(req, res)=>{
try{
        const data = await account_type.findAll({ 
            order:[['name','ASC']]});
         return res.status(200).json(data);
    }
    catch(err){
        return res.status(500).json({err: err.message});
    }
}

const getOneAccount_typeById = async(req, res)=>{
    try{
        const Id = req.params.id
        const data = await account_type.findOne({where:{id: Id}});
        
        return res.status(200).json(data)
        

    }
    catch(err){
         return res.status(500).json({err: err.message});
    }
}
const getOneAccount_typeByName = async(req, res)=>{
    try{
        const name= req.params.name
        const data = await account_type.findOne({where:{name: name}});
        return res.status(200).json(data)

    }
    catch(err){
         return res.status(500).json({err: err.message});
    }
}
const addAccount_type = async(req, res) =>{
try{
    const col = await account_type.create({ name: req.body.name });
    return res.status(200).json(col)
}
catch(err){
    return res.status(500).json( {err: err.errors[0].message} )
}
  
   
}
const updateAccount_type = async(req, res) =>{
  try{
        const Id = req.params.id
        const {name} = req.body
        const ress = await account_type.findOne({ where:{id : Id}})
        ress.name = name
        ress.save().then(resp=>{
           return (res.status(200).json(resp))
        }).catch(err=>{
            return res.status(500).json({err:err.errors[0].message})
        
        })
  }
  catch(err){
    return res.status(200).json({err:err.errors[0].message})
  }  
   
}

const deleteAccount_typeById = async(req, res)=>{
    try{
        const Id = req.params.id
        await account_type.destroy({ where:{id : Id}})
        .then(resp=>{
           return res.status(200).json(resp); 
        })

    }
    catch(err){
         return res.status(500).json({err: 'Error occured, unable to delete'});
    }
}

module.exports = {
    getAllAccpount_type,
    getOneAccount_typeById, 
    addAccount_type, 
    deleteAccount_typeById, 
    updateAccount_type,
    getOneAccount_typeByName,
    
    
}