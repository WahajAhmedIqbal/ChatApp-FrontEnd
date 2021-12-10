import { useState } from 'react';
import Router from "./routers";
import { BrowserRouter } from 'react-router-dom';
import './App.css';
// import io from 'socket.io-client'
import AppContext from './Context';



// const socket = io.connect('http://localhost:3001')

function App() {
  const [userdata, setUserdata] = useState(null)
  const [selectedUserid, setSelectedUserid] = useState(null)
  const [selectedUserName, setSelectedUserName] = useState(null)

  const userDetails = {
    userdata: userdata,
    selectedUserid: selectedUserid,
    selectedUserName: selectedUserName,
    setUserdata,
    setSelectedUserid,
    setSelectedUserName,
  }

  return (
    <AppContext.Provider value={userDetails}>
      <BrowserRouter>
        <div className="App">
          <Router />
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
