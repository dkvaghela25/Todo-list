const {phone} = require('phone');
const validator = require("email-validator");

exports.validate_user = (req,res,next) => {
    let formData = req.body
    let valid_email = validator.validate(formData.email);
    let valid_phone_no = phone(formData.phone_no, {country: 'IND'});
    console.log(valid_phone_no)

    if(valid_email){
        if(valid_phone_no.isValid){
            next();
        } else {
            res.send("Invalid Phone No.")
        }
    } else {
        res.send("Unvalid Email ID")
    }
}