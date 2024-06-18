const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const postRoute = require('./routes/postRoutes');
const socket = require('socket.io');
var bodyParser = require("body-parser");


const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/auth', userRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/posts", postRoute);


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("connected to db"); 
}).catch(err => console.log(err));


const sever = app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});

const io = socket(sever,{
  cors:{
    origin:"http://localhost:3000",
    credentials: true
  }
})

global.onlineUsers = new Map();

io.on("connection",(socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);

    io.emit("online-user", Array.from(onlineUsers.keys()));
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if(sendUserSocket){
      socket.to(sendUserSocket).emit("msg-recieve",data.message)
    }
  })

  socket.on("disconnect", () => {
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        io.emit("online-user", Array.from(onlineUsers.keys()));
        break;
      }
    }
  });
})