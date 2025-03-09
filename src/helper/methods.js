const { client, connect } = require('../database/index');

connect();

async function getUsers() {
    let users = await client.query({
        text: 'SELECT username FROM public.users;',
        rowMode: 'array',
    });

    users = users.rows.join(' ').split(' ');

    return users;
}

module.exports = { getUsers };