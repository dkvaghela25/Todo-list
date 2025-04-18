import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import './UserDetails.css';
import { useNavigate } from 'react-router-dom';


function UserDetails() {

    const [data, setData] = useState({});
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

                setData(res.data);
            } catch (err) {
                console.error('Error fetching user details:', err);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div className="container">
            <div className="heading">User Details</div>
            <div className="user_details">
                <div className="left">
                    <div
                        className='profile_picture'
                        style={{
                            backgroundImage: `url(${data.image_url})`,
                        }}>
                    </div>
                </div>
                <div className="right">
                    <label htmlFor="username">Username:</label>
                    <div>{data.username}</div>
                    <label htmlFor="username">Email ID:</label>
                    <div>{data.email}</div>
                    <label htmlFor="username">Phone No:</label>
                    <div>{data.phone_no}</div>
                    <span className="buttons">
                        <button onClick={() => navigate('/update-user')}>Update</button>
                        <button className='delete-button' onClick={() => navigate('/delete-user')}>Delete</button>
                    </span>
                </div>
            </div>
            <button onClick={() => navigate('/todo-list')}>Open Todo List</button>
        </div>
    );
}

export default UserDetails;