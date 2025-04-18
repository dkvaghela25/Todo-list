import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationPage.css';
import { Link, useNavigate } from 'react-router-dom';
import defaultProfilePicture from '../profile-picture.png';

function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone_no: '',
  });

  const [file, setFile] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
    }
  };

  const resetPicture = (e) => {
    setFile(defaultProfilePicture)
    setBackgroundImage(defaultProfilePicture)
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const formDataWithFile = new FormData();
    formDataWithFile.append('username', formData.username);
    formDataWithFile.append('password', formData.password);
    formDataWithFile.append('email', formData.email);
    formDataWithFile.append('phone_no', formData.phone_no);
    if (file) {
      formDataWithFile.append('image', file);
    }

    try {
      const res = await axios.post('http://localhost:3000/auth/register', formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(res.data.message);
      navigate('/login');
    } catch (error) {
      console.error('Error response:', error.response.data);
      alert(`Error: ${error.response.data.message || 'Registration failed'}`);
    }
  };

  return (
    <div className="container">
      <div className="heading">Register</div>
      <form className="registration_form">
        <div className="left">
          <input
            type="file"
            className="imageInput"
            onChange={handleFileChange}
            style={{
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : `url(${defaultProfilePicture})`,
            }}
          />
          <button>Reset Picture</button>
        </div>
        <div className="right">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            autocomplete="off"
            value={formData.username}
            onChange={handleChange}
          />
          <label htmlFor="username">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            autocomplete="off"
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="username">Email ID:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            autocomplete="off"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="username">Phone No:</label>
          <input
            type="text"
            name="phone_no"
            placeholder="Phone No."
            autocomplete="off"
            value={formData.phone_no}
            onChange={handleChange}
          />
          <button onClick={registerUser}>Register</button>
        </div>
      </form>
      <div className="link-container">
        Already have an account <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}

export default RegistrationPage;