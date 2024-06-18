const Post = require('../model/postModel');
const upload = require("../middleware/upload"); 

const createPost = async (req, res) => {
    const {title, content, author} = req.body;
    const media = req.body.media;

    
    try{
        const newPost = await Post.create({
            title,
            content,
            media,
            author
        });
        return res.status(201).json(newPost);
    }
    catch(err){
        return res.status(400).json({ message: err.message });
    }
};

const getPosts = async (req,res) => {
    try{
        const userId = req.params.id;
        const posts = await Post.find({
          author: userId,
        })
          .sort({ createdAt: -1 })
          .populate("author", "username avatarImage"); // Assuming 'username' is a field in User model

        return res.status(200).json(posts);
    }
    catch(err){
        return res.status(400).json({ message: err.message });
    }
}

module.exports = {
  createPost,
  getPosts,
};