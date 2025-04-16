import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';
import { Link , useNavigate } from 'react-router-dom';

function RegistrationPage() {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone_no: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/register', formData);
      alert(res.data.message);

      navigate('/login');
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
      <div className='heading'>Register</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
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
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone_no"
          placeholder="Phone No."
          value={formData.phone_no}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
      <div className='link-container'>
        Already have an account <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}

export default RegistrationPage;