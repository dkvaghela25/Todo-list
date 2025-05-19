import React, { useState , useEffect } from 'react';
import axios from 'axios';
import '../style.css';
import { Link, useNavigate } from 'react-router-dom';
import ToastHelper from '../../helper/toastHelper'; // Use the helper
import isLoggedin from '../../helper/isLoggedin';

function LoginPage() {
  const [formData, setFormData] = useState({
    credentials: '',
    password: ''
  });

  const navigate = useNavigate();

  useEffect(() => {

    let bool = isLoggedin();

    if(bool) {
      navigate('/user-details')
    }

  } , [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data being sent:', formData);
    try {
      const res = await axios.post('http://localhost:3000/auth/login', formData);
      localStorage.setItem("token", res.data.Token);
      
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
          name="credentials"
          placeholder="Username or Email ID"
          value={formData.credentials}
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