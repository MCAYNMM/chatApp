import React, {useState, useEffect} from 'react';
import Picker from 'emoji-picker-react';
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import styled from 'styled-components';

const ChatInput = ({handleSendMsg}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [message, setMessage] = useState('');
    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }
    const handleEmojiClick = (emoji, event) => {
        
        let msg = message;
        msg += emoji.emoji;
        setMessage(msg);
    }
    const sendChat = (event) => {
        event.preventDefault();
        if(message.length > 0){
            handleSendMsg(message);
            setMessage('');
        }
    }
    return (
      <Container>
        <div className="button-container">
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
            {showEmojiPicker && (
              <Picker onEmojiClick={handleEmojiClick} className="picker" />
            )}
          </div>
        </div>
        <form className="input-container" onSubmit={e => sendChat(e)}>
          <input
            type="text"
            placeholder="type your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="submit">
            <IoMdSend />
          </button>
        </form>
      </Container>
    );
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;

    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .picker {
        position: absolute;
        bottom: 3rem; /* Đặt picker phía trên biểu tượng emoji */
        left: 0;
        z-index: 10;
        width: 200px; /* Chiều rộng của picker */
        height: 250px; /* Chiều cao của picker */
        .emoji-picker-react {
          width: 50%;
          height: 50%;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    align-content: center;
    gap: 2rem;
    display: flex;
    background-color: #ffffff34;
    input {
      width: 90%;
      background-color: transparent;
      border-radius: 2rem;
      padding-left: 1rem;
      font-size: 1.2rem;
      border: none;
      color: white;
      &::selection {
        background-color: #9186f3;
        outline: none;
        border: none;
      }
      &:focus {
        outline: none;
        border: none;
      }
    }
    button {
      width: 10%;
      padding: 0.3rem 2rem;
      font-size: 2rem;
      border-radius: 1.2rem;
      display: flex;
      align-items: center;
      svg {
        font-size: 2rem;
      }
    }
  }
`;
export default ChatInput;
