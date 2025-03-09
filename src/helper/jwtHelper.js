const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

function verifyToken(header){

    try {
        let token = header.split(' ')[1]
        var decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        return decodedToken;

    } catch (err) {
        res.send('Invalid Token plese login again')
    }

}

module.exports = {
    verifyToken
}
