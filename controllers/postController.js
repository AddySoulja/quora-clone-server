import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const createPost = asyncHandler(async (req, res) => {
  const { id, question, by, answers, likes } = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    const post = await Post.create({
      id,
      question,
      by,
      answers,
      likes,
    });
    post.save();
    const data = await User.create({
      ...user,
      posts: [...user.posts, post],
    });
    data.save();
    console.log("User after post: ", data);
    res.status(201).json({
      user: data,
    });
  }
});

const readPost = asyncHandler(async (req, res) => {
  console.log("READING PARAMS: ", req.params.id);
});
const updatePost = asyncHandler(async (req, res) => {
  // const {username, email, }
});
const deletePost = asyncHandler(async (req, res) => {
  // const {username, email, }
});

const populatePosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  if (posts) {
    res.status(200).json({ globalPosts: posts });
  } else {
    res.status(404);
    throw new Error("No posts found");
  }
});

export { populatePosts, createPost, readPost, updatePost, deletePost };
