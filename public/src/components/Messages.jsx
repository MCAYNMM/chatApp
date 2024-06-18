import React from 'react';
import styled from 'styled-components';



const Messages = ({messages, scrollRef}) => {

    return (
        <Container>
            
                {messages.map((message,index) => {
                    return (
                      <div
                        key={index}
                        ref={scrollRef}
                        className={`message ${
                          message.fromSelf ? " sender" : " reciever"
                        }`}
                      >
                        <div className="content">
                          <p>{message.message}</p>
                        </div>
                      </div>
                    );
                })}
        </Container>
    );
}

const Container = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .message {
    display: flex;
    align-items: center;
    border-radius: 2rem;
    .content {
      max-width: 40%;
      font-size: 1.1rem;
      padding: 0.8rem;
      border-radius: 1rem;
    }
  }
  .sender {
    justify-content: flex-end;
    .content {
      background-color: #4f04ff21;
    }
  }
  .reciever {
    justify-content: flex-start;
    .content {
      background-color: #4f04ff21;
    }
  }
`;

export default Messages;
