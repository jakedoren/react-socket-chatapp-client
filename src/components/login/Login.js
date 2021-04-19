import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Login.css'

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    
    return (
        <div className="join-wrap">
            <div className="join-container"> 
                <div className="inputs">
                    <div className="brand-container">
                        <h1>Join</h1> 
                    </div>
                    <span></span>
                    <p>Username</p>
                    <input type="text" placeholder="myname" onChange={event => setName(event.target.value)} />
                    <p>Room</p>
                    <input type="text" placeholder="myfriendschatroom" className="login-input" onChange={event => setRoom(event.target.value)} />
                    <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`chat?name=${name}&room=${room}`} className='join-btn'>
                        <p>LOGIN</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Join