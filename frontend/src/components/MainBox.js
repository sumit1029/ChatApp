import React, { useContext, useEffect, useState } from 'react';
import MainShortNav from './MainShortNav';
import userContext from '../Context/usercontext';
import ScrollableChat from './ScrollableChat';
import { io } from 'socket.io-client';
import logo from '../animations/typing.gif'

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const MainBox = () => {
  const [active, setActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const context = useContext(userContext);
  const { SelctedChat, user, notification, setNotification } = context;

  const getSenderName = (logedUser, users) => {
    return users[0]._id === logedUser.id ? users[1].name : users[0].name;
  }

  const getSenderPic = (logedUser, users) => {
    return users[0]._id === logedUser.id ? users[1].pic : users[0].pic;
  }

  const fetchMessages = async () => {
    let token = localStorage.getItem('token')
    setLoading(true);
    if (!SelctedChat) return;

    try {

      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await fetch(`http://localhost:5000/api/message/${SelctedChat._id}`, config);
      const json = response.json();
      json.then(value => {
        setMessages(value);
        // console.log(value)
      })

      socket.emit('join chat', SelctedChat._id)
      setLoading(false);

    } catch (error) {
      console.log(error.message)
    }
  }

  const sendMessage = async (event) => {
    let token = localStorage.getItem('token')

    if (event.key === "Enter" && newMessage) {
      socket.emit('stop typing', SelctedChat._id)
      try {
        const config = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: newMessage,
            chatId: SelctedChat._id,
          }),

        }
        setNewMessage("");
        const response = await fetch("http://localhost:5000/api/message", config);
        const json = response.json();
        json.then(value => {
          // console.log(value)
          socket.emit('new message', value)
          setMessages([...messages, value])
        })
        setMessages(messages)


      } catch (error) {
        console.log("Failed to send the message");
        console.log(error.message);
      }
    }
  }

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', SelctedChat._id)
    }
    let lastTypingTime = new Date().getTime()
    var timeLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timeLength && typing) {
        socket.emit('stop typing', SelctedChat._id);
        setTyping(false);
      }
    }, timeLength);
  }

  useEffect(() => {
    if (SelctedChat) {
      setActive(true)
      fetchMessages()
      selectedChatCompare = SelctedChat;
    }

  }, [SelctedChat]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true))
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));

  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification])
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
      setMessages([...messages, newMessageRecieved]);

    })

    
    // console.log(notification)
  });

  return (
    <>
      {active ? loading ?
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <MainShortNav name={SelctedChat.chatName} sender={!SelctedChat.isGroupchat ? getSenderName(user, SelctedChat.users) : SelctedChat.chatName} pic={!SelctedChat.isGroupchat ? getSenderPic(user, SelctedChat.users) : 'https://aws-file.imgcreator.ai/yuan-image/ImgCreator/d03d99bfc12948dbbe9cbd928e2b36d4/hq/b1c8bfce-a477-11ed-b8d3-0242ac110003_1.webp'} />
          </div>
          <div style={{ backgroundImage: "url(\"https://www.shutterstock.com/shutterstock/photos/1660950727/display_1500/stock-vector-social-media-sketch-vector-seamless-doodle-pattern-1660950727.jpg\")", height: "78vh", backgroundRepeat: "no-repeat", objectFit: "fill", width: "70vw", borderLeft: "2px solid white" }}>
            <div className="d-flex justify-content-center align-items-center" style={{height:"100%"}}>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
          <div className='navbar navbar-expand-lg p-2' style={{ backgroundColor: "#313539", zIndex: "0", position: "absolute", marginBottom: "24px", bottom: "0px", width: "70vw", height: "8vh" }}>
            <div className='container-fluid'>
              <div>
                <input placeholder="Enter Your text" type='text' style={{ width: "67vw", backgroundColor: "grey", color: "white" }} onKeyDown={sendMessage} onChange={typingHandler} value={newMessage} />
              </div>
            </div>
          </div>
        </div>
        
        : <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <MainShortNav name={SelctedChat.chatName} sender={!SelctedChat.isGroupchat ? getSenderName(user, SelctedChat.users) : SelctedChat.chatName} pic={!SelctedChat.isGroupchat ? getSenderPic(user, SelctedChat.users) : 'https://i.pinimg.com/564x/da/cc/2a/dacc2a44063da72422877b28ccd7e350.jpg'} />
          </div>
          <div style={{ backgroundImage: "url(\"https://www.shutterstock.com/shutterstock/photos/1660950727/display_1500/stock-vector-social-media-sketch-vector-seamless-doodle-pattern-1660950727.jpg\")", height: "78vh", backgroundRepeat: "no-repeat", objectFit: "fill", width: "70vw", borderLeft: "2px solid white" }}>
            <div style={{ display: "flex", overflowY: "scroll", flexDirection: "column", scrollbarWidth: "none", height: "77vh" }}>
              <ScrollableChat messages={messages} />
              {isTyping ? <div><img src={logo} alt='DP'></img></div> : <></>}
            </div>
          </div>

          <div className='navbar navbar-expand-lg p-2' style={{ backgroundColor: "#313539", zIndex: "0", position: "absolute", marginBottom: "24px", bottom: "0px", width: "70vw", height: "8vh" }}>
            <div className='container-fluid'>
              <div>
                <input placeholder="Enter Your text" type='text' style={{ width: "67vw", backgroundColor: "grey", color: "white" }} onKeyDown={sendMessage} onChange={typingHandler} value={newMessage} />
              </div>
            </div>
          </div>
        </div> : <div className='startimg' style={{ backgroundImage: "url(\"https://thumbs.dreamstime.com/z/funny-endless-hand-drawn-background-cute-frog-crocodile-dots-cool-vector-illustration-kids-babies-fashion-fabric-flat-213724748.jpg\")", backgroundRepeat: "no-repeat", objectFit: "fill", borderLeft: "2px solid white" }}></div>}
    </>
  );
}

export default MainBox;
