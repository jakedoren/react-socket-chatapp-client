import React, {useState, useEffect, useRef, useContext} from 'react'
import io from 'socket.io-client'
import Input from '../input/Input'
import queryString from 'query-string'
import Messagesection from '../messagesection/Messagesection'
import Heading from '../heading/Heading'
import { useOktaAuth } from '@okta/okta-react';

import './Chat.css'
import UserContext from '../../UserContext'

const Chat = ({location}) => {
    const [yourID, setYourID] = useState();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    // const [name, setName] = useState('')
    const { name, setName } = useContext(UserContext)
    // const [user, setUser] = useState('')
    const [userVal, setUserVal] = useState(localStorage.getItem('username', name))
    const [room, setRoom] = useState('')
    const { oktaAuth, authState } = useOktaAuth();

    const ENDPOINT = 'http://localhost:8080/'

    const socketRef = useRef();

    useEffect(() => {
        localStorage.setItem('username', name)
      }, [name])

    useEffect(() => {
        if(!authState.isAuthenticated) {
          setName('')
        } else {
          oktaAuth.tokenManager.getTokens().then(tok => {
            setName(tok.accessToken.claims.sub)
          })
        }
      }, [authState, oktaAuth])

    useEffect(() => {
        const { room } = queryString.parse(location.search);

        socketRef.current = io.connect(ENDPOINT)

       
        setRoom(room)
        console.log(userVal)

        socketRef.current.emit('join', {userVal, room})

        socketRef.current.on('your id', (id) => {
            setYourID(id)
        })

        socketRef.current.on('message', (message) => {
            recievedMessage(message)
            console.log(message)
        })
        
        
    }, [ENDPOINT, location.search])
    
    

    const handleChange = (e) => {
        setMessage(e.target.value)
        console.log(message)
    }

    const sendMessage = (e) => {
        e.preventDefault();

        const messageObject = {
            body: message,
            id: yourID,
            name: userVal
        };

        setMessage('')

        socketRef.current.emit('send message', messageObject)
    }

    const recievedMessage = (message) => {
        setMessages(oldMsgs => [...oldMsgs, message])
        console.log(messages)
    }


    return (
        <div className="app-container">
            <Heading room={room} />
            <Messagesection messages={messages} yourID={yourID} />
            <Input sendMessage={sendMessage} message={message} handleChange={handleChange} />
        </div>
    )
}

export default Chat
