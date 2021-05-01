import React, {useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import UserContext from '../../UserContext'
import { useOktaAuth } from '@okta/okta-react';
import './Login.css'

const Join = ({logButton}) => {
    const [room, setRoom] = useState('');
    const { oktaAuth, authState } = useOktaAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const {name, setName} = useContext(UserContext)

    const [userVal, setUserVal] = useState(localStorage.getItem('username') || '')

    useEffect(() => {
        if(!authState.isAuthenticated) {
          setIsLoggedIn(false)
          setName('')
        } else {
          oktaAuth.tokenManager.getTokens().then(tok => {
            setIsLoggedIn(true)
            setName(tok.accessToken.claims.sub)
          })
    
        }
      }, [authState, oktaAuth])

      useEffect(() => {
        localStorage.setItem('username', name)
      }, [name])

    
    return (
        <div className="join-wrap">
            <div className="join-container"> 
                <div className="inputs">
                    <div className="brand-container">
                        {isLoggedIn ? <h1>Hello, {name} </h1> : <h1>Please Log In</h1>}
                    </div>
                    <span></span>
                    {isLoggedIn ? 
                    <div>
                        <p>Enter a room!</p>
                        <input type="text" placeholder="chatroom" className="login-input" onChange={event => setRoom(event.target.value)} />
                        <Link to={`chat?room=${room}`} onClick={event => !room ? event.preventDefault() : null} className="join-btn" >Enter Chat</Link><br/>
                        <a className="logbtn">{logButton}</a> 
                    </div>
                    : <a className="logbtn">{logButton}</a>}
                </div>
            </div>
        </div>
    )
}

export default Join