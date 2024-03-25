import React, { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import { baseUrl } from "../../settings/api";
import { useMyAuth } from "../../settings/auth";
import PostCard from "../posts/PostCard";
import styles from "../../styles/profiles/PostsByProfile.module.css";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const PostsByProfile = () => {
  const { name: profileName } = useParams();
  const authToken = useMyAuth();
  const postsByProfileUrl = `${baseUrl}profiles/${profileName}/posts`;

  const { data, isLoading, isError } = useApi(postsByProfileUrl, authToken);

  const [showAllPosts, setShowAllPosts] = useState(false);
  const displayedPosts = showAllPosts ? data : data && data.slice(0, 3);

  useEffect(() => {}, [data]);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (isError) {
    return (
      <div className={styles.error}>
        An error occurred while fetching posts.
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={styles.noPosts}>
        <p>No posts have been created by {profileName} yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.posts}>
      <Helmet>
        <title>TweeMe | Profile | {profileName} | Posts</title>
      </Helmet>
      {displayedPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {data.length > 3 && !showAllPosts && (
        <div className={styles.viewMore}>
          <button
            className={styles.viewMoreButton}
            onClick={() => setShowAllPosts(true)}
          >
            View More Posts
          </button>
        </div>
      )}
    </div>
  );
};

export default PostsByProfile;
