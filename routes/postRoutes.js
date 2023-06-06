import express from "express";
import {
  createPost,
  deletePost,
  populatePosts,
  readPost,
  updatePost,
} from "../controllers/postController.js";
import { protectMiddleware } from "../middleware/authMiddleware.js";

const app = express.Router();

app.get("/", populatePosts);
app
  .route("/edit")
  .post(protectMiddleware, createPost)
  .get(protectMiddleware, readPost)
  .put(protectMiddleware, updatePost)
  .delete(protectMiddleware, deletePost);
export default app;
