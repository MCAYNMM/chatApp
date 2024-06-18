import Reactdiv, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createPostRoute, uploadRoute } from "../utils/APIRoutes";
import axios from "axios";

const CreatePost = () => {
      const [title, setTitle] = useState("");
      const [content, setContent] = useState("");
      const [media, setMedia] = useState(null);
      const userData = localStorage.getItem("chat-app-user");
      const userId = JSON.parse(userData)._id;
      const navigate = useNavigate();

      
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: title,
      content : content,
      media : media,
      author: userId,
    };


    try{
      const response = await axios.post(createPostRoute,formData);
      console.log("Post created:", response.data);
    }
    catch(err){
       console.error("Error creating post:", err);
    }
    setTitle(''); setContent(''); setMedia(null);
  };


    const handleMediaUpload = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("media", file);

      try {
        const response = await axios.post(uploadRoute, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("File uploaded:", response.data);
        setMedia(response.data.filePath);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
      
    };

    useEffect(() => {
      if (!userId) {
        navigate("/");
      }
    }, []);
  return (
    <Container>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="brand">
          <img src={Logo} onClick={() => navigate('/')} alt="" />
          <h1>ĐĂNG BÀI VIẾT MỚI</h1>
        </div>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề"
          required
          value={title}
        />
        <textarea
          placeholder="Nội dung"
          onChange={(e) => setContent(e.target.value)}
          required
          value={content}
        ></textarea>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => handleMediaUpload(e)}
        />
        <button type="submit">Đăng bài</button>
        <span>
          SEE STORY !<Link to={`/posts/:${userId}`}> STORY HERE!</Link>
        </span>
      </form>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  weight: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #1e2a38;
  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 7rem;
    }
    h1 {
      color: #80deea;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    background-color: #263238;
    padding: 3rem 5rem;
    border-radius: 2rem;
    input,
    textarea {
      padding: 1rem;
      background: transparent;
      color: #80deea;
      font-size: 1rem;
      border: 2px solid #80deea;
      border-radius: 0.4rem;
      width: 100%;
    }
    textarea {
      width: 100%;
      max-width: 600px;
      height: 150px;
      padding: 10px;
      background: transparent;
      color: #fff;
      resize: vertical; /* Cho phép người dùng thay đổi chiều cao */
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12),
        0 1px 2px rgba(0, 0, 0, 0.24);
      transition: all 0.3s ease;
    }
    button {
      background-color: #00796b;
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
        background-color: #004d40;
      }
    }
    span {
      color: #80deea;
      text-transform: uppercase;
      a {
        color: #26a69a;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 700;
      }
    }
  }
`;
export default CreatePost;
