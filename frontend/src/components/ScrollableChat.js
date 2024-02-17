import React, { useContext } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import userContext from '../Context/usercontext';

const ScrollableChat = ({messages}) => {

       
    const context = useContext(userContext);
    const { user } = context;

    // console.log(user.id)
    const isSameSender = (messages, m, i, userId) =>{
        return (
            i < messages.length -1 &&
            (messages[i+1].sender._id !== m.sender._id ||
                messages[i+1].sender._id === undefined) &&
                messages[i].sender._id !== userId
        );
    }

    const isLastMessage = (messages, i, userId) =>{
        return (
            i === messages.length - 1 &&
            messages[messages.length - 1].sender._id !== userId &&
            messages[messages.length - 1].sender._id
        );
    }

    const isSameSenderMargin = (messages, m, i, userId) =>{
        if(
            i < messages.length - 1 &&
            messages[i+1].sender._id === m.sender._id &&
            messages[i].sender._id !== userId
        )
            return 33;
        else if (
            (i < messages.length - 1 &&
                messages[i+1].sender._id !== m.sender._id &&
                messages[i].sender._id !== userId) ||
                (i === messages.length - 1 && messages[i].sender._id !== userId)
            )
            return 0;
        else return "auto";
    }

    const isSameUser = (messages, m, i) =>{
        return i > 0 && messages[i-1].sender._id === m.sender._id;
    }

  return (
    <ScrollableFeed>
      {messages && messages.map((m, i)=>(
        <div style={{display:"flex"}} key={m._id}>
            
                {(isSameSender(messages, m, i, user.id) ||
                    isLastMessage(messages, i, user.id)
                ) && (
                    <div>
                        <img src={m.sender.pic} alt='DP' height={"35px"} width={"35px"} style={{ borderRadius: "50%" }} />
                    </div>
                )}
                <span style={{
                    backgroundColor: `${
                        m.sender._id === user.id ? "#BEE3F8" : "#B9F5D0"
                    }`,
                    borderRadius:"20px",
                    padding:"5px 15px",
                    maxWidth:"75%",
                    marginLeft:isSameSenderMargin(messages, m, i, user.id),
                    marginTop:isSameUser(messages, m, i, user.id)? 3: 3,
                }}>
                    {m.content}
                </span>
            
        </div>
      ))}
    </ScrollableFeed>
  );
}

export default ScrollableChat;
