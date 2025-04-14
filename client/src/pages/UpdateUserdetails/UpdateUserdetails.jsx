import React from 'react'
import '../style.css'

function UpdateUserdetails() {
    let data = {
        "user_id": 89,
        "username": "parth12",
        "password": "tarsariya",
        "email": "hello123@gmail.com",
        "phone_no": "9724491234"
    }

  return (
    <div className='container'>
        <div className='heading'>Update Userdetails</div>
        <form action="">
            <input type="text" value={data.username} />
            <input type="text" value={data.password} />
            <input type="text" value={data.email} />
            <input type="text" value={data.phone_no} />
            <button>Update</button>
        </form>
    </div>
  )
}

export default UpdateUserdetails