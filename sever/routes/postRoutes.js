const express = require("express");
const {
  createPost,
  getPosts,
} = require("../controllers/postController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/uploads", upload.single("media"), (req, res) => {
  
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  console.log(req.file,'wwwwwwwwwwwwwwwwwwwwwwwwww');
  return res.json({ filePath: `/uploads/${req.file.filename}` });
}); 

router.get("/getPosts/:id", getPosts); // Route để lấy tất cả bài viết
router.post("/createPosts", createPost);

module.exports = router;