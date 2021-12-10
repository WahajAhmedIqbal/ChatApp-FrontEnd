import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import Image from '../../assets/images.png'

import { useNavigate } from 'react-router-dom'

import instance from '../../Provider'
import AppContext from '../../Context';

import io from 'socket.io-client'
const socket = new io.connect('http://localhost:3001')

const UserList = () => {
    const [data, setData] = useState()

    const context = useContext(AppContext)

    let navigate = useNavigate()


    useEffect(() => {
        instance.get('api/allusers')
            .then((res) => {
                setData(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log('-> userlist err', err)
            })
        socket.on('login', (data) => {
            console.log('receive data', data)
        })
    }, [instance])

    const chatFun = (item) => {
        context.setSelectedUserid(item.id)
        context.setSelectedUserName(item.name)
        navigate('/ChatRoom')
    }

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
                    // data.map((item, index) => {
                    //     return <div className="sub-data" key={index}>
                    //         <div className='item'>
                    //             {item.name}
                    //         </div>
                    //         <div className='item'>
                    //             {item.email}
                    //         </div>
                    //         <div className='item'>
                    //             {item.status}
                    //         </div>
                    //         <div className='item'>
                    //             <button onClick={() => chatFun(item)}>
                    //                 Chat
                    //             </button>
                    //         </div>
                    //     </div>
                    // })
                }
            </div>

        </div >
    )
}

export default UserList
