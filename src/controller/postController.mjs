import {
  addcomment,
  addLike,
  createPost,
  declike,
  getcomments,
  getLikedposts,
  getPostById,
  getPostByUsername,
  getposts,
  removeLike,
  updateCommentsCount,
  updateLikesCount,
} from "../services/postService.mjs";

export const getPosts = async (req, res) => {
  try {
    const posts = await getposts();
    const formattedPosts = posts.map((post) => ({
      ...post,
      timestamp: new Date(post.timestamp).toLocaleString(), // Converts timestamp to readable format
    }));

    return res.status(200).send(formattedPosts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Something went wrong" });
  }
};

export const addPost = async (req, res) => {
  const { userId, caption, imageurl } = req.body;
  try {
    if (!userId || !caption || !imageurl) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const post = await createPost(userId, caption, imageurl);
    return res.status(201).send("Post created successfully");
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Something went wrong" });
  }
};

export const getPostByid = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await getPostById(id);
    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }
    return res.status(200).send(post);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Something went wrong" });
  }
};

export const addlike = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    if (!postId || !userId) {
      return res.status(400).send({ error: "All fields are required" });
    }
    // add like to post and update the likes count in the posts table for the post
    await addLike(postId, userId);
    await updateLikesCount(postId);
    return res.status(201).send("Like added successfully");
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Something went wrong" });
  }
};

export const getLikedPosts = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const posts = await getLikedposts(userId);
    return res.status(200).send(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Something went wrong" });
  }
};

export const removelike = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    if (!postId || !userId) {
      return res.status(400).send({ error: "All fields are required" });
    }

    await removeLike(postId, userId);
    await declike(postId);
    return res.status(200).send("Like removed successfully");
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Something went wrong" });
  }
};

export const getComments = async (req, res) => {
  const { postId } = req.query;
  try {
    const comments = await getcomments(postId);
    return res.status(200).send(comments);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Something went wrong" });
  }
};

export const addComment = async (req, res) => {
  const { postId, userId, comment } = req.body;
  try {
    if (!postId || !userId || !comment) {
      return res.status(400).send({ error: "All fields are required" });
    }

    await addcomment(postId, userId, comment);
    await updateCommentsCount(postId);
    return res.status(201).send("Comment added successfully");
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Something went wrong" });
  }
};
