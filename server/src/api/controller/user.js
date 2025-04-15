const bcrypt = require('bcryptjs');
const { client } = require('../../database/index')
const { getUsernames } = require('../../helper/methods')
const { AuthenticationError } = require('../../helper/errors');
const { validate_email, validate_phone_no } = require('../../helper/validate');

const getUsers = async (req, res) => {

    try {

        let user_id = req.params.user_id

        if (user_id != req.decodedToken.user_id) {
            throw new AuthenticationError('Wrong User ID');
        }

        const result = await client.query('SELECT * FROM public.users WHERE user_id = $1;', [user_id]);

        if (result.rows.length == 0) {
            return res.status(400).json({ message: "Account is deleted, register again" })
        }

        res.status(200).json(result.rows[0])

    } catch (err) {
        res.status(err.error_code).json(err.response_data)
    }
    
}

const updateUser = async (req, res) => {

    try {

        let user_id = req.params.user_id

        if (user_id != req.decodedToken.user_id) {
            throw new AuthenticationError('Wrong User ID');
        }

        let change_in = req.body;

        let users = await getUsernames();

        username = change_in.username
        email = change_in.email
        phone_no = change_in.phone_no
        password = change_in.password

        change_in = Object.keys(req.body)

        if (username) {
            var valid_username = users.includes(username)

            if (valid_username == true) {
                return res.status(409).json({ error: true, message: 'Username is already taken' });
            }
        }

        if (email) {
            validate_email(email)
        }

        if (phone_no) {
            validate_phone_no(phone_no)
        }

        if (password) {
            let salt = await bcrypt.genSalt(10);
            let hashPassword = await bcrypt.hash(req.body.password, salt);
            console.log(hashPassword)
            req.body.password = hashPassword;
        }

        change_in.forEach(element => {
            let query = `UPDATE public.users SET ${element} = $1 WHERE user_id = $2;`
            client.query(query, [req.body[element], user_id])
        });

        res.status(200).json({ message: 'User updated successfully' });

    } catch (err) {
        res.status(err.error_code).json(err.response_data)
    }

}

const deleteUser = async (req, res) => {

    try {

        let user_id = req.params.user_id

        if (user_id != req.decodedToken.user_id) {
            throw new AuthenticationError('Wrong User ID');
        }

        let tasks = await client.query('SELECT * FROM public.todo WHERE user_id = $1', [user_id])

        tasks = tasks.rows;

        if (tasks.length != 0) {
            return res.status(400).json({ error: true, message: 'First remove every task from todo list' });
        } else {
            await client.query('DELETE FROM public.users WHERE user_id = $1', [user_id])
        }

        return res.status(200).json({ message: 'User removed successfully' });

    } catch (err) {
        res.status(err.error_code).json(err.response_data)
    }
}

module.exports = {
    getUsers,
    updateUser,
    deleteUser
}