import React from 'react'
import '../style.css'

function RegistrationPage() {
  return (
    <div className='container'>
        <div className='heading'>Register</div>
        <form action="">
            <input type="text" placeholder='Username' />
            <input type="text" placeholder='Password' />
            <button>Log in</button>
        </form>
        <div className='link-container'>Don't have an account <a href="">Register</a></div>
    </div>
  )
}

export default RegistrationPage