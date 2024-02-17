import { useState } from "react";
import UserContext from './usercontext'

const UserState = (props) =>{
    const iniuser = {name:"", email:"", pic:"", id:""}
    const chatsInitial = []
    const [chats, setChats] = useState(chatsInitial);
    const [user, setUser] = useState(iniuser);
    const [SelctedChat, setSelctedChat] = useState();
    const [notification, setNotification] = useState([]);

    const stateSetter = (user)=>{
        setUser(user);
        // console.log(user); 
    }

    const chatSetter = (chat)=>{
      setChats(chat);
      console.log(chats);
    }

    const getAllChats = async() => {
      //TODO: API call
      let token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/chats`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const json = await response.json();
        // console.log(json);
        return json;
        // setChats(chats);
      };

    const fetchDetails = async() =>{
      let token = localStorage.getItem('token');
      var requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await fetch(`http://localhost:5000/api/user/info`,
            requestOptions,
          );

          const json = await response.json();
          // console.log(json)
          stateSetter({name:json.name, email:json.email, pic:json.pic, id:json._id});
          // console.log(json);
    }

    const searchUsers = async(query) =>{
      let token = localStorage.getItem('token');
      var requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await fetch(`http://localhost:5000/api/user?search=${query}`,
            requestOptions,
          );

          const json = await response.json();
          return json;
    }

    return (
        <UserContext.Provider value={{ user, stateSetter, fetchDetails, getAllChats, searchUsers, chats, SelctedChat, setSelctedChat, chatSetter, notification, setNotification }}>
          {props.children}
        </UserContext.Provider>
      );
}

export default UserState;

