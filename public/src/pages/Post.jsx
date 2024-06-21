import Reactdiv, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/logo.svg";
import "react-toastify/dist/ReactToastify.css";
import { getAllPostRoute } from "../utils/APIRoutes";
import axios from "axios";



const Post = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${getAllPostRoute}/${id}`); // Đổi lại API của bạn để lấy danh sách bài post
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
    },[]);

    useEffect(() => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/");
      }
    }, []);
  return (
    <Container>
      <div className={"brand"}>
        <img onClick={() => navigate('/')} src={Logo} alt="" />
        <h1>POST CHITCHAT</h1>
      </div>
      <ul className="post">
        {(posts.length > 0) ? (posts.map((post, index) => (
          <li key={index}>
            <div className="author">
              <img
                src={`data:image/svg+xml;base64,${post.author.avatarImage}`}
                alt="img"
              />
              <h3>{post.author.username}</h3>
            </div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div>
              <img
                src={`http://localhost:5000${post.media}`}
                alt="Post media"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </li>
          
        ))) : (<p>Người dùng không có bài viết nào</p>) }
      </ul>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  weight: 100vw;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-top: 2rem;
  background-color: #1e2a38;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 4rem;
      cursor: pointer;
    }
    h1 {
      color: #fff;
      text-transform: uppercase;
    }
  }
  .post {
    width: 50%;
    background-color: #28527a;
    padding: 2rem;
    border-radius: 2rem;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    .author {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      img {
        height: 3rem;
      }
    }
    p {
      line-height: 1.5rem;
      font-size: 1.2rem;
    }
  }
`;
export default Post;
