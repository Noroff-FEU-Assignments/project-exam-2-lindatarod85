/*import React, { useState, useEffect } from "react";
import { baseUrl } from "../../../../settings/api";
import { useMyAuth } from "../../../../settings/auth";
import PostCard from "../../../posts/PostCard";
import styles from "../../../../styles/profiles/myprofile/posts/MyPosts.module.css";

const MyPosts = ({ userName, newPostTrigger }) => {
  const authToken = useMyAuth();
  const myPostsUrl = `${baseUrl}profiles/${userName}/posts`;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(myPostsUrl, {
        method: "GET",
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const json = await response.json();
      setData(json);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [myPostsUrl, authToken, newPostTrigger]);

  useEffect(() => {
    if (newPostTrigger) {
      fetchData();
    }
  }, [newPostTrigger]);

  const [showAllPosts, setShowAllPosts] = useState(false);
  const displayedPosts = showAllPosts ? data : data && data.slice(0, 3);

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
        <p>You have no posts yet</p>
      </div>
    );
  }

  return (
    <div className={styles.myPosts}>
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

export default MyPosts;*/

import React, { useState, useEffect, useCallback } from "react";
import { baseUrl } from "../../../../settings/api";
import { useMyAuth } from "../../../../settings/auth";
import PostCard from "../../../posts/PostCard";
import styles from "../../../../styles/profiles/myprofile/posts/MyPosts.module.css";

const MyPosts = ({ userName, newPostTrigger }) => {
  const authToken = useMyAuth();
  const myPostsUrl = `${baseUrl}profiles/${userName}/posts`;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(myPostsUrl, {
        method: "GET",
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const json = await response.json();
      setData(json);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [myPostsUrl, authToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (newPostTrigger) {
      fetchData();
    }
  }, [fetchData, newPostTrigger]);

  const [showAllPosts, setShowAllPosts] = useState(false);
  const displayedPosts = showAllPosts ? data : data && data.slice(0, 3);

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
        <p>You have no posts yet</p>
      </div>
    );
  }

  return (
    <div className={styles.myPosts}>
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

export default MyPosts;

