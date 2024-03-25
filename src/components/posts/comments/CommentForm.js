import React, { useState } from "react";
import { useMyAuth } from "../../../settings/auth";
import { baseUrl } from "../../../settings/api";
import styles from "../../../styles/posts/comments/CommentForm.module.css";

const CommentForm = ({ postId, onNewComment }) => {
  const authToken = useMyAuth();
  const [commentText, setCommentText] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const commentUrl = baseUrl + `posts/${postId}/comment`;
    const response = await fetch(commentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({ body: commentText }),
    });
    if (!response.ok) {
      setErrorMessage("Failed to submit comment.");
    } else {
      setCommentText("");
      onNewComment();
      setErrorMessage(null);
    }
  };

  return (
    <form className={styles.commentForm} onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button type="submit">Post Comment</button>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </form>
  );
};

export default CommentForm;
