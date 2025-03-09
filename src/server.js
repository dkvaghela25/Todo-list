const express = require('express')
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');
const { validate_user } = require('./middleware/validate')
const { client, connect } = require('./database/index')

const dotenv = require('dotenv');
dotenv.config()

const app = express();
const port = process.env.PORT;
const upload = multer();

connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users/register', upload.none(), validate_user)


app.get('/health', function (req, res) {
    return res.send('Ok, Working fine.');
});

app.get('/users', async (req, res) => {
    const result = await client.query('SELECT * FROM public.users;');

    res.send(result.rows)
})

app.post('/users/register', async (req, res) => {

    if (!req.body.username) {
        res.send('Enter username')
    }

    if (!req.body.password) {
        res.send('Enter password')
    }

    let users = await client.query({
        text: 'SELECT username FROM public.users;',
        rowMode: 'array',
    });

    users = users.rows.join(' ').split(' ')

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

})

app.post('/users/login', upload.none(), async (req, res) => {

    if (!req.body.username) {
        res.send('Enter username')
    }

    if (!req.body.password) {
        res.send('Enter password')
    }

    let users = await client.query({
        text: 'SELECT username FROM public.users;',
        rowMode: 'array',
    });

    users = users.rows.join(' ').split(' ')

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

            let jwtToken = jwt.sign(json, process.env.JWT_SECRET,{ expiresIn: 60 });

            res.status(200).send(jwtToken);

        } else {
            res.send("Wrong Password")
        }

    }

})

app.patch('/users/update',upload.none(), async (req, res) => {
    let header = req.headers.authorization
    let token = header.split(' ')[1]

    let username = jwtDecode(token).username;

    let change_in = Object.keys(req.body);

    let user = await client.query({
        text: 'SELECT * FROM public.users where username = $1;',
        rowMode: 'array',
    },[username]);

    let user_id = user.rows[0][0]

    change_in.forEach(element => {
        let query = `UPDATE public.users SET ${element} = $1 WHERE user_id = $2;`
        console.log(element)
        console.log(req.body[element])
        client.query(query,[req.body[element],user_id])
    });

    res.send(200)

})

app.post('/users/logout' , async(req,res) => {

})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`)
})

