import React from "react";
import useApi from "../../../hooks/useApi";
import { baseUrl } from "../../../settings/api";
import { useMyAuth } from "../../../settings/auth";
import styles from "../../../styles/posts/comments/CommentView.module.css";

const CommentView = ({ commentId }) => {
  const authToken = useMyAuth();
  const viewCommentsUrl = baseUrl + `posts/${commentId}?_comments=true`;

  const { data, isLoading, isError } = useApi(viewCommentsUrl, authToken);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (isError) {
    return <div className={styles.error}>An Error Occurred</div>;
  }

  if (!data || !data.comments || data.comments.length === 0) {
    return <div className={styles.noComments}>No comments yet</div>;
  }

  return (
    <div className={styles.commentsScroll}>
      {data.comments.map((comment, index) => (
        <div className={styles.comment} key={index}>
          <p className={styles.commentsBody}>{comment.body}</p>
          {comment.author && (
            <p className={styles.commentsAuthor}>
              Posted by: {comment.author.name}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentView;
