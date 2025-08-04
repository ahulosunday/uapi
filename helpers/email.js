
const  nodemailer = require('nodemailer')


const send = async(req, res) =>{
 
   try{
    const { to, subject,msg }= req.body
const transporter = nodemailer.createTransport({
  host: 'thirty.qservers.net',
  port: 465,
  secure: true,
  auth: {
    user: 'theroyalschools@theroyalschools.com.ng',
    pass: '*g.R33fI+B@%',
  },
});


const options = {
  from: 'noreply@gmail.com',
  to: to,
  subject: subject,
  html: msg,
};

const feedbact = await transporter.sendMail(options);

return res.status(200).json(feedbact);
   }
   catch(err){
return res.status(501).json(err.message);
   }
}


const mails = async (obj)=>{
try{
 const { to, subject,msg }= obj
const transporter = nodemailer.createTransport({
  host: 'thirty.qservers.net',
  port: 465,
  secure: true,
  auth: {
    user: 'theroyalschools@theroyalschools.com.ng',
    pass: '*g.R33fI+B@%',
  },
});


const options = {
  from: 'noreply@gmail.com',
  to: to,
  subject: subject,
  html: msg,
};

const feedbact = await transporter.sendMail(options);
return feedbact.messageId
}
catch(err){
return err.message
}
}

module.exports = { send, mails}