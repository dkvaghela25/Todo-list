import React , {useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import '../style.css'
import ToastHelper from '../../helper/toastHelper'; // Use the helper
import isLoggedin from '../../helper/isLoggedin';


function LogoutPage() {

    const navigate = useNavigate();

    useEffect(() => {

        let bool = isLoggedin();

        console.log(bool)

        if (!bool) {
            navigate('/login');
            return;
        }

    }, []);
    
    const logout = async (e) => {
        e.preventDefault();

        let token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        let user_id = decodedToken.user_id;
        try {

            console.log(token)

            const res = await axios.post(`http://localhost:3000/auth/logout`, {} , {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            });

            localStorage.removeItem("token");

            ToastHelper.success(res.data.message);
            navigate('/login')
            
        } catch (error) {
            ToastHelper.error(error.response.data.message || 'Logout failed');
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