import React from 'react'
import './Heading.css'

const Heading = ({room}) => {
    return (
        <div className="heading-container">
            <div className="heading-copy-container">
                <div>
                    <h1>{room}</h1>
                </div>
                <div className="link-wrap">
                    <ul>
                        <li className="active">Messages</li>
                        <li>Participants</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Heading
