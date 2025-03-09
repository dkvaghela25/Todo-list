const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require("email-validator");
const {client} = require('../../database/index') 
const { getUsernames } = require('../../helper/methods')
const { verifyToken } = require('../../helper/jwtHelper');
const { tokenBlacklist } = require('../../helper/constants');

const getUsers = async (req, res) => {
    const result = await client.query('SELECT * FROM public.users;');

    res.send(result.rows)
}

const registerUser = async (req, res) => {

    if (!req.body.username) {
        res.send('Enter username')
    }

    if (!req.body.password) {
        res.send('Enter password')
    }

    let users = await getUsernames();

    console.log(users)

    if (users.includes(req.body.username)) {
        res.send('Username is already taken ')
    }
    else {

        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(req.body.password, salt);

        let insert =
            'INSERT INTO public.users(username, password , email , phone_no) VALUES ($1, $2, $3, $4)';
        let values = [req.body.username, hashPassword, req.body.email, req.body.phone_no];

        await client.query(insert, values);
        res.status(200).send('User registered successfully')
    }
}

const loginUser = async (req, res) => {

    if (!req.body.username) {
        res.send('Enter username')
    }

    if (!req.body.password) {
        res.send('Enter password')
    }

    let users = await getUsernames();

    if (!users.includes(req.body.username)) {
        res.send('Username is not available please register first')
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

            res.status(200).send(jwtToken);

        } else {
            res.send("Wrong Password")
        }

    }

}

const updateUser = async (req, res) => {

    var decodedToken = verifyToken(req.headers.authorization);

    if(decodedToken instanceof Error){
        res.send(decodedToken.message)
    }

    let user_id = decodedToken.user_id;

    let change_in = Object.keys(req.body);

    let users = await getUsernames();

    change_in.forEach(element => {

        if (element == 'email') {
            var valid_email = validator.validate(req.body.email);

            if (valid_email == false) {
                res.send('Check Email ID')
            }
        }

        if (element == 'phone_no') {
            var valid_phone_no = phone(req, body.phone_no, { country: 'IND' });

            if (valid_phone_no == false) {
                res.send('Check Phone No')
            }
        }

        if (element == 'username') {
            var valid_username = users.includes(req.body.username)

            if (valid_username == true) {
                res.send('Username is already taken')
            }
        }


        let query = `UPDATE public.users SET ${element} = $1 WHERE user_id = $2;`
        client.query(query, [req.body[element], user_id])
    });

    res.sendStatus(200)

}

const logoutUser = async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    console.log(token)
    tokenBlacklist.push(token)
    console.log(tokenBlacklist)

    res.send("User Logged out successfully")
}

module.exports = {
    getUsers,
    registerUser,
    loginUser,
    updateUser,
    logoutUser
}