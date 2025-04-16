import React from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../style.css'
import './DeleteUser.css'

function DeleteUser() {

    const navigate = useNavigate();

    let token = sessionStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    let user_id = decodedToken.user_id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(token)

            const res = await axios.delete(`http://localhost:3000/user/delete/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert(res.data.message);
            document.querySelector('.profile-button').hidden = true
            
            navigate('/login')
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert(`Error: ${error.response.data.message}`);
            } else {
                console.error('Error:', error.message);
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