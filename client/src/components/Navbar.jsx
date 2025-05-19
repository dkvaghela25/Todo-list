import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <div>
            <header>
                <Link to="/register">Register</Link>
                <Link to="/login">LogIn</Link>
                <Link to="/logout">Logout</Link>
                <Link to="/user-details">Profile</Link>
            </header>
        </div>
    )
}

export default Navbar