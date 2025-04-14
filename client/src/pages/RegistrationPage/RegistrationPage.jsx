import React from 'react'
import '../style.css'

function RegistrationPage() {
  return (
    <div className='container'>
        <div className='heading'>Register</div>
        <form action="">
            <input type="text" placeholder='Username' />
            <input type="text" placeholder='Password' />
            <input type="text" placeholder='Email' />
            <input type="text" placeholder='Phone No.' />
            <button>Register</button>
        </form>
        <div className='link-container'>Already have an account <a href="">login</a></div>
    </div>
  )
}

export default RegistrationPage