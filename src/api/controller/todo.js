const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const {client} = require('../../database/index') 
const { verifyToken } = require('../../helper/jwtHelper');

const createTodo = async (req,res) => {

    var decodedToken = verifyToken(req.headers.authorization);

    if (decodedToken instanceof Error) {
        return res.status(401).json({ error: decodedToken.message });
    }

    let user_id = decodedToken.user_id

    console.log(user_id)

    const query = 'INSERT INTO public.todo(user_id, title, description) VALUES ($1, $2, $3)'
    
    await client.query(query , [user_id,req.body.title,req.body.description])

    res.send(200)

}

module.exports = {
    createTodo
}