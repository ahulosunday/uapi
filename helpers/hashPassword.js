const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hashedPasswords = (req, res) =>{
    const password = req.params.token
    const salt = bcrypt.genSaltSync(10)////SALT should be created ONE TIME upon sign up
  const hashedPassword = bcrypt.hashSync(password, salt)
  return res.status(200).json(hashedPassword)
}
module.exports = {
    hashedPasswords
    }