const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { client } = require('../../database/index')
const { getUsernames } = require('../../helper/methods')
const { verifyToken } = require('../../helper/jwtHelper');
const { tokenBlacklist } = require('../../helper/constants');

const registerUser = async (req, res) => {

    if (!req.body.username) {
        return res.status(400).json({ error: true, message: 'Enter Username' });
    }

    if (!req.body.password) {
        return res.status(400).json({ error: true, message: 'Enter password' });
    }

    let users = await getUsernames();

    console.log(users)

    if (users.includes(req.body.username)) {
        return res.status(409).json({ error: true, message: 'Username is already taken ' });
    }
    else {

        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(req.body.password, salt);

        let insert =
            'INSERT INTO public.users(username, password , email , phone_no) VALUES ($1, $2, $3, $4)';
        let values = [req.body.username, hashPassword, req.body.email, req.body.phone_no];

        await client.query(insert, values);
        res.status(200).json({ error: false, message: 'User registered successfully' });

    }
}

const loginUser = async (req, res) => {

    if (!req.body.username) {
        return res.status(400).json({ error: true, message: 'Enter Username' });
    }

    if (!req.body.password) {
        return res.status(400).json({ error: true, message: 'Enter password' });

    }

    let users = await getUsernames();

    if (!users.includes(req.body.username)) {
        return res.status(400).json({ error: true, message: 'Username is not available please register' });
    }
    else {
        let username = req.body.username;
        let input_password = req.body.password;

        let user = await client.query({
            text: `SELECT user_id,username,password FROM public.users where username = $1;`,
        }, [username]);

        console.log(user.rows)

        var stored_password = user.rows[0].password
        let user_id = user.rows[0].user_id

        let match_password = await bcrypt.compare(input_password, stored_password)

        if (match_password) {

            let json = { "user_id": user_id }
            let jwtToken = jwt.sign(json, process.env.JWT_SECRET, { expiresIn: 3600 });
            return res.status(200).json({ error: false, message: 'User loggedin successfully', Token: jwtToken });

        } else {
            res.status(401).json({ error: true, message: "Wrong Password" });
        }

    }

}

const logoutUser = async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    console.log(token)
    tokenBlacklist.push(token)
    console.log(tokenBlacklist)

    return res.status(200).json({ message: "User Logged out successfully" });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}