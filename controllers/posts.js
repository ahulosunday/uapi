const { users, role } = require('../models');

const getPosts = async(res, req) =>{
return res.json('from controller')
}

const getPost = async(res, req) =>{
    return res.json('')
}
const addPost = async(res, req) =>{
   return res.json('') 
}
const deletePost = async(res, req) =>{
   return res.json('') 
}
const updatePost = async(res, req) =>{
   return res.json('') 
}
module.exports = {
    getPosts,getPost, addPost, deletePost, updatePost
    
}

