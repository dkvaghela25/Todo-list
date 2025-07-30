import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ToastHelper from '../../helper/toastHelper'; // Use the helper
import isLoggedin from '../../helper/isLoggedin';
import './LoginPage.css';

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
    
    // Basic validation
    if (!formData.credentials || !formData.password) {
      return ToastHelper.error('Please fill in all required fields');
    }
    
    try {
      const res = await axios.post('http://localhost:3000/auth/login', formData);
      localStorage.setItem("token", res.data.Token);
      
      ToastHelper.success(res.data.message);
      
      navigate('/user-details');
    } catch (error) {
      console.error("Login error:", error);
      ToastHelper.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Login</h1>
          <p className="login-subtitle">Welcome back! Please enter your credentials</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-content">
            <div className="login-field">
              <label className="login-label">Username or Email *</label>
              <input
                type="text"
                name="credentials"
                placeholder="Username or Email ID"
                className="login-input"
                autoComplete="off"
                value={formData.credentials || ''}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="login-field">
              <label className="login-label">Password *</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="login-input"
                autoComplete="off"
                value={formData.password || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="login-actions">
            <button 
              type="submit" 
              className="login-btn login-btn-primary"
            >
              Login
            </button>
          </div>
        </form>
        
        <div className="link-container">
          Don't have an account <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;