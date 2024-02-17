import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBox from './SideBox';
import MainBox from './MainBox';
import userContext from '../Context/usercontext';


const Chats = () => {
  const navigate = useNavigate()
  const context = useContext(userContext);
  const { fetchDetails } = context;
  // console.log(user);
  useEffect(() => {
    fetchDetails();
    // getAllChats();
    // console.log(chats);
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, []);
  // console.log(user)
  return (
    <div>
      {/* <Navbar /> */}
      <div className='d-flex justify-content-center vh-100 vw-100 p-3' style={{ overflow: "cover", backgroundColor: "rgb(33,37,41)" }}>
        <div className='vw-100 sidebox'>

          <SideBox />

        </div>
        <div className='vw-100 mainbox'>
          <MainBox />
        </div>
      </div>
    </div>
  );
}

export default Chats;
