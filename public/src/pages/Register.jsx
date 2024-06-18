import Reactdiv, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOption = {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, email, username } = values;

      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOption);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("Password does not match.", toastOption);
      return false;
    } else if (username.length < 3) {
      toast.error("Username must be at least 3 characters long.", toastOption);
      return false;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.", toastOption);
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="" />
            <h1>CHITCHAT</h1>
          </div>
          <input
            type="text"
            name="username"
            onChange={(e) => handleChange(e)}
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            onChange={(e) => handleChange(e)}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
            placeholder="Password"
          />
          <input
            type="password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
            placeholder="Confirm Password"
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ?<Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  weight: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #28527a;
  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 7rem;
    }
    h1 {
      color: #fff;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    background-color: #080420;
    padding: 3rem 5rem;
    border-radius: 2rem;
    input {
      padding: 1rem;
      background: transparent;
      color: #fff;
      font-size: 1rem;
      border-radius: 0.4rem;
      width: 100%;
    }
    button {
      background-color: #444444;
      color: #dddddd;
      border: none;
      padding: 1rem 2rem;
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
      text-transform: uppercase;
      font-weight: bold;
      transition: background-color 0.3s, color 0.3s;
      &:hover {
        background-color: #555555;
      }
    }
    span {
      color: #fff;
      text-transform: uppercase;
      a {
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 700;
      }
    }
  }
`;

export default Register;
