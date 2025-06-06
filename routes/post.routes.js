const express = require("express");
const auth = require("../middlewares/auth.middleware");
const rateLimiter = require("../middlewares/rateLimiter.middleware");
const {
  addPost,
  getPosts,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

const router = express.Router();



router.post("/add",auth,rateLimiter, addPost);

router.get("/get",auth, getPosts);

router.patch("/update/:id",auth, updatePost);

router.delete("/delete/:id",auth, deletePost);

module.exports = router;
