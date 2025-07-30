import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import isLoggedin from '../helper/isLoggedin'
import { BsListTask } from 'react-icons/bs'

function Navbar() {
    const navigate = useNavigate();
    const loggedIn = isLoggedin();

    const handleLogoClick = () => {
        if (loggedIn) {
            navigate('/user-details');
        } else {
            navigate('/');
        }
    };

    return (
        <div>
            <header>
                <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={handleLogoClick}>
                    <BsListTask size={28} style={{ color: '#C1D0FD' }} />
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#C1D0FD' }}>TodoMaster</span>
                </span>
                {loggedIn ? (
                    <>
                        <Link to="/user-details">Profile</Link>
                        <Link to="/logout">Logout</Link>
                    </>
                ) : (
                    <>
                        <Link to="/register">Register</Link>
                        <Link to="/login">LogIn</Link>
                    </>
                )}
            </header>
        </div>
    )
}

export default Navbar