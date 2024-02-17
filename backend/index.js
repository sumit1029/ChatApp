const express = require('express');
const connectToMongo = require('./config/db');
const dotenv = require('dotenv')
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
var cors = require('cors');
const { Socket } = require('socket.io');
const path = require('path')

dotenv.config();
connectToMongo();
const app = express();
app.use(cors());
app.use(express.json());



app.use('/api/user', userRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api/message', messageRoutes)

// -------------------------------------------- // Deployment // --------------------------------------------------------------

const __dirname1 = path.resolve()
console.log(__dirname1)
if(process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(__dirname1, '/frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1,  'frontend', 'build', 'index.html'));
    })

}else{
    app.get("/", (req, res)=>{
        res.send("API is running successfully");
    })
}


// -------------------------------------------- // Deployment // --------------------------------------------------------------

const PORT = process.env.PORT || 5000 
const server = app.listen(PORT, console.log("Server started on port 5000"));

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors:{
        origin:"https://chit-chat-q2nn.onrender.com/",
    },
})

io.on("connection", (socket)=>{
    console.log("connected to socket.io")

    socket.on('setup', (userData) =>{
        socket.join(userData.id);
        socket.emit('connected') 
    });

    socket.on('join chat', (room)=>{
        socket.join(room);
        console.log('User joined room = '+room);
    });

    socket.on('typing', (room)=>socket.in(room).emit("typing"));
    socket.on('stop typing', (room)=>socket.in(room).emit("stop typing"));

    socket.on('new message', (newMessageRecieved)=>{
        var chat = newMessageRecieved.chat;
        if(!chat.users) return console.log('chat.users not defined');

        chat.users.forEach(user => {
            if(user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    })
})
