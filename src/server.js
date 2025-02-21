const express = require('express')
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcryptjs');
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

    if(!req.body.username){
        res.send('Enter username')
    }

    if(!req.body.password){
        res.send('Enter password')
    }

    let users = await client.query({
        text: 'SELECT username FROM public.users;',
        rowMode: 'array',
    });

    users = users.rows.join(' ').split(' ')

    if (users.includes(req.body.username)) {
        res.send('Username not available')
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





app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`)
})