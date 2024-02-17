import React, { useContext, useEffect, useState } from 'react';
import SideChats from './SideChats';
import SideDrawer from './SideDrawer';
import userContext from '../Context/usercontext';
import SideShortNav from './SideShortNav';

const SideBox = () => {

  const context = useContext(userContext);
  const { user, getAllChats, setSelctedChat } = context;
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState(chat);

  // chatSetter(chat)

  const getSenderName = (logedUser, users)=>{
    return users[0]._id === logedUser.id? users[1].name:users[0].name;
  }

  const getSenderPic = (logedUser, users)=>{
    return users[0]._id === logedUser.id? users[1].pic:users[0].pic;
  }

  // eslint-disable-next-line
  const fetchChats = () => {
    setLoading(true);
    let data = getAllChats();

    data.then(value => {
      setChat(value);
      // console.log(value[0].latestMessage.content)
      // console.log(value)
    })
    setLoading(false);
    // console.log(c)
    // setChat(c);
  }

  // eslint-disable-next-line
  useEffect(() => {
    // eslint-disable-next-line
    fetchChats();
    // console.log(chat)
    // console.log(user.id)
  }, [chat]);
  // console.log(chat)

  const handleOnClick = (data) =>{
    setSelctedChat(data);
  }
  
  return (
    <div>
      <div><SideShortNav user={user}/></div>
    <div style={{ backgroundColor: "rgb(33,37,41)", height: "87vh", overflowY: "scroll", border: "3px solid black", width: "28vw" }} className='p-0'>
      <SideDrawer />
      
      <div className='mt-5 card w-60 p-3' style={{ backgroundColor: "rgb(33,37,41)", zIndex: "0" }}>
      
        {
          
          loading?<div><p>loading....</p></div>:(chat?.map(data => (
            <SideChats key={data._id} sender={!data.isGroupchat?getSenderName(user, data.users):data.chatName} pic={!data.isGroupchat?getSenderPic(user, data.users):'https://i.pinimg.com/564x/da/cc/2a/dacc2a44063da72422877b28ccd7e350.jpg'} data={data} onclick={()=>handleOnClick(data)} latest={data.latestMessage?data.latestMessage.content.length>20?data.latestMessage.content.slice(0, 20)+"...":data.latestMessage.content:""}/>
          )))

        }
        {/* <SideChats /> */}

      </div>
    </div>
    </div>
  );
}

export default SideBox;
