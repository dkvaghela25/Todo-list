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
            return res.status(200).json({ error : true , message: "Invalid Phone No." });
        }
    } else {
        return res.status(200).json({ error : true , message: "Unvalid Email ID" });
    }
}