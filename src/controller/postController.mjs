import { Expo } from "expo-server-sdk";
import {
  addcomment,
  addLike,
  createPost,
  declike,
  getcomments,
  getLikedposts,
  getPostById,
  getPostsById,
  getposts,
  removeLike,
  updateCommentsCount,
  updateLikesCount,
  checkIfLiked,
  getPostAuthorId,
  getTokenbyUserId,
} from "../services/postService.mjs";
import { sendNotification } from "../utils/Notification.mjs";
import { query } from "../config/db.mjs";

const expo = new Expo();

export const getPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await getposts();

    const likedPostsQuery = `
      SELECT postid FROM likes WHERE userid = $1
    `;
    const { rows } = await query(likedPostsQuery, [userId]);
    // console.log(rows);

    // Extract liked post IDs into an array
    const likedPostIds = rows.map((row) => row.postid);
    // console.log(likedPostIds);

    const formattedPosts = posts.map((post) => ({
      ...post,
      timestamp: new Date(post.timestamp).toLocaleString(), // Converts timestamp to readable format
      isLiked: likedPostIds.includes(post.id), // Check if post ID is in liked posts array
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
      return res.status(400).json({ error: "All fields are required" });
    }

    const post = await createPost(userId, caption, imageurl);
    return res.status(201).json("Post created successfully");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Something went wrong" });
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

export const getUserPosts = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await getPostsById(id);
    return res.status(200).send(posts);
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

    const postAuthor = await getPostAuthorId(postId);
    // console.log("postAuthorId", postAuthor);

    if (postAuthor) {
      // const token = await getTokenbyUserId(postAuthor.userid);
      // console.log(token);

      const message = {
        title: "Like",
        body: `${postAuthor.username} liked your post`,
        data: { type: "like" },
      };

      await sendNotification(
        postAuthor.userid,
        message.title,
        message.body,
        message.data
      );

      // if (token.length > 0) {
      //   const message = {
      //     title: "Like",
      //     body: `${postAuthor.username} liked your post`,
      //     data: { type: "like" },
      //   };
      //   expo.sendPushNotificationsAsync([
      //     {
      //       to: token,
      //       sound: "default",
      //       title: message.title,
      //       body: message.body,
      //       data: message.data,
      //     },
      //   ]);
      // }
    }

    return res.status(201).send("Like added successfully");
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ error: "Something went wrong" });
  }
};

export const getLikedPosts = async (req, res) => {
  const { userId } = req.params;
  // console.log(userId);

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

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  return date.toISOString().split("T")[0]; // Formats to 'YYYY-MM-DD'
};

export const getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await getcomments(postId);

    // Format the date in each comment
    const formattedComments = comments.map((comment) => ({
      ...comment,
      timestamp: formatDate(comment.timestamp), // Format the timestamp to only the day
    }));

    return res.status(200).json(formattedComments);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Something went wrong" });
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

    const postAuthor = await getPostAuthorId(postId);
    // console.log("postAuthorId", postAuthor);

    if (postAuthor) {
      // const token = await getTokenbyUserId(postAuthor.userid);
      // console.log(token);

      // if (token.length > 0) {
      const message = {
        title: "Comment",
        body: `${postAuthor.username} commented on your post`,
        data: { type: "comment" },
      };

      await sendNotification(
        postAuthor.userid,
        message.title,
        message.body,
        message.data
      );

      //   expo.sendPushNotificationsAsync([
      //     {
      //       to: token,
      //       sound: "default",
      //       title: message.title,
      //       body: message.body,
      //       data: message.data,
      //     },
      //   ]);
      // }
    }

    return res.status(201).json("Comment added successfully");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const handleLike = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    if (!postId || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the user has already liked the post
    const existingLike = await checkIfLiked(postId, userId);

    if (existingLike) {
      // User has already liked this post, so remove the like
      await removeLike(postId, userId);
      await declike(postId); // Decrement the likes count
      return res.status(200).json("Like removed successfully");
    } else {
      // User has not liked this post yet, so add the like
      await addLike(postId, userId);
      await updateLikesCount(postId); // Increment the likes count
      return res.status(201).json("Like added successfully");
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
