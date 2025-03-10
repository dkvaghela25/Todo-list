const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { client } = require('../../database/index')
const { verifyToken } = require('../../helper/jwtHelper');

const addTask = async (req, res) => {

    var decodedToken = verifyToken(req.headers.authorization);

    if (decodedToken instanceof Error) {
        return res.status(401).json({ error: decodedToken.message });
    }

    let user_id = decodedToken.user_id

    const query = 'INSERT INTO public.todo(user_id, title, description) VALUES ($1, $2, $3)'

    await client.query(query, [user_id, req.body.title, req.body.description])

    res.send('Task added successfully')

}

const updateTask = async (req, res) => {

    var decodedToken = verifyToken(req.headers.authorization);

    if (decodedToken instanceof Error) {
        return res.status(401).json({ error: decodedToken.message });
    }

    let change_in = Object.keys(req.body);

    let todo_id = req.body.todo_id

    let user_id = await client.query('select user_id from public.todo where todo_id = $1' , [todo_id])

    user_id = user_id.rows[0].user_id

    if(user_id != decodedToken.user_id){
        return res.status(401).json({ error: `You can't make changes in someone else task`})
    }

    change_in.forEach(element => {
        let query = `UPDATE public.todo SET ${element} = $1 WHERE todo_id = $2;`
        client.query(query, [req.body[element], todo_id])
    });

    res.send("Task updated succesfully")

}

const deleteTask = async (req,res) => {

    var decodedToken = verifyToken(req.headers.authorization);

    if (decodedToken instanceof Error) {
        return res.status(401).json({ error: decodedToken.message });
    }

    let todo_id = req.body.todo_id
    console.log(todo_id)

    let user_id = await client.query('select user_id from public.todo where todo_id = $1' , [todo_id])

    console.log(user_id)
    user_id = user_id.rows[0].user_id

    if(user_id != decodedToken.user_id){
        return res.status(401).json({ error: `You can't delete someone else task`})
    }

    await client.query('DELETE FROM public.todo WHERE todo_id = $1;',[todo_id])

    res.send("Task deleted succesfully")

}

module.exports = {
    addTask,
    updateTask,
    deleteTask
}