import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style.css';
import './TodoList.css';
import editIcon from './edit.svg';
import deleteIcon from './delete.svg';
import { useNavigate } from 'react-router-dom';


function TodoList() {

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    const [tasks, setTasks] = useState([])

    const navigate = useNavigate();

    let token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const fetchedData = await axios.get('http://localhost:3000/todo', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Fetched tasks:', fetchedData.data);

                if (Array.isArray(fetchedData.data)) {
                    setTasks(fetchedData.data);
                } else {
                    setTasks([]);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    },[formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data being sent:', formData);
        try {

            const res = await axios.post('http://localhost:3000/todo/create', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Task added successfuly:', res.data);

            setFormData({
                title: '',
                description: ''
            })

        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert(`Error: ${error.response.data.message || 'Registration failed'}`);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    const getTask = async (e) => {

        let todo_id = e.target.className;
        console.log(todo_id)

        let task = document.getElementById(todo_id);
        console.log(task)

        let title = task.querySelector('.title').innerHTML
        let description = task.querySelector('.description').innerHTML

        console.log(title, description)

        setFormData({
            title: title,
            description: description
        })

    };

    const deleteTask = async (e) => {

        try {

            let todo_id = e.target.className;
            console.log(todo_id)

            const res = await axios.delete(`http://localhost:3000/todo/delete/${todo_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Task Deleted successfuly:', res.data);

        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert(`Error: ${error.response.data.message || 'Registration failed'}`);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    return (
        <div className='container'>
            <div className='heading'>Todo List</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <button type="submit">Add Task</button>
            </form>
            <h1>Tasks</h1>
            <table className='tasks'>
                <tr>
                    <td><b>Title</b></td><td><b>Description</b></td>
                </tr>

                {tasks.map((task) => (
                    <tr id={task.todo_id}>
                        <td className='title'>{task.title}</td>
                        <td className='description'>{task.description}</td>
                        <td><img src={editIcon} className={task.todo_id} onClick={getTask} alt="Edit" /></td>
                        <td><img src={deleteIcon} className={task.todo_id} onClick={deleteTask} alt="Delete" /></td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default TodoList;