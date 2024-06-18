import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

export default function Contacts ({contacts, currentUser, changeChat, onlineUsers}) {
    const[currentUserName, setCurrentUserName] = useState(undefined);
    const[currentUserImage, setCurrentUserImage] = useState(undefined);
    const[currentSelected,  setCurrentSelected] = useState(undefined);
    const navigate = useNavigate();
    useEffect(() =>{
        if(currentUser){
            setCurrentUserName(currentUser.username);
            setCurrentUserImage(currentUser.avatarImage);
        }
    }, [currentUser]);
    const changeCurentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }
    return (
      <>
        {currentUserName && currentUserImage && (
          <Container>
            <div className="brand">
              <img onClick={() => navigate('/createPost')} src={Logo} alt="logo" />
              <h3>CHITCHAT</h3>
            </div>
            <div className="contacts">
              {contacts.map((contact, index) => {
                return (
                  <div
                    className={`contact ${
                      index === currentSelected ? " selected" : ""
                    } `}
                    onClick={() => changeCurentChat(index, contact)}
                    key={index}
                  >
                    <div
                      className="avatar"
                      onClick={() => {
                        navigate(`/posts/${contact._id}`);
                      }}
                    >
                      <img
                        key={index}
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt="img"
                      />
                      {onlineUsers.includes(contact._id) && (
                        <span className="status online"></span>
                      )}
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="current-user">
              <div
                className="avatar"
                onClick={() => {
                  navigate(`/posts/${currentUser._id}`);
                }}
              >
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="img"
                  onClick={() => navigate('/posts/${currentUser._id}')}
                />
                {onlineUsers.includes(currentUser._id) && (
                  <span className="status online"></span>
                )}
              </div>
              <div className="username">
                <h2>{currentUserName}</h2>
              </div>
            </div>
          </Container>
        )}
      </>
    );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #1e2a38;
  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 2rem;
      cursor:pointer;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #2a3b4c;
      min-height: 5rem;
      cursor: pointer;
      border-radius: 0.2rem;
      width: 90%;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .avatar {
        position: relative;
        img {
          height: 3rem;
          &:hover {
            transform: scale(1.05);
          }
          &:active {
            transform: scale(0.9);
          }
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
    .selected {
      background-color: #4c6f8c;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      position: relative;
      img {
        height: 4rem;
        max-inline-size: 100%;
        cursor: pointer;
        &:hover {
          transform: scale(1.05);
        }
        &:active {
          transform: scale(0.9);
        }
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
    }
    .username {
    }
  }
`;

