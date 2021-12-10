import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import './style.css'

import { useNavigate } from 'react-router-dom'

import instance from '../../Provider'
import AppContext from '../../Context';

const socket = new io.connect('http://localhost:3001')

const UserList = () => {
    const [data, setData] = useState()
    const [onLine, setOnLine] = useState()

    const context = useContext(AppContext)

    let navigate = useNavigate()

    const chatFun = (item) => {
        context.setSelectedUserid(item.id)
        context.setSelectedUserName(item.name)
        navigate('/ChatRoom')
    }

    useEffect(() => {
        socket.on('user_online', (data) => {
            console.log('online user----> ', data)
            setOnLine(data)
        })
        instance.get('api/allusers')
            .then((res) => {
                setData(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log('-> userlist err', err)
            })

    }, [])

    return (
        <div>
            <div className="userlist-Header">
                <div className='item'>
                    Name
                </div>
                <div className='item'>
                    E-mail
                </div>
                <div className='item'>
                    Status
                </div>
                {/* <div>
                    Gender
                </div> */}
                <div className='item'>
                    Action
                </div>
            </div>

            <div className="UserData">
                {
                    data?.map((item, index) => {
                        return <div className="sub-data" key={index}>
                            <div className='item'>
                                {item.name}
                                {onLine === item.id ? <p>online</p> : <p>offline</p>}
                            </div>
                            <div className='item'>
                                {item.email}
                            </div>
                            <div className='item'>
                                {item.status}
                            </div>
                            <div className='item'>
                                <button onClick={() => chatFun(item)}>
                                    Chat
                                </button>
                            </div>
                        </div>
                    })
                }
            </div>

        </div >
    )
}

export default UserList
