import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import '../style.css'

function LogoutPage() {

    const navigate = useNavigate();

    let token = sessionStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    let user_id = decodedToken.user_id;

    const logout = async (e) => {
        e.preventDefault();
        try {

            console.log(token)

            const res = await axios.post(`http://localhost:3000/auth/logout`, {} , {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            });

            alert(res.data.message);
            document.querySelector('.profile-button').hidden = true
            navigate('/login')

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
            <h1>Are you sure you want to log out</h1>
            <button onClick={logout}>Yes</button>
            <button onClick={() => navigate('/user-details')}>No</button>
        </div>
    )
}

export default LogoutPage