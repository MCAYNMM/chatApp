import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { sendMessagesRoute, getAllMessagesRoute } from "../utils/APIRoutes";
import axios from "axios";


const ChatContainer = ({ currentChat, currentUser, socket, onlineUsers }) => {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
      
    const scrollRef = useRef();
    useEffect(() => {
        const fetchData = async () => {
            if(currentChat){

                const response = await axios.post(getAllMessagesRoute, {
                  from: currentUser._id,
                  to: currentChat._id,
                });
                setMessages(response.data);
            }
        };
       
        fetchData();
    },[currentChat]);
    const handleSendMsg = async(msg) => {
    const { data } = await axios.post(sendMessagesRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg
    });
    socket.current.emit("send-msg",{
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({fromSelf: true, message: msg});
    setMessages(msgs);
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket.current]);
  


  useEffect(() => {
    if(arrivalMessage){
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  },[arrivalMessage]);


  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"});
  },[messages]);



  return (
    currentChat && (
      <Container>
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                alt="img"
              />
              {onlineUsers.includes(currentChat._id) && (
                <span className="status online"></span>
              )}
            </div>
            <div className="username">
              <h3>{currentChat.username}</h3>
            </div>
          </div>
          <Logout />
        </div>
        <Messages scrollRef={scrollRef} messages={messages} />
        <ChatInput handleSendMsg={handleSendMsg} />
      </Container>
    )
  );
};

const Container = styled.div`
  padding: 1rem 1rem 1rem 0;
  display: grid;
  overflow: hidden;
  grid-template-rows: 10% 78% 12%;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-details {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: center;
      .avatar {
       position:relative;
        img {
          height: 3rem;
        }
          .status {
          position: absolute;
          bottom: 0;
          right: 0;
          height: 1rem;
          width: 1rem;
          border-radius: 50%;
          border: 2px solid white;
          &.online {
            background-color: green;
          }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
`;

export default ChatContainer;
