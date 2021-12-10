import React, { useContext, useState } from 'react'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import './style.css'


import swal from 'sweetalert';
import instance from '../../Provider/index'

import AppContext from '../../Context';

const socket = new io.connect('http://localhost:3001')

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const context = useContext(AppContext)


    let navigate = useNavigate()

    const submitForm = async () => {
        if (email !== "" && password !== "") {
            const formDetail = {
                email: email,
                password: password,
            }

            await instance.post('/api/login', formDetail)
                .then(function (response) {

                    if (response.data.user.status === 'approved') {
                        context.setUserdata(response.data.user)
                        socket.emit('login', { userId: response.data.user.id });
                        swal('access granted')
                        navigate('/UserList')
                    }
                    else {
                        swal('Waiting for Approval')
                    }

                })
                .catch(function (error) {
                    console.log('catch -->', error);
                    swal('Please type Correct E-mail and Password')
                });

        }
    }

    return (

        <div className='container'>
            <h1>Sign up page</h1>
            <div className="input-div">
                <input
                    type="email"
                    placeholder="E-mail"
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />
                {/* <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={e => setconfirmPassword(e.target.value)}
                /> */}
                <button onClick={submitForm} >
                    {/* <Link className='button' to='/UserList'> */}
                    Submit
                    {/* </Link> */}
                </button>
            </div>
        </div>
    )
}

export default SignIn
