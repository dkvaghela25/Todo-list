import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <div>
            <div className='container'>
                <h1>Welcome to Todo List Application</h1>
                <Link to="/register"><button>Register</button></Link>
                <Link to="/login"><button>LogIn</button></Link>
            </div>
        </div>
    )
}

export default HomePage