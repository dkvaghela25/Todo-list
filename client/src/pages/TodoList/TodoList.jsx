import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../style.css';
import './TodoList.css';
import editIcon from './edit.svg';
import deleteIcon from './delete.svg';
import ToastHelper from '../../helper/toastHelper'; // Use the helper
import isLoggedin from '../../helper/isLoggedin';


function TodoList() {

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    const [tasks, setTasks] = useState([]);
    const [todoId, setTodoId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        let bool = isLoggedin();

        console.log(bool)

        if (!bool) {
            navigate('/login');
            return;
        }

    }, []);

    
    let token = localStorage.getItem('token');
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
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addTask = async (e) => {
        e.preventDefault();
        console.log('Form data being sent:', formData);
        try {
            const res = await axios.post('http://localhost:3000/todo/create', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });            

            ToastHelper.success(res.data.message);
            
            setFormData({
                title: '',
                description: ''
            });
        } catch (error) {
            ToastHelper.error(error.response.data.message || 'Failed to add task');
        }
    };

    const getTask = async (e) => {
        const todo_id = e.target.className;
        console.log(todo_id);

        let task = document.getElementById(todo_id);
        console.log(task);

        let title = task.querySelector('.title').innerHTML;
        let description = task.querySelector('.description').innerHTML;

        console.log(title, description);

        setFormData({
            title: title,
            description: description
        });

        setTodoId(todo_id);

        document.querySelector('.add-button').hidden = true;
        document.querySelector('.update-button').hidden = false;
    };

    const updateTask = async (e) => {
        e.preventDefault();

        console.log('Selected todo_id:', todoId);
        console.log('Form data being sent:', formData);

        try {
            const res = await axios.patch(`http://localhost:3000/todo/update/${todoId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(res.data.message);

            setFormData({
                title: '',
                description: ''
            });

            setTodoId(null);
            document.querySelector('.add-button').hidden = false;
            document.querySelector('.update-button').hidden = true;
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert(`Error: ${error.response.data.message || 'Failed to update task'}`);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    const deleteTask = async (e) => {
        try {
            const todo_id = e.target.className;
            console.log(todo_id);

            const res = await axios.delete(`http://localhost:3000/todo/delete/${todo_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(res.data.message);

            setFormData({
                title: '',
                description: ''
            });

        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert(`Error: ${error.response.data.message || 'Failed to delete task'}`);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    return (
        <div className='conatiner todolist_container'>
            <div className='heading'>Todo List</div>
            <form>
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
                <button className='add-button' type="submit" onClick={addTask}>Add Task</button>
                <button className='update-button' onClick={updateTask} hidden>Update Task</button>
            </form>
            <div className="tasks">
                <h1>Tasks</h1>
                <table>
                    <tr>
                        <td><b>Title</b></td><td><b>Description</b></td>
                    </tr>
                    {tasks.map((task) => (
                        <tr id={task.todo_id} key={task.todo_id}>
                            <td className='title'>{task.title}</td>
                            <td className='description'>{task.description}</td>
                            <td><img src={editIcon} className={task.todo_id} onClick={getTask} alt="Edit" /></td>
                            <td><img src={deleteIcon} className={task.todo_id} onClick={deleteTask} alt="Delete" /></td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
}

export default TodoList;