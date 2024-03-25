import React from "react";
import useApi from "../../hooks/useApi";
import { baseUrl } from "../../settings/api";
import { useMyAuth } from "../../settings/auth";
import PostCard from "./PostCard";
import styles from "../../styles/posts/PostsPage.module.css";
import { Helmet } from "react-helmet-async";

const PostsListings = () => {
  const authToken = useMyAuth();
  const apiUrl = baseUrl + "posts";

  const { data, isLoading, isError } = useApi(apiUrl, authToken);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (isError) {
    return <div className={styles.error}>An Error Occured</div>;
  }

  return (
    <div className={styles.postsContainer}>
      <Helmet>
        <title>TweeMe | Posts</title>
      </Helmet>
      <h1>Posts</h1>
      {data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsListings;
