import React , { useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ToastHelper from '../../helper/toastHelper'; // Use the helper
import isLoggedin from '../../helper/isLoggedin';

import '../style.css'
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
        <div className='container'>
            <h2>Are you sure you want to delete your account</h2>
            <div className="buttons">
                <button className='delete-button' onClick={handleSubmit}>Yes</button>
                <button onClick={() => navigate('/user-details')}>No</button>
            </div>
        </div>
    )
}

export default DeleteUser