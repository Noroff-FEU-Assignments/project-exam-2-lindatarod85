import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/posts/PostCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const PostCard = ({ post }) => {
  const { title, media, _count, id } = post;
  const { comments, reactions } = _count || { comments: 0, reactions: 0 };

  const placeholderMediaUrl =
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

  const [imageSrc, setImageSrc] = useState(media || placeholderMediaUrl);

  const handleImageError = () => {
    setImageSrc(placeholderMediaUrl);
  };

  return (
    <div className={styles.postCardContainer}>
      <img src={imageSrc} alt={title} onError={handleImageError} />
      <h3>{title && title.charAt(0).toUpperCase() + title.slice(1)}</h3>

      <div className={styles.commentsContainer}>
        <p>
          <FontAwesomeIcon icon={faComment} className={styles.icon} /> Comments:{" "}
          {comments !== undefined ? comments : 0}
        </p>
        <p>
          <FontAwesomeIcon icon={faThumbsUp} className={styles.icon} />{" "}
          Reactions: {reactions !== undefined ? reactions : 0}
        </p>
      </div>
      {id && (
        <Link className={styles.viewPost} to={`/post/${id}`}>
          View post
        </Link>
      )}
    </div>
  );
};

export default PostCard;
