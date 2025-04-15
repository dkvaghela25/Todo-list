import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';
import { Link } from 'react-router-dom';

function TodoList() {

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    let token = sessionStorage.getItem('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data being sent:', formData);
        try {
            const res = await axios.post('http://localhost:3000/todo/create', formData , {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Task added successfuly:', res.data);
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
        </div>
    );
}

export default TodoList;