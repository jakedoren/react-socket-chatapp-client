import React, { useContext, useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import './Messagesection.css'

const Messagesection = ({messages, yourID}) => {

    
    return (
        <ScrollToBottom className="chat-messages">
            {messages.map((msg, i) => {
                if(msg.id == yourID) {
                    return (
                        <div key={i}>
                            <div className="your-msg" >
                                <div className="your-bubble">
                                    <p>{msg.body}</p>
                                </div>    
                            </div>
                        </div>
                    ) 
                } return (
                    <div key={i}>
                        {msg.name ? <h1 className="name">{msg.name}</h1> : <h1 className="name">ChatBot</h1>}
                        <div className="friend-msg" >
                            <div className="their-bubble" key={i} >
                                <p>{msg.body}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </ScrollToBottom>
        
    )
}

export default Messagesection
