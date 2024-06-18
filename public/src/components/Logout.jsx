import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi"

const Logout = () => {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.clear("chat-app-user");
        navigate("/login");
    };
    return (
        <Button onClick={handleClick}>
            <BiPowerOff/>
        </Button>
    );
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    background-color: #9a86f3;
    svg{
        font-size: 1.3rem;
        color: white;
    }
`

export default Logout;
