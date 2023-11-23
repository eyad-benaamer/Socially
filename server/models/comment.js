import { Schema, model } from "mongoose";
import { ReplySchema } from "./reply.js";
export const CommentSchema = new Schema({
  creatorId: String,
  content: {
    type: String,
    required: true,
  },
  likes: [],
  replies: [ReplySchema],
  createdAt: Number,
});
const Comment = model("comment", CommentSchema);
export default Comment;
