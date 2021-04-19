import React, {useState, useEffect, useRef} from 'react'
import io from 'socket.io-client'
import Input from '../input/Input'
import './Chat.css'

const Chat = () => {
    const [yourID, setYourID] = useState();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'http://localhost:8080/'

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect(ENDPOINT)

        socketRef.current.on('your id', (id) => {
            setYourID(id)
        })

        socketRef.current.on('message', (message) => {
            recievedMessage(message)
        })
        
        
        
    }, [ENDPOINT])


    const handleChange = (e) => {
        setMessage(e.target.value)
        console.log(message)
    }

    const sendMessage = (e) => {
        e.preventDefault();

        const messageObject = {
            body: message,
            id: yourID
        };

        setMessage('')

        socketRef.current.emit('send message', messageObject)
    }

    const recievedMessage = (message) => {
        setMessages(oldMsgs => [...oldMsgs, message])
    }


    return (
        <div className="app-container">
            <div className="chat-messages">
                {messages.map((msg, i) => {
                    if(msg.id == yourID) {
                        return (
                            <div className="your-msg" key={i}>
                                <div className="your-bubble">
                                    <p>{msg.body}</p>
                                </div>    
                            </div>
                        ) 
                    } return (
                        <div className="friend-msg" key={i}>
                            <div className="their-bubble">
                                <p>{msg.body}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Input sendMessage={sendMessage} message={message} handleChange={handleChange} />
        </div>
    )
}

export default Chat
