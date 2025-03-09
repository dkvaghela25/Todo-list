const express = require('express')
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');
const { validate_user } = require('./middleware/validate')
const { connect } = require('./database/index')
const { userRouter } = require('./api/index')

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

app.use('/users' , userRouter)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`)
})

