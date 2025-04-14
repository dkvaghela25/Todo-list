import React from 'react'
import '../style.css'
import './UserDetails.css'

function UserDetails() {

    let data = {
        "user_id": 89,
        "username": "parth12",
        "password": "tarsariya",
        "email": "hello123@gmail.com",
        "phone_no": "9724491234"
    }

    return (
        <div>
            <div className="container">
                <div className='heading'>User Details</div>
                <div className="user-details">
                    {Object.keys(data).map((key) => (
                        <><div>{key}</div><div>:</div><div>{data[key]}</div></>
                    ))}
                </div>
                <button>Update</button>
                <button className='delete-button'>Delete</button>
            </div>
        </div>
    )
}

export default UserDetails