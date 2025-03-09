const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { tokenBlacklist } = require('./constants');


function verifyToken(header){

    try {
        let token = header.split(' ')[1]

        console.log(tokenBlacklist)

        if(tokenBlacklist.includes(token)){
            return Error('Token is blacklisted, login again')
        }

        var decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        return decodedToken;

    } catch (err) {
        return Error('Invalid token')
    }

}

module.exports = {
    verifyToken
}
