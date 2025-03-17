const { client } = require('./config/index')

const connect = () => {

    client
        .connect()
        .then(() => {
            console.log('Connected to PostgreSQL database');
        })
        .catch((err) => {
            console.error('Error connecting to PostgreSQL database', err);
        });

}

module.exports = {
    connect
}