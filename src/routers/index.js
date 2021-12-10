import React from "react";



import {
    Route,
    Routes,
} from "react-router-dom";
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import UserList from '../pages/UserList'
import ChatRoom from '../pages/ChatRoom'
import Admin from '../pages/admin'
import OnCallPage from "../pages/OnCall";



const index = () => {
    return (

        <Routes>
            <Route path="/" element={< SignUp />}>
            </Route>
            <Route path="/SignIn" element={<SignIn />}>
            </Route>
            <Route path="/UserList" element={<UserList />}>
            </Route>
            <Route path="/chatRoom" element={<ChatRoom />}>
            </Route>
            <Route path="/chatRoom/OnCall" element={<OnCallPage />}>
            </Route>
            <Route path="/Admin" element={<Admin />} />
        </Routes>

    );
};

export default index;