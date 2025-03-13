const { client } = require('../../database/index')
const { verifyToken } = require('../../helper/jwtHelper');

const addTask = async (req, res) => {

    let user_id = req.query.user_id

    const query = 'INSERT INTO public.todo(user_id, title, description) VALUES ($1, $2, $3)'

    await client.query(query, [user_id, req.body.title, req.body.description])

    return res.status(200).json({ message: 'Task added successfully' });

}

const updateTask = async (req, res) => {

    let change_in = Object.keys(req.body);
    let todo_id = req.query.todo_id;
    
    change_in.forEach(element => {
        let query = `UPDATE public.todo SET ${element} = $1 WHERE todo_id = $2;`
        client.query(query, [req.body[element], todo_id])
    });

    return res.status(200).json({ message: "Task updated succesfully" });

}

const deleteTask = async (req,res) => {

    let todo_id = req.query.todo_id

    await client.query('DELETE FROM public.todo WHERE todo_id = $1;',[todo_id])

    return res.status(200).json({ message: "Task deleted succesfully" });

}

const showTask = async (req,res) => {

    let user_id = req.query.user_id

    let tasks = await client.query('SELECT * FROM public.todo where user_id = $1;' , [user_id]);

    if(tasks.rows.length == 0){
        res.status(200).json({ message: "No task for user" });
    }

    res.send(tasks.rows)

}

module.exports = {
    addTask,
    updateTask,
    deleteTask,
    showTask
}