const { phone } = require('phone');
const validator = require("email-validator");
const { ValidationError } = require('./errors');

const validate_email = (email) => {
    
    let valid_email = validator.validate(email);

    if(!valid_email){
        throw new ValidationError('Invalid Email ID')
    }

}

const validate_phone_no = (phone_no) => {

    let valid_phone_no = phone(phone_no, {country: 'IND'});
    console.log(valid_phone_no)

    if(!valid_phone_no.isValid){
        throw new ValidationError('Invalid Phone No')
    }

}

module.exports = {
    validate_email,
    validate_phone_no
}