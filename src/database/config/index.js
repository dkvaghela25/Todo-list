const { Client } = require('pg');
const { config } = require('dotenv');
config();

const client = new Client({
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
});

module.exports = {
    client
}
