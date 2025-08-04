const { permissions, role, users, role_permissions } = require('../models');
const jwt = require('jsonwebtoken')

const getRolesPermissionAll = async(req, res) =>{
    try{
        const perrRole = await role_permissions.findAll({include:[permissions]})
        return res.status(200).json(perrRole)
    }
    catch(err){
        return res.status(200).json({ err: err.errors[0].message})
    }

}
const getRolesPermissions = async(req, res) =>{
    try{
        const  roleId = req.params.roleId
        const perrRole = await role_permissions.findAll({where:{roleId: roleId}, include:[permissions] })
        return res.status(200).json(perrRole)
    }
    catch(err){
        return res.status(200).json({ err: err.message})
    }

}
const getRolePemissionId = async(req, res) =>{
    try{
        const  id = req.params.id
        const perrRole = await role_permissions.findAll({include:[permissions], where:{id: id}})
        return res.status(200).json(perrRole)
    }
    catch(err){
        return res.status(200).json({ err: err.errors[0].message})
    }

}
const addRolesPermissions = async(req, res) =>{
try{
   const q =  await role_permissions.bulkCreate(req.body);
  return res.status(200).json(q)
}
catch(err){
    return res.status(500).json({ err: { err: err.message} })
}
  
   
}

const deleteRolePemissions = async(req, res) =>{
    try{
        const id = req.params.id
        
        const ress = await role_permissions.destroy({ where:{id : id}})
        return res.status(200).json(ress)
    }
    catch(err){
        return res.status(200).json({ err: err.errors[0].message})
    }
}
const deleteRolePemissionRoleId  = async(req, res) =>{
    try{
        const id = req.params.id
        const ress = await role_permissions.destroy({ where:{roleId : id}})

        return true//res.status(200).json(ress)
    }
    catch(err){
       return false //res.status(200).json({ err: err.errors[0].message})
    }

}

const  deleteRolePemissionRoleIdPermissionId = async(req, res) =>{
    try{
        const roleId = req.params.roleId
        const permissionId = req.params.permissionId
        const ress = await role_permissions.destroy({ where:{roleId : roleId, permissionId: permissionId}})
        return true
    }
    catch(err){
        return false
    }

}
module.exports = {
    getRolesPermissions,
    deleteRolePemissions,
    addRolesPermissions,
    getRolesPermissionAll,
    deleteRolePemissionRoleId,
   getRolePemissionId,
   deleteRolePemissionRoleIdPermissionId,
}