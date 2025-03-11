const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require("email-validator");
const {client} = require('../../database/index') 
const { logging } = require('../../helper/logging');
const { getUsernames } = require('../../helper/methods')
const { verifyToken } = require('../../helper/jwtHelper');
const { tokenBlacklist } = require('../../helper/constants');

const getUsers = async (req, res) => {
    const result = await client.query('SELECT * FROM public.users;');

    res.send(result.rows)
}

const registerUser = async (req, res) => {

    if (!req.body.username) {
        res.status(400).json({ error: true , message : 'Enter Username' });
    }

    if (!req.body.password) {
        res.status(400).json({ error: true , message : 'Enter password' });
    }
    
    let users = await getUsernames();
    
    console.log(users)
    
    if (users.includes(req.body.username)) {
        res.status(409).json({ error: true , message : 'Username is already taken ' });
    }
    else {
        
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(req.body.password, salt);
        
        let insert =
        'INSERT INTO public.users(username, password , email , phone_no) VALUES ($1, $2, $3, $4)';
        let values = [req.body.username, hashPassword, req.body.email, req.body.phone_no];
        
        await client.query(insert, values);
        res.status(200).json({ error: false , message : 'User registered successfully' });

    }
}

const loginUser = async (req, res) => {

    if (!req.body.username) {
        res.status(400).json({ error: true , message : 'Enter Username' });
    }
    
    if (!req.body.password) {
        res.status(400).json({ error: true , message : 'Enter password' });
        
    }
    
    let users = await getUsernames();
    
    if (!users.includes(req.body.username)) {
        res.status(400).json({ error: true , message : 'Username is not available please register' });
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
            res.status(200).json({ error: false , message : 'User loggedin successfully', Token: jwtToken });
            
        } else {
            res.status(401).json({ error: true , message : "Wrong Password" });
        }
        
    }

}

const updateUser = async (req, res) => {

    var decodedToken = verifyToken(req.headers.authorization);

    if (decodedToken instanceof Error) {
        logging.error(decodedToken);
        return res.status(401).json({ error: decodedToken.message });
    }

    let user_id = decodedToken.user_id;

    let change_in = Object.keys(req.body);

    let users = await getUsernames();

    change_in.forEach(element => {

        if (element == 'email') {
            var valid_email = validator.validate(req.body.email);

            if (valid_email == false) {
                res.status(400).json({ error: true , message : 'Invalid Email ID' });
            }
        }

        if (element == 'phone_no') {
            var valid_phone_no = phone(req, body.phone_no, { country: 'IND' });

            if (valid_phone_no == false) {
                res.status(400).json({ error: true , message : 'Invalid Phone No' });
            }
        }
        
        if (element == 'username') {
            var valid_username = users.includes(req.body.username)
            
            if (valid_username == true) {
                res.status(409).json({ error: true , message : 'Username is already taken' });
            }
        }


        let query = `UPDATE public.users SET ${element} = $1 WHERE user_id = $2;`
        client.query(query, [req.body[element], user_id])
    });

    res.status(200).json({ message: 'User updated successfully' });
    
}

const logoutUser = async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    console.log(token)
    tokenBlacklist.push(token)
    console.log(tokenBlacklist)
    
    res.status(200).json({ message: "User Logged out successfully" });
}

const deleteUser = async (req,res) => {
    var decodedToken = verifyToken(req.headers.authorization);

    if (decodedToken instanceof Error) {
        return res.status(401).json({ error: true , message: decodedToken.message });
    }

    let user_id = decodedToken.user_id;

    let tasks = await client.query('SELECT * FROM public.todo WHERE user_id = $1' , [user_id])

    tasks = tasks.rows;

    if(tasks.length != 0) {
        res.status(400).json({ error: true , message: 'First remove every task from todo list'});
    } else {
        await client.query('DELETE FROM public.users WHERE user_id = $1', [user_id])
    }

    res.status(200).json({ message: 'User removed successfully' });
}

module.exports = {
    getUsers,
    registerUser,
    loginUser,
    updateUser,
    logoutUser,
    deleteUser
}