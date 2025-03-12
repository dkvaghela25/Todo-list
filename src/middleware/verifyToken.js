const { decodeToken } = require('../helper/jwtHelper')

const verifyToken = (req,res,next) => {

    var decodedToken = decodeToken(req.headers.authorization);

    if (decodedToken instanceof Error) {
        return res.status(401).json({ error: decodedToken.message });
    } else {
        req.decodedToken = decodedToken
    }

    next();

}

module.exports = {
    verifyToken
}