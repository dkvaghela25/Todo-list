const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { tokenBlacklist } = require('./constants');

function verifyToken(header) {
    try {
        let token = header.split(' ')[1];

        console.log(tokenBlacklist);

        if (tokenBlacklist.includes(token)) {
            return new Error('Token is blacklisted, login again');
        }

        var decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        return decodedToken;

    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return new Error('Token has expired');
        } else if (err.name === 'JsonWebTokenError') {
            return new Error('Invalid token');
        } else {
            return new Error('Token verification failed');
        }
    }
}

module.exports = {
    verifyToken
}