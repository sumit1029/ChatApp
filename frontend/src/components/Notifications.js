import React, { useContext } from 'react';
import userContext from '../Context/usercontext';

const Notifications = () => {

    const context = useContext(userContext);
    const { notification } = context;
  return (
    <div>
       
      <div onClick={()=>{}} className='d-flex mt-3'>
            {!notification.length && "No new message"}
            
        </div>
        <hr className='line'></hr>
    
    </div>
    
       
  );
}

export default Notifications;
