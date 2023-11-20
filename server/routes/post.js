import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  getPost,
  getComment,
  likePost,
  createPost,
  addComment,
  editComment,
  addReply,
  editReply,
  editPost,
  deletePost,
  deleteComment,
  deleteReply,
  likeComment,
  likeReply,
  getReactionInfo,
} from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";
import { verifyId } from "../middleware/check.js";
import { getPostData } from "../middleware/post.js";
const router = express.Router();
//root path: /posts

router.post("/create_post", verifyToken, createPost);

/*READ*/
router.get("/", verifyId, getFeedPosts); // get feed posts
router.get("/:userId", verifyId, getUserPosts); // get all user's posts
router.get("/:userId/:postId", verifyId, getPost); // get a pirticular post
router.get("/userId/:postId/:commentId", verifyId, getPostData, getComment);
router.get(
  "/reaction_details/:userId/:postId",
  verifyId,
  getPostData,
  getReactionInfo
);
/*UPDATE*/
router.patch(
  "/post_like_toggle/:userId/:postId",
  verifyId,
  verifyToken,
  getPostData,
  likePost
);
router.patch(
  "/like_comment/:userId/:postId/:commentId",
  verifyId,
  verifyToken,
  getPostData,
  likeComment
);
router.patch(
  "/edit_post/:postId",
  verifyId,
  verifyToken,
  getPostData,
  editPost
);
router.patch(
  "/add_comment/:userId/:postId",
  verifyId,
  verifyToken,
  getPostData,
  addComment
);
router.patch(
  "/add_reply/:userId/:postId/:commentId",
  verifyId,
  verifyToken,
  getPostData,
  addReply
);
router.patch(
  "/edit_comment/:userId/:postId/:commentId",
  verifyId,
  verifyToken,
  getPostData,
  editComment
);
router.patch(
  "/edit_reply/:userId/:postId/:commentId/:replyId",
  verifyId,
  verifyToken,
  getPostData,
  editReply
);
router.patch(
  "/delete_comment/:userId/:postId/:commentId",
  verifyId,
  verifyToken,
  getPostData,
  deleteComment
);
router.patch(
  "/delete_reply/:userId/:postId/:commentId/:replyId",
  verifyId,
  verifyToken,
  getPostData,
  deleteReply
);
router.patch(
  "/like_reply/:userId/:postId/:commentId/:replyId",
  verifyId,
  verifyToken,
  getPostData,
  likeReply
);

/*DELETE*/
router.delete(
  "/delete_post/:userId/:postId",
  verifyId,
  verifyToken,
  getPostData,
  deletePost
);

export default router;
