import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import '../style.css';

function UpdateUserdetails() {
    const [formData, setFormData] = useState({});
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

    const handleSubmit = async (e) => {
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
        <div className='container'>
            <div className='heading'>Update User Details</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
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
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateUserdetails

