import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import Chats from './components/Chats';
import Signup from './components/Signup';
import Login from './components/Login';
import UserState from './Context/UserState';


function App() {
  return (
    <div>
      <UserState>
       <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/chats" element={<Chats />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/login" element={<Login />} />


       </Routes>
       </UserState>
    </div>
  );
}

export default App;
