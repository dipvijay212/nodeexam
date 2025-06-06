const Post = require("../models/post.model");


const addPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId; 

  try {
    const post = new Post({ title, content, userId });
    await post.save();
    res.status(200).json({ msg: "Post added" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const getPosts = async (req, res) => {
  try {
    const userId = req.userId;  
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }

    const { title } = req.query;

    let query = { userId };
    if (title) {
      query.title = title;
    }

    const posts = await Post.find(query);
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;  
  const update = req.body;     

  try {
    const post = await Post.findById(id);
    if (!post || post.userId.toString() !== userId) {
      return res.status(400).json({ error: "Unauthorized" });
    }
    const updated = await Post.findByIdAndUpdate(id, update, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;  

  try {
    const post = await Post.findById(id);
    if (!post || post.userId.toString() !== userId) {
      return res.status(400).json({ error: "Unauthorized" });
    }

    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports = {
  addPost,
  getPosts,
  updatePost,
  deletePost,
};
