import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../style.css';
import './UserDetails.css';

function UserDetails() {

    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                let token = sessionStorage.getItem('token');
                const decodedToken = jwtDecode(token);
                let user_id = decodedToken.user_id;

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
                <div className="user-details">
                    {console.log(data)}
                    <table>
                    {Object.keys(data).map((key) => (
                        <tr>
                            <td>{key}</td> <td>:</td> <td>{data[key]}</td>
                        </tr>
                    ))}
                    </table>
                </div>
                <button onClick={() => navigate('/update-user')}>Update</button>
                <button className='delete-button' onClick={() => navigate('/delete-user')}>Delete</button>
            </div>
        </div>
    );
}

export default UserDetails;