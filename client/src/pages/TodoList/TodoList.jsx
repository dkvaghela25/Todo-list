import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './TodoList.css';
import { FiEdit3 } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
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
        
        // Basic validation
        if (!formData.title || !formData.description) {
            return ToastHelper.error('Please fill in all required fields');
        }
        
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
            console.error("Add task error:", error);
            ToastHelper.error(error.response?.data?.message || 'Failed to add task');
        }
    };

    const getTask = async (e) => {
        const todo_id = e.currentTarget.getAttribute('data-todo-id');
        console.log(todo_id);

        // Find the task data from the tasks array
        const task = tasks.find(t => t.todo_id.toString() === todo_id);
        
        if (!task) {
            console.error('Task not found');
            return;
        }

        console.log(task.title, task.description);

        setFormData({
            title: task.title,
            description: task.description
        });

        setTodoId(todo_id);

        document.querySelector('.add-button').hidden = true;
        document.querySelector('.update-button').hidden = false;
    };

    const updateTask = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.title || !formData.description) {
            return ToastHelper.error('Please fill in all required fields');
        }

        try {
            const res = await axios.patch(`http://localhost:3000/todo/update/${todoId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            ToastHelper.success(res.data.message);

            setFormData({
                title: '',
                description: ''
            });

            setTodoId(null);
            document.querySelector('.add-button').hidden = false;
            document.querySelector('.update-button').hidden = true;
        } catch (error) {
            console.error("Update task error:", error);
            ToastHelper.error(error.response?.data?.message || 'Failed to update task');
        }
    };

    const deleteTask = async (e) => {
        try {
            const todo_id = e.currentTarget.getAttribute('data-todo-id');
            console.log(todo_id);

            const res = await axios.delete(`http://localhost:3000/todo/delete/${todo_id}`, {
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
            console.error("Delete task error:", error);
            ToastHelper.error(error.response?.data?.message || 'Failed to delete task');
        }
    };

    return (
        <div className="todo-container">
            <div className="todo-card">
                <div className="todo-header">
                    <h1 className="todo-title">Todo List</h1>
                    <p className="todo-subtitle">Manage your tasks efficiently</p>
                </div>
                
                <form className="todo-form" onSubmit={addTask}>
                    <div className="todo-form-content">
                        <div className="todo-field">
                            <label className="todo-label">Title *</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Task title"
                                className="todo-input"
                                autoComplete="off"
                                value={formData.title || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="todo-field">
                            <label className="todo-label">Description *</label>
                            <input
                                type="text"
                                name="description"
                                placeholder="Task description"
                                className="todo-input"
                                autoComplete="off"
                                value={formData.description || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="todo-actions">
                        <button 
                            type="submit" 
                            className="todo-btn todo-btn-primary add-button"
                        >
                            Add Task
                        </button>
                        <button 
                            type="button" 
                            className="todo-btn todo-btn-secondary update-button"
                            onClick={updateTask}
                            hidden
                        >
                            Update Task
                        </button>
                    </div>
                </form>
                
                <div className="todo-tasks">
                    <div className="todo-tasks-header">
                        <h2 className="todo-tasks-title">Your Tasks</h2>
                    </div>
                    
                    <table className="todo-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr id={task.todo_id} key={task.todo_id}>
                                    <td className="title">{task.title}</td>
                                    <td className="description">{task.description}</td>
                                    <td className="todo-actions-cell">
                                        <FiEdit3 
                                            className="todo-action-icon todo-edit-icon" 
                                            data-todo-id={task.todo_id}
                                            onClick={getTask}
                                            title="Edit"
                                        />
                                        <FiTrash2 
                                            className="todo-action-icon todo-delete-icon" 
                                            data-todo-id={task.todo_id}
                                            onClick={deleteTask}
                                            title="Delete"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TodoList;