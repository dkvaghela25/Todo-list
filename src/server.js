const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv');
const { connect } = require('./database/index')
const { apiRouter } = require('./api/index')

dotenv.config()

const app = express();
const port = process.env.PORT;

connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

app.get('/health', function (req, res) {
    return res.send('Ok, Working fine.');
});

app.use('/',apiRouter)

try{
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}/`)
    })
} catch(err) {
    logging.error(`Error Occured! - start_server - ${err}`);
}


