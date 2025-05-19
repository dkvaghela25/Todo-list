import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import './UpdateUserdetails.css';
import { useNavigate } from 'react-router-dom';
import defaultProfilePicture from '../profile-picture.png';
import ToastHelper from '../../helper/toastHelper'; // Use the helper
import isLoggedin from '../../helper/isLoggedin';

function UpdateUserdetails() {
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [file, setFile] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    let bool = isLoggedin();

    console.log(bool)

    if (!bool) {
      navigate('/login');
      return;
    }

    let token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    let user_id = decodedToken.user_id;

    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/user/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOriginalData(res.data);
        setFormData(res.data);
        setBackgroundImage(res.data.image_url);
        setFile(null);
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };

    fetchUserDetails();
  }, []);

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

  const resetPicture = async () => {
    // Fetch the default image as a blob
    const response = await fetch(defaultProfilePicture);
    const blob = await response.blob();
    // Create a File object from the blob (name and type are important)
    const file = new File([blob], "default-profile-picture.png", { type: blob.type });
    setFile(file);
    setBackgroundImage(defaultProfilePicture);
  };

  const updateUser = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    let user_id = decodedToken.user_id;

    const updatedData = {};

    for (const key in formData) {
      if (formData[key] !== originalData[key]) {
        updatedData[key] = formData[key];
      }
    }

    const formDataWithFile = new FormData();
    for (const key in updatedData) {
      formDataWithFile.append(key, updatedData[key]);
    }

    if (file instanceof File) {
      formDataWithFile.append('image', file);
    }

    console.log('Updated data:', updatedData);
    console.log('Form data being sent:');
    for (let pair of formDataWithFile.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    try {
      const res = await axios.patch(`http://localhost:3000/user/update/${user_id}`, formDataWithFile, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      ToastHelper.success(res.data.message);
      navigate('/user-details');
    } catch (error) {
      ToastHelper.error(error.response?.data?.message || 'Update failed');
    }
  };


  // Added new comment


  return (
    <div className="container">
      <div className="heading">Update User Details</div>
      <form className="registration_form" onSubmit={updateUser}>
        <div className="left">
          <input
            type="file"
            className="imageInput"
            onChange={handleFileChange}
            style={{
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : `url(${defaultProfilePicture})`,
            }}
          />
          <button type="button" onClick={resetPicture}>Reset Picture</button>
        </div>
        <div className="right">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="off"
            value={formData.username}
            onChange={handleChange}
          />
          <label htmlFor="email">Email ID:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="phone_no">Phone No:</label>
          <input
            type="text"
            name="phone_no"
            placeholder="Phone No."
            autoComplete="off"
            value={formData.phone_no}
            onChange={handleChange}
          />
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserdetails;