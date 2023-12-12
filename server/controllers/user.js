import Posts from "../models/posts.js";

export const toggleSavePost = async (req, res) => {
  const { userId, postId } = req.params;
  const { user } = req;
  try {
    if (!(userId && postId)) {
      return res.status(400).send("Bad Request");
    }
    const post = user.savedPosts.find(
      (post) => post.postId === postId && post.userId === userId
    );
    if (post) {
      post.deleteOne();
      await user.save();
      return res.status(200).send("post ussaved.");
    } else {
      user.savedPosts.addToSet({ userId, postId });
      await user.save();
      return res.status(200).send("post saved.");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

export const getSavedPosts = async (req, res) => {
  try {
    const { user } = req;
    let savedPosts = [];
    for (let i = 0; i < user.savedPosts.length; i++) {
      let { posts } = await Posts.findById(user.savedPosts[i].userId);
      if (posts) {
        let savedPost = posts.id(user.savedPosts[i].postId);
        if (savedPost) {
          savedPost = {
            ...savedPost._doc,
            commentsCount: savedPost.comments.length,
          };
          delete savedPost.comments;
          savedPosts.push(savedPost);
        }
      }
    }
    return res.status(200).json(savedPosts);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

export const getSavedIds = async (req, res) => {
  try {
    const { user } = req;
    let savedPosts = user.savedPosts.map(
      (item) => `${item.userId}/${item.postId}`
    );
    return res.status(200).json(savedPosts);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
