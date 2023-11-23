import PostList from "../models/postList.js";
import Comment from "../models/comment.js";
import Reply from "../models/reply.js";
import Post from "../models/post.js";
//TODO: find a way to send comments on patches
/*CREATE*/
export const createPost = async (req, res) => {
  const uploadsFolder = `${process.env.API_URL}/assets/`;
  try {
    const { id } = req.user;
    let { text, location } = req.body;
    const { media } = req.files;
    let filesPaths = [];
    if (id) {
      if (media) {
        media.map((file, index) => {
          if (file.mimetype.startsWith("image")) {
            filesPaths.push({
              name: `${uploadsFolder}${file.filename}`,
              order: index,
              fileType: "photo",
            });
          } else if (file.mimetype.startsWith("video")) {
            filesPaths.push({
              name: `${uploadsFolder}${file.filename}`,
              order: index,
              fileType: "vedio",
            });
          }
        });
      }
      const newPost = new Post({
        creatorId: id,
        text,
        files: media ? filesPaths : null,
        createdAt: Date.now(),
        location,
      });
      const postList = await PostList.findById(id);
      postList.posts.push(newPost);
      await postList.save();
      return res.status(201).json(newPost);
    } else {
      return res.status(409).json({ error: error.message });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/*READ*/
export const getFeedPosts = async (req, res) => {
  try {
    const postList = await PostList.find();
    if (!postList) {
      return res.status(404).json({ error: error.message });
    } else {
      let posts = [];
      postList.map((list) => posts.push(...list.posts));
      return res.status(200).json(posts.reverse());
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getComment = async (req, res) => {
  try {
    return res.status(200).json(req.comment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    let postList = await PostList.findById(userId);
    postList = postList.posts.reverse();
    return res.status(200).json(postList);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getPost = async (req, res) => {
  try {
    const { post } = req;
    console.log(post);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getReactionInfo = async (req, res) => {
  try {
    const { post } = req;
    return res
      .status(200)
      .json({ commentsCount: post.comments.length, likes: post.likes });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/*UPDATE*/
export const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const { user, postList, post } = req;
    if (comment) {
      post.comments.addToSet({
        creatorId: user.id,
        content: comment,
        createdAt: Date.now(),
      });
      await postList.save();
      return res.status(200).json(post);
    } else {
      return res.status(409).json({ error: "comment cannot be empty" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const addReply = async (req, res) => {
  try {
    const { reply } = req.body;
    const { user, postList, post, comment } = req;

    if (reply) {
      comment.replies.addToSet({
        creatorId: req.user.id,
        rootCommentId: comment.id,
        content: reply,
      });
      await postList.save();
      return res.status(200).json(post);
    } else {
      return res.status(409).json({ message: "reply cannot be empty" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const editComment = async (req, res) => {
  try {
    const { comment: newComment } = req.body;
    const { user, post, comment } = req;
    if (newComment) {
      if (comment.creatorId === user.id) {
        comment.content = newComment;
        await post.save();
        return res.status(200).json(post);
      } else {
        return res.status(401).send("Unauthorized");
      }
    } else {
      return res.status(409).json({ error: "comment cannot be empty" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { user, postList, post } = req;
    if (post.likes.includes(user.id)) {
      post.likes = post.likes.filter((id) => id !== user.id);
    } else {
      post.likes.push(user.id);
    }
    await postList.save();
    const likes = post.likes;
    return res.status(200).json({ likes });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const likeComment = async (req, res) => {
  try {
    const { user, post, comment } = req;
    if (comment.likes.includes(user.id)) {
      comment.likes = comment.likes.filter((id) => id !== user.id);
    } else {
      comment.likes.push(user.id);
    }
    await post.save();
    const likesCount = comment.likes.length;
    return res.status(200).json({ likes: comment.likes, likesCount });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const editPost = async (req, res) => {
  try {
    const { user, postList, post } = req;
    const { text, location } = req.body;
    if (post.creatorId === user.id) {
      text ? (post.text = text) : null;
      location ? (post.location = location) : null;
      await postList.save();
      return res.status(200).json(post);
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/*DELETE*/

export const deletePost = async (req, res) => {
  try {
    const { user, postList, post } = req;
    if (post.creatorId === user.id) {
      postList.posts.id(post.id).deleteOne();
      await postList.save();
      return res.status(200).json({ message: "post deleted successfully" });
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { user, post, comment } = req;
    if (user.id === comment.creatorId || user.id === post.creatorId) {
      post.comments.id(comment.id).deleteOne();
      await post.save();
      return res.status(200).json(post);
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const deleteReply = async (req, res) => {
  try {
    let { post, comment, reply } = req;
    if (req.user.id === reply.creatorId) {
      comment.replies.id(reply.id).deleteOne();
      await post.save();
      res.status(200).json(post);
    } else {
      return res.status(401).json("Unauthorized");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const editReply = async (req, res) => {
  try {
    let { post, comment, reply } = req;
    if (req.user.id === reply.creatorId) {
      let { reply: newReply } = req.body;
      if (newReply) {
        comment.replies.id(reply.id).content = newReply;
        await post.save();
        return res.status(200).json(post);
      } else {
        return res.status(409).json({ message: "reply cannot be empty" });
      }
    } else {
      return res.status(401).json("Unauthorized");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const likeReply = async (req, res) => {
  try {
    let { post, reply, user } = req;

    if (reply.likes.includes(user.id)) {
      reply.likes = reply.likes.filter((item) => item !== user.id);
    } else {
      reply.likes.push(user.id);
    }
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
