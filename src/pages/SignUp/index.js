import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

import swal from 'sweetalert';
import instance from '../../Provider/index'


const SignUp = ({ socket }) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")


    let navigate = useNavigate()

    const submitForm = async () => {
        if (firstName !== "" && lastName !== "" && email !== "" && password !== "") {
            const formDetails = {
                name: firstName + " " + lastName,
                // lastName,
                email: email,
                password: password
            }



            await instance.post('/api/creatUser', formDetails)
                .then(function (response) {
                    console.log('then -->', response);
                    swal('Waiting for Approval')
                })
                .catch(function (error) {
                    console.log('catch -->', error);
                });

            //     await socket.emit('sign_Up', formDetails)
            // console.log('function work', formDetails)
            navigate('/SignIn')
        }
    }

    return (
        <div className='container'>
            <h1>Sign up page</h1>
            <div className="input-div">
                <input
                    type="text"
                    placeholder="First Name"
                    onChange={e => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="last Name"
                    onChange={e => setLastName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    onChange={e => setEmail(e.target.value)}
                />
                {/* <input
                    type="tel"
                    placeholder="Phone"
                    onChange={e => setPhoneNumber(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Gender"
                    onChange={e => setGender(e.target.value)}
                /> */}
                <input
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />
                <button onClick={submitForm}>
                    {/* <Link className='button' to='/SignIn'> */}
                    Submit
                    {/* </Link> */}
                </button>
            </div>
        </div>
    )
}

export default SignUp
