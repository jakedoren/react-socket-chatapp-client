import React from 'react'
import './Messagesection.css'

const Messagesection = ({messages, yourID}) => {
    return (
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
    )
}

export default Messagesection
