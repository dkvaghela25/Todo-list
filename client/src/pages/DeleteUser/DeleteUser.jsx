import React , { useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ToastHelper from '../../helper/toastHelper'; // Use the helper
import isLoggedin from '../../helper/isLoggedin';

import './DeleteUser.css'

function DeleteUser() {

    const navigate = useNavigate();

    useEffect(() => {

        let bool = isLoggedin();

        console.log(bool)

        if (!bool) {
            navigate('/login');
            return;
        }

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();


        let token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        let user_id = decodedToken.user_id;


        try {
            console.log(token)

            const res = await axios.delete(`http://localhost:3000/user/delete/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            ToastHelper.success(res.data.message);
            navigate('/login')
        } catch (error) {
            if (error.response) {
                ToastHelper.error(error.response.data.message);
            } else {
                ToastHelper.error(error.message);
            }
        }
    };

    return (
        <div className="delete-container">
            <div className="delete-card">
                <div className="delete-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
                <h1 className="delete-title">Are you sure you want to delete your account?</h1>
                <p className="delete-subtitle">This action cannot be undone. All your data will be permanently removed.</p>
                <div className="delete-buttons">
                    <button className="delete-btn delete-btn-yes" onClick={handleSubmit}>
                        Yes
                    </button>
                    <button className="delete-btn delete-btn-no" onClick={() => navigate('/user-details')}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteUser