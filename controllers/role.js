const {role, } = require('../models');
const perm = require('./role-permission')
const {getPagination, getPagingData} = require('../helpers/paging')


const getRoles = async(req, res) =>{
    try{
       
        const data = await role.findAll({ 
            order:[['name','ASC']]
           
            })
          
        return res.status(200).json(data)
    }
    catch(err){
       return res.status(500).json({ err: err.message})
    }

}
const getRolesPaing = async(req, res) =>{
    try{
        const  page =  req.params.page
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await role.findAndCountAll({ 
            order:[['name','ASC']],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
       return res.status(500).json({ err: err.message})
    }

}


const getRole =async(req, res) =>{
   try{
        const roleId = req.params.id
        const roles = await role.findOne({ where:{id : roleId}})
        return res.status(200).json(roles)
    }
    catch(err){
        return res.status(500).json({ err: err.message})
    }

}

const addRole = async(req, res) =>{
try{
     const rol = await role.create({ name: req.body.name , description: req.body.description, userId: req.body.userId});
    return res.status(200).json(rol)
}
catch(err){
    return res.status(500).json( { err: err.errors[0].message})
}
  
   
}

const deleteRole = async(req, res) =>{
    try{
        const roleId = req.params.id
        
        const perms = await perm.deleteRolePemissionRoleId(req,res)
        if(perms){
        const ress = await role.destroy({ where:{id : roleId}})
        return res.status(200).json(ress)
        }
       return null
    }
    catch(err){
        return res.status(200).json({ err: err.errors[0].message})
    }
}

 const updateRole = async(req, res) =>{
   try{
        const roleId = req.params.id
        const {name, description, userId } = req.body
        const ress = await role.findOne({ where:{id : roleId}})
        ress.name = name
        ress.description= description
        ress.userId = userId
        ress.save()
       .then(resp=>{
        return res.status(200).json(resp);
      }).catch(err=>{
        return res.status(200).json({ err: err.errors[0].message})
      })

    }
    catch(err){
        return res.status(200).json({ err: err.errors[0].message})
    }
}

module.exports = {
    getRoles,
    getRole, 
    addRole, 
    deleteRole, 
    updateRole,
    getRolesPaing
    
}