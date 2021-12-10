import React, { useEffect, useState } from 'react'
import './style.css'

import instance from '../../Provider/index'


const Admin = () => {

    const [userList, setuserList] = useState()

    const statusupdate = async (item) => {
        const statusAprooved = {
            email: item.email
            , status: 'approved'
        }

        await instance.post('/api/edituser', statusAprooved)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log('--> err', err)
            })

    }

    useEffect(() => {
        instance.get('api/allusers')
            .then(function (response) {
                console.log('then -->', response.data);
                setuserList(response.data)
            })
            .catch(function (error) {
                console.log('catch -->', error);
            });
    }, [])

    return (
        <div>
            <div className="ListHeader">
                <div>
                    <h3>
                        Name
                    </h3>
                </div>
                <div>
                    <h3>
                        E-mail
                    </h3>
                </div>
                <div>
                    <h3>
                        Status
                    </h3>
                </div>
                <div>
                    <h3>
                        Action
                    </h3>
                </div>

            </div>
            <div>
                {userList.map(item => (
                    <div key={item.id} className="ListHeader">
                        <div>
                            <h5>
                                {item.name}
                            </h5>
                        </div>
                        <div>
                            <h5>
                                {item.email}
                            </h5>
                        </div>
                        <div className={item.status === 'approved' ? "app" : "pand"}>
                            <h5>
                                {item.status}
                            </h5>
                        </div>
                        <div>

                            <button disabled={item.status === 'approved' ? true : false} onClick={() => statusupdate(item)}>
                                update
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Admin
