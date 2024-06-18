import React from 'react';
import styled from 'styled-components';
import Chicken from "../assets/chicken.gif";

const Welcome = ({currentUser}) => {
    return (
      <Container>
        <img
          src={Chicken}
          alt=""
        />
        <h2>Gà đang chờ! Nhấn để trò chuyện ngay bây giờ!</h2>
      </Container>
    );
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
justify-content: center;
flex-direction: column;
img{
    height: 20rem;
}
span{
    color: #4e00ff;
}
`;

export default Welcome;
