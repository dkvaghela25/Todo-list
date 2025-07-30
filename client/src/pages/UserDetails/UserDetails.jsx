import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import './UserDetails.css';
import { useNavigate } from 'react-router-dom';
import ToastHelper from '../../helper/toastHelper';
import isLoggedin from '../../helper/isLoggedin';

function UserDetails() {

    const [data, setData] = useState({});
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

                setData(res.data);
            } catch (err) {
                ToastHelper.error('Failed to fetch user details');
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div className="user-details-container">
            <div className="user-details-card">
                <div className="user-details-header">
                    <h1 className="user-details-title">User Details</h1>
                    <p className="user-details-subtitle">Manage your account information and preferences</p>
                </div>
                
                <div className="user-details-content">
                    <div className="user-details-left">
                        <div
                            className='profile-picture'
                            style={{
                                backgroundImage: data.image_url ? `url(${data.image_url})` : 'none',
                            }}>
                        </div>
                    </div>
                    
                    <div className="user-details-right">
                        <div className="user-details-field">
                            <label className="user-details-label">Username</label>
                            <div className="user-details-value">{data.username || 'Not set'}</div>
                        </div>
                        
                        <div className="user-details-field">
                            <label className="user-details-label">Email ID</label>
                            <div className="user-details-value">{data.email || 'Not set'}</div>
                        </div>
                        
                        <div className="user-details-field">
                            <label className="user-details-label">Phone Number</label>
                            <div className="user-details-value">{data.phone_no || 'Not set'}</div>
                        </div>
                    </div>
                </div>
                
                <div className="user-details-actions">
                    <button 
                        className="user-details-btn user-details-btn-primary" 
                        onClick={() => navigate('/update-user')}
                    >
                        Update Profile
                    </button>
                    <button 
                        className="user-details-btn user-details-btn-danger" 
                        onClick={() => navigate('/delete-user')}
                    >
                        Delete Account
                    </button>
                </div>
                
                <button 
                    className="user-details-btn user-details-btn-success todo-list-btn" 
                    onClick={() => navigate('/todo-list')}
                >
                    Open Todo List
                </button>
            </div>
        </div>
    );
}

export default UserDetails;