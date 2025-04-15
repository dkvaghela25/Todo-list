import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../style.css';

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
        <div>
            <div className="container">
                <div className='heading'>User Details</div>
                <table>
                    <tr><td><b>Username</b></td> <td>:</td> <td>{data.username}</td></tr>
                    <tr><td><b>Email ID</b></td> <td>:</td> <td>{data.email}</td></tr>
                    <tr><td><b>Phone No.</b></td> <td>:</td> <td>{data.phone_no}</td></tr>
                </table>
                <button onClick={() => navigate('/update-user')}>Update</button>
                <button className='delete-button' onClick={() => navigate('/delete-user')}>Delete</button>
            </div>
        </div>
    );
}

export default UserDetails;