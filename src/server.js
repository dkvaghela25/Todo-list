const express = require('express')
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
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
    const result = await client.query({
        text: 'SELECT * FROM public.users;',
        rowMode: 'array',
    });

    console.log(result.rows.join(' ').split(' '))
    res.send(result.rows.join(' ').split(' '))
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
            text: `SELECT username,password FROM public.users where username = $1;`,
            rowMode: 'array',
        }, [username]);

        var stored_password = user.rows[0][1]
        console.log(stored_password)

        let match_password = await bcrypt.compare(input_password, stored_password)

        if (match_password) {

            let json = { "usename": username, "password": input_password }

            let jwtToken = jwt.sign(json, process.env.JWT_SECRET);

            res.status(200).send(jwtToken);

        } else {
            res.send("Wrong Password")
        }

    }

})



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`)
})