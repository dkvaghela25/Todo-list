import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';
import { Link, useNavigate } from 'react-router-dom';
import ToastHelper from '../../helper/toastHelper'; // Use the helper

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data being sent:', formData);
    try {
      const res = await axios.post('http://localhost:3000/auth/login', formData);
      sessionStorage.setItem("token", res.data.Token);
      
      ToastHelper.success(res.data.message);
      
      navigate('/user-details');
    } catch (error) {
      ToastHelper.error(error.response.data.message);
    }
  };

  return (
    <div className='container'>
      <div className='heading'>Login</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username or Email"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <div className='link-container'>
        Don't have an account <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default LoginPage;