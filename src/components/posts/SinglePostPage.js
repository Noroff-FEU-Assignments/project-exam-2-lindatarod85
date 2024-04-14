import React, { useState, useEffect, useCallback } from "react";
import { baseUrl } from "../../settings/api";
import { useMyAuth } from "../../settings/auth";
import styles from "../../styles/posts/SinglePostPage.module.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CommentForm from "./comments/CommentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faArrowLeft,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import CommentView from "./comments/CommentView";
import Author from "./author/Author";
import ReactionView from "./reactions/ReactionView";
import EmojiReactionPanel from "./reactions/ReactionPanel";
import EditPostOverlay from "../profiles/myprofile/posts/EditPostOverlay";
import DeletePost from "../profiles/myprofile/posts/DeletePost";

const SinglePost = () => {
  const { id } = useParams();
  const authToken = useMyAuth();
  const apiUrl = baseUrl + `posts/${id}`;
  const [commentsCount, setCommentsCount] = useState(0);
  const [reactionsCount, setReactionsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [authorName, setAuthorName] = useState(null);
  const storedUserNameWithQuotes = localStorage.getItem("name") || "";
  const storedUserName = storedUserNameWithQuotes.replace(/^"(.*)"$/, "$1");

  const placeholderMediaUrl =
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      const _count = result?._count || { comments: 0, reactions: 0 };
      const { comments, reactions } = _count;

      setCommentsCount(comments !== undefined ? comments : 0);
      setReactionsCount(reactions !== undefined ? reactions : 0);
      setData(result);
      setIsLoading(false);
      setIsError(false);
      setImageSrc(result.media || placeholderMediaUrl);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }, [apiUrl, authToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNewComment = () => {
    setCommentsCount((prevComments) => prevComments + 1);
  };

  const handleNewReaction = () => {
    setReactionsCount((prevReactions) => prevReactions + 1);
  };

  const handleAuthorName = (name) => setAuthorName(name);

  const handleImageError = () => {
    setImageSrc(placeholderMediaUrl);
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (isError) {
    return <div className={styles.error}>An Error Occurred</div>;
  }

  const { title, body } = data;

  const handleEditPost = () => {
    fetchData();
  };

  const onDeletePost = () => {
    setTimeout(() => {
      navigate("/myprofile");
    }, 2000);
  };

  return (
    <div className={styles.singlePostContainer}>
      <Helmet>
        <title>TweeMe | {title}</title>
      </Helmet>

      <div className={styles.imageContainer}>
        <Link className={styles.seeAllPosts} to="/posts">
          <FontAwesomeIcon icon={faArrowLeft} /> See all Posts
        </Link>
        <img src={imageSrc} alt={title} onError={handleImageError} />
      </div>

      <div className={styles.contentContainer}>
        <Author authorId={id} onAuthorName={handleAuthorName} />
        <div className={styles.managePost}>
          {storedUserName === authorName && (
            <>
              <EditPostOverlay
                onEditPost={() => handleEditPost()}
                postId={id}
              />
              <DeletePost postId={id} onDeletePost={onDeletePost} />
            </>
          )}
        </div>
        <h1>{title && title.charAt(0).toUpperCase() + title.slice(1)}</h1>
        <p>{body}</p>
      </div>

      <div className={styles.actionsContainer}>
        <div className={styles.commentsContainer}>
          <div>
            <FontAwesomeIcon icon={faComment} className={styles.icon} />{" "}
            Comments: {commentsCount !== undefined ? commentsCount : 0}
          </div>
          <div>
            <CommentView commentId={id} key={commentsCount} />
            <CommentForm postId={id} onNewComment={handleNewComment} />
          </div>
        </div>

        <div className={styles.reactionsContainer}>
          <div>
            <FontAwesomeIcon icon={faThumbsUp} className={styles.icon} />{" "}
            Reactions: {reactionsCount !== undefined ? reactionsCount : 0}
          </div>
          <ReactionView reactionId={id} reactionsCount={reactionsCount} />
          <EmojiReactionPanel postId={id} onNewReaction={handleNewReaction} />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
