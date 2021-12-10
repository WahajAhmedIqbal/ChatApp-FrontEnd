import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

import ScrollToBottom from 'react-scroll-to-bottom';
import './style.css'

import AppContext from '../../Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneSquareAlt, faVideo } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';


const socket = new io.connect('http://localhost:3001')

const ChatRoom = () => {

    const [currentMessage, setCurrentMessage] = useState("")
    const [mesageList, setMesageList] = useState([])
    const [userName, setUserName] = useState("")

    const context = useContext(AppContext)
    const MyId = context.userdata
    const selectedChatId = context.selectedUserid
    const selectedUserName = context.selectedUserName

    const navigation = useNavigate()

    const sendMessage = async () => {
        const message = {
            myId: MyId.id,
            senderId: selectedChatId,
            message: currentMessage
        }

        await socket.emit('send_message', message)
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMesageList((list) => [...list, data])
        })
    }, [socket])


    return (
        <div className='chat-window'>
            <div className="chat-header">
                <p>
                    {selectedUserName}
                    {console.log(selectedUserName)}
                </p>
                <div>
                    <FontAwesomeIcon onClick={() => navigation('/chatRoom/OnCall')} className='fontAwesomIcon' icon={faPhoneSquareAlt} />
                    <FontAwesomeIcon className='fontAwesomIcon' icon={faVideo} />
                </div>
            </div>
            <div className="chat-body">
                {
                    mesageList.map((item) => (
                        <div className='message' id={item.myId != MyId.id ? 'you' : "other"}>
                            {console.log(item)}
                            <div>
                                <ScrollToBottom className='message-container'>
                                    <div className='message-content'>
                                        <p>
                                            {item.message}
                                        </p>
                                    </div>
                                </ScrollToBottom>
                            </div>
                        </div>
                    )
                    )
                }
            </div>
            <div className="chat-footer">
                <input type='text'
                    onChange={e => setCurrentMessage(e.target.value)}
                    placeholder='type Message...' />

                <button onClick={sendMessage}>
                    &#9658;
                </button>
            </div>

        </div>
    )
}

export default ChatRoom
