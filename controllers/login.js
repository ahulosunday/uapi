const { users, roles } = require('../models');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Login = async (req, res) => {
    
    try {
       const jwtkey = "jwtkey"
        const { username, password } = req.body
        const user = await users.findOne({ 
            where: { username: username, isActive:1}
          });
          if(user.length === 0){
            return res.status(400).json({err: "Invalid username or Password!"});
          }
         
       if(await bcrypt.compare(password, user.password)){
       const token = jwt.sign({id:user.id}, jwtkey);
       const { password, ...other} = user
              res.cookie("access_token", token, {
        httpOnly: true
       }).status(200).json(user)
       }
       else return res.status(400).json({err: "Invalid username or Password!"});    
    } catch (err) {
       return res.status(500).json({ err: "Invalid username or password" })
    }
}
const signin = async (req, res) =>{
   try {
       const jwtkey = "jwtkey"
        const { username, password } = req.body
        const user = await users.findOne({ 
            where: { username: username}
          });
          if(user.length === 0){
            return res.status(400).json({err: "Invalid username or Password!"});
          }
         
       if(await bcrypt.compare(password, user.password)){
       return res.status(200).json(user)
       }
       else return res.status(400).json({err: "Invalid username or Password!"});    
    } catch (err) {
       return res.status(500).json({ err: "Invalid username or password" })
    }
}

module.exports = {
    Login,
    signin
    
}
