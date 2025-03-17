const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require("email-validator");
const { client } = require('../../database/index')
const { logging } = require('../../helper/logging');
const { getUsernames } = require('../../helper/methods')
const { decodeToken } = require('../../helper/jwtHelper');
const { tokenBlacklist } = require('../../helper/constants');

const getUsers = async (req, res) => {

    let user_id = req.query.user_id

    const result = await client.query('SELECT * FROM public.users WHERE user_id = $1;' , [user_id]);

    if( result.rows.length == 0 ){
        return res.status(400).json({message : "Account is deleted, register again"})
    }

    res.send(result.rows)
}

const updateUser = async (req, res) => {

    let user_id = req.query.user_id

    let change_in = req.body;

    let users = await getUsernames();

    username = change_in.username
    email = change_in.email
    phone_no = change_in.phone_no

    change_in = Object.keys(req.body)

    if (username) {
        var valid_username = users.includes(username)

        if (valid_username == true) {
            return res.status(409).json({ error: true, message: 'Username is already taken' });
        }
    }

    if (email) {
        var valid_email = validator.validate(email);

        if (valid_email == false) {
            return res.status(400).json({ error: true, message: 'Invalid Email ID' });
        }
    }

    if (phone_no) {
        var valid_phone_no = phone(phone_no, { country: 'IND' });

        if (valid_phone_no == false) {
            return res.status(400).json({ error: true, message: 'Invalid Phone No' });
        }
    }

    change_in.forEach(element => {
        let query = `UPDATE public.users SET ${element} = $1 WHERE user_id = $2;`
        client.query(query, [req.body[element], user_id])
    });

    return res.status(200).json({ message: 'User updated successfully' });

}

const deleteUser = async (req, res) => {

    let user_id = req.query.user_id

    let tasks = await client.query('SELECT * FROM public.todo WHERE user_id = $1', [user_id])

    tasks = tasks.rows;

    if (tasks.length != 0) {
        return res.status(400).json({ error: true, message: 'First remove every task from todo list' });
    } else {
        await client.query('DELETE FROM public.users WHERE user_id = $1', [user_id])
    }

    return res.status(200).json({ message: 'User removed successfully' });
}

module.exports = {
    getUsers,
    updateUser,
    deleteUser
}