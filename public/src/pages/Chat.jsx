import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts.jsx";
import Welcome from "../components/Welcome.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import {io} from "socket.io-client";
import {host} from "../utils/APIRoutes.js"

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [currentChat, setCurrentChat] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    }
  }, []);
  useEffect(() => {
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser]);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (!currentUser.isAvatarImage) {
          navigate("/setAvatar");
        } else {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
          setIsLoaded(true);
          console.log(data.data);
        }
      }
    })();
  }, [currentUser]);

  

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
    useEffect(() => {
      if (socket.current) {
        socket.current.on("online-user", (online) => {
          setOnlineUsers(online);
          console.log(onlineUsers);
        });
      }
       
    }, [socket.current]);

  return (
    <Container>
      <div className="container">
        {onlineUsers && contacts && (
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
            onlineUsers={onlineUsers}
          />
        )}

        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
            onlineUsers={onlineUsers}
          />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #28527a;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
