const { decodeToken } = require('../helper/jwtHelper')

const verifyToken = (req, res, next) => {

    var decodedToken = decodeToken(req.headers.authorization);

    if (decodedToken instanceof Error) {
        return res.status(401).json({ error: decodedToken.message });
    } else {
        let user_id = req.query.user_id

        if (user_id != decodedToken.user_id) {
            return res.status(401).json({ error: true, message: "Wrong ID" })
        }

    }

    next();

}

module.exports = {
    verifyToken
}