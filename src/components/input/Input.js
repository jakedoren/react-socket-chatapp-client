import React from 'react'
import './Input.css'

const Input = ({ sendMessage, message, handleChange }) => {
    return (
            <div className="input-submit">
                <form className="text-form" onSubmit={sendMessage}>
                    <input value={message} onChange={handleChange} placeholder="dont be shy.. say something!"/>
                    <button>Send</button>
                </form>
            </div>
    )
}

export default Input
