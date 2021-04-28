import React from 'react'
import './Heading.css'

const Heading = ({room}) => {
    return (
        <div className="heading-container">
            <div className="heading-copy-container">
                <h1>{room}</h1>
            </div>
        </div>
    )
}

export default Heading
