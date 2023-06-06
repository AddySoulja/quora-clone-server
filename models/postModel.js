import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    id: { type: String },
    question: { type: String, required: true },
    by: { type: String },
    answers: { type: Array },
    likes: { type: Number },
  },
  {
    collection: "Post",
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
