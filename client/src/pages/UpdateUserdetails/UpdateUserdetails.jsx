// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from "jwt-decode";
// import axios from 'axios';
// import '../style.css';

// function UpdateUserdetails() {
//     const [formData, setFormData] = useState({});
//     const navigate = useNavigate();

//     let token = sessionStorage.getItem('token');
//     const decodedToken = jwtDecode(token);
//     let user_id = decodedToken.user_id;

//     useEffect(() => {
//         const fetchUserDetails = async () => {
//             try {

//                 const res = await axios.get(`http://localhost:3000/user/${user_id}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 setFormData(res.data);
//             } catch (err) {
//                 console.error('Error fetching user details:', err);
//             }
//         };

//         fetchUserDetails();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log('Form data being sent:', formData);
//         try {

//             console.log(token)

//             const res = await axios.patch(`http://localhost:3000/user/update/${user_id}`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             alert(res.data.message);
//             navigate('/user-details')
//         } catch (error) {
//             if (error.response) {
//                 console.error('Error response:', error.response.data);
//                 alert(`Error: ${error.response.data.message || 'Update failed'}`);
//             } else {
//                 console.error('Error:', error.message);
//             }
//         }
//     };


//     return (
//         <div className='container'>
//             <div className='heading'>Update User Details</div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                     value={formData.username}
//                     onChange={handleChange}
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                 />
//                 <input
//                     type="text"
//                     name="phone_no"
//                     placeholder="Phone No."
//                     value={formData.phone_no}
//                     onChange={handleChange}
//                 />
//                 <button type="submit">Update</button>
//             </form>
//         </div>
//     );
// }

// export default UpdateUserdetails

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import './UpdateUserdetails.css';
import { Link, useNavigate } from 'react-router-dom';
import defaultProfilePicture from '../profile-picture.png';

function UpdateUserdetails() {
  const [formData, setFormData] = useState({});

  const [file, setFile] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const navigate = useNavigate();

  let token = sessionStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  let user_id = decodedToken.user_id;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {

        const res = await axios.get(`http://localhost:3000/user/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData(res.data);
        setFile(res.data.image_url);
        setBackgroundImage(res.data.image_url);

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

  const resetPicture = (e) => {
    setFile(defaultProfilePicture)
    setBackgroundImage(defaultProfilePicture)
  };

  const updateUser = async (e) => {
    e.preventDefault();
    console.log('Form data being sent:', formData);
    try {

      console.log(token)

      const res = await axios.patch(`http://localhost:3000/user/update/${user_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);
      navigate('/user-details')
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(`Error: ${error.response.data.message || 'Update failed'}`);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="heading">Update User Details</div>
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
          <button onClick={resetPicture}>Reset Picture</button>
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
          <button onClick={updateUser}>Register</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserdetails;