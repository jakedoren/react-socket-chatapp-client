import React, {useState, useEffect, useRef, useContext} from 'react'
import io from 'socket.io-client'
import Input from '../input/Input'
import queryString from 'query-string'
import Messagesection from '../messagesection/Messagesection'
import Heading from '../heading/Heading'

import './Chat.css'
import UserContext from '../../UserContext'

const Chat = ({location}) => {
    const [yourID, setYourID] = useState();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    // const [name, setName] = useState('')
    const { name } = useContext(UserContext)
    const [room, setRoom] = useState('')

    const ENDPOINT = 'http://localhost:8080/'

    const socketRef = useRef();

    useEffect(() => {
        // const { name, room } = queryString.parse(location.search);

        socketRef.current = io.connect(ENDPOINT)

        // setName(name)
        setRoom(room)

        socketRef.current.emit('join', {name, room})

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
            name: name
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
