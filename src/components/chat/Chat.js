import React, {useState, useEffect, useRef, useContext} from 'react'
import io from 'socket.io-client'
import Input from '../input/Input'
import queryString from 'query-string'
import Messagesection from '../messagesection/Messagesection'
import Heading from '../heading/Heading'
import { useOktaAuth } from '@okta/okta-react';
import Users from '../users/Users'
import MessageContext from '../../MessageContext'

import './Chat.css'
import UserContext from '../../UserContext'

const Chat = ({location}) => {
    const [yourID, setYourID] = useState();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { name, setName } = useContext(UserContext)
    const [userVal, setUserVal] = useState(localStorage.getItem('username', name))
    const [room, setRoom] = useState('')
    const { oktaAuth, authState } = useOktaAuth();
    const [users, setUsers] = useState('')
    const [messageSection, setMessageSection] = useState(true)
   

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


        socketRef.current.on('roomUsers', ({users}) => {
            setUsers(users)
        })
        
        

        return ()=>{
            socketRef.current.close();
        }
        
        
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
        <div className="app-wrapper">
            <div className="app-container">
            <div className="heading-container">
            <div className="heading-copy-container">
                <div>
                    <h1>{room}</h1>
                </div>
                <div className="link-wrap">
                    <ul>
                        <li className={messageSection ? "active" : null} onClick={() => setMessageSection(true)}>Messages</li>
                        <li className={messageSection ? null : "active"} onClick={() => setMessageSection(false) }>Participants</li>
                    </ul>
                </div>
            </div>
        </div>
                {messageSection ? <Messagesection messages={messages} yourID={yourID} /> : <Users users={users}/>}    
                <Input sendMessage={sendMessage} message={message} handleChange={handleChange} />
                {/* <Users users={users}/> */}
            </div>
        </div>
        
    )
}

export default Chat
