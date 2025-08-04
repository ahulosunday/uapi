const { permissions, role, users, role_permissions } = require('../models');
const jwt = require('jsonwebtoken')
const {getPagination, getPagingData} = require('../helpers/paging')


const getPermissions = async(req, res) =>{
    try{
        
        const data = await permissions.findAll({ 
           
            })
           
        return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({ err: err.message})
    }

}
const getPermissionsPaging = async(req, res) =>{
    try{
         const  page =  req.params.page
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await permissions.findAndCountAll({ 
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
       return res.status(500).json({ err: err.message})
    }

}
const getRolesPermissions = async(req, res) =>{
    try{
        const  id = req.params.id
        const perrRole = await role_permissions.findAll({include:[permissions], where:{roleId: id}})
        return res.status(200).json(perrRole)
    }
    catch(err){
       return res.status(500).json({ err: err.message})
    }

}
module.exports = {
getPermissions,
getRolesPermissions,
getPermissionsPaging
}