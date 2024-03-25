import React, { useState } from "react";
import { baseUrl } from "../../../../settings/api";
import { useMyAuth } from "../../../../settings/auth";
import styles from "../../../../styles/profiles/myprofile/posts/DeletePost.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeletePost = ({ postId, onDeletePost }) => {
  const authToken = useMyAuth();
  const [resultMessage, setResultMessage] = useState(null);

  const handleDelete = async () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!shouldDelete) return;
    try {
      const postUrl = baseUrl + `posts/${postId}`;
      const response = await fetch(postUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      onDeletePost();
      setResultMessage({ success: true, message: "Post deleted successfully" });
    } catch (error) {
      setResultMessage({
        success: false,
        message: "An error occurred",
      });
    }
  };

  return (
    <div>
      <button
        className={styles.deleteButton}
        type="button"
        onClick={handleDelete}
      >
        <FontAwesomeIcon icon={faTrash} /> Delete Post
      </button>
      {resultMessage && (
        <div
          className={
            resultMessage.success ? styles.successMessage : styles.errorMessage
          }
        >
          {resultMessage.message}
        </div>
      )}
    </div>
  );
};

export default DeletePost;
