import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer/";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import Loader from "../assets/loader.gif";

const SetAvatar = () => {
  const [avatars, setAvatars] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const api = "https://api.multiavatar.com/45678945";
  const api1 = "https://api.multiavatar.com/Starcrasher.png";
  const navigate = useNavigate();
  const toastOption = {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOption);
    } 
    else {
      const user = JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      console.log(
        await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        }),
        "-axios consoleeeeeeeee"
      );
      console.log(avatars[selectedAvatar], ": imgggggggggggggg");

      if (data.isSet) {
        user.avatarImage = data.image;
        user.isAvatarImage = true;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again", toastOption);
      }
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  });
  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        try {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        } catch (err) {
          console.error("error fetching data", err);
        }
      }
      setAvatars(data);
      setLoading(false);
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Container>
          <div className="loading">
            <img src={Loader} alt="" />
            <p>Loading...</p>
          </div>
        </Container>
      ) : (
        <Container>
          <div className="container">
            <div className="title-container">
              <h1>Pick an avartar as your profile picture</h1>
            </div>
            <div className="avatars">
              {avatars &&
                avatars.map((avatar, index) => {
                  return (
                    <div
                      className={`avatar ${
                        selectedAvatar === index && "selected"
                      }`}
                    >
                      <img
                        key={index}
                        src={`data:image/svg+xml;base64,${avatar}`}
                        onClick={() => setSelectedAvatar(index)}
                        alt="img"
                      />
                    </div>
                  );
                })}
            </div>
            <button
              className="submit-avt"
              onClick={setProfilePicture}
              type="submit"
            >
              SET AS PROFILE PICTURE
            </button>
          </div>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #28527a;
  color: #333; /* Màu chữ tối để tương phản */
  gap: 2rem;

  .loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 3rem;
    }
    p {
      font-size: 1.5rem;
      text-transform: uppercase;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.71);
    }
  }

  .container {
    background-color: #080420;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: flex;
    gap: 2rem;
    padding: 2rem 3rem;
    border-radius: 1rem;
  }
  .title-container {
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.4s;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.5rem solid #28527a; 
    }
  }
  .submit-avt {
    background-color: #4caf50;
    color: #333;
    padding: 1rem 2rem;
    transition: 0.5s ease-in-out;
    border-radius: 0.5rem;
    border: transparent 0px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
      background-color: #388e3c;
    }
  }
`;

export default SetAvatar;
