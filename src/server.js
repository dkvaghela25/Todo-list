const express = require('express')
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');
const expressPino = require('express-pino-logger');
const { validate_user } = require('./middleware/validate')
const { connect } = require('./database/index')
const { userRouter,todoRouter } = require('./api/index')
const { logging } = require('./helper/logging');

dotenv.config()

const app = express();
const port = process.env.PORT;
const upload = multer();
const expressLogger = expressPino({ logging });

connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

app.use('/users/register', upload.none(), validate_user)

app.get('/health', function (req, res) {
    return res.send('Ok, Working fine.');
});

app.use('/users' , userRouter)
app.use('/todo' , todoRouter)

try{
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}/`)
    })
} catch(err) {
    logging.error(`Error Occured! - start_server - ${err}`);
}


