import React, {useContext, useState, useEffect} from 'react'
import MessageContext from '../../MessageContext'
import './Heading.css'

const Heading = ({room}) => {
    const {messageSection, setMessageSection} = useContext(MessageContext)
    const [messageState, setMessageState] = useState(localStorage.getItem('messageState', messageSection))


    useEffect(() => {
       localStorage.setItem('messageState', messageSection)
       console.log(messageState)
    }, [messageSection])

    return (
        <div className="heading-container">
            <div className="heading-copy-container">
                <div>
                    <h1>{room}</h1>
                </div>
                <div className="link-wrap">
                    <ul>
                        <li className="active" onClick={() => setMessageState(true)}>Messages</li>
                        <li onClick={() => setMessageState(false)}>Participants</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Heading
