import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <div>
            <header>
                <Link to="/register"><button>Register</button></Link>
                <Link to="/login"><button>LogIn</button></Link>
                <Link to="/logout"><button>Logout</button></Link>
                <Link to="/user-details" className='profile-button' hidden><button>Profile</button></Link>
            </header>
        </div>
    )
}

export default Navbar