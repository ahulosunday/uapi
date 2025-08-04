const speakeasy = require('speakeasy');
const secret = speakeasy.generateSecret({ length: 20 });
function otp_code(){
    
    const code = speakeasy.totp({
  
    // Use the Base32 encoding of the secret key
    secret: secret.base32,
  
    // Tell Speakeasy to use the Base32 
    // encoding format for the secret key
    encoding: 'base32'
});
return code
}
module.exports = {
    otp_code
    }
             
                
   