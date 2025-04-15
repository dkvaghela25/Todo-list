import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <div>
            <header>
                <Link to="/register"><button>Register</button></Link>
                <Link to="/login"><button>Log In</button></Link>
            </header>
        </div>
    )
}

export default Navbar