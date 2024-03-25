import React from "react";
import useApi from "../../../hooks/useApi";
import { baseUrl } from "../../../settings/api";
import { useMyAuth } from "../../../settings/auth";
import styles from "../../../styles/profiles/follow/FollowersView.module.css";

const FollowersView = ({ followersName }) => {
  const authToken = useMyAuth();
  const viewFollowersUrl =
    baseUrl + `profiles/${followersName}?_followers=true`;

  const { data, isLoading, isError } = useApi(viewFollowersUrl, authToken);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (isError) {
    return <div className={styles.error}>An Error Occurred</div>;
  }

  if (!data || !Array.isArray(data.followers) || data.followers.length === 0) {
    return <div className={styles.noFollowers}>No followers</div>;
  }

  const placeholderAvatarUrl =
    "https://eu.ui-avatars.com/api/?name=John+Doe&size=250";

  return (
    <div className={styles.followersScroll}>
      {data.followers.map((follower, index) => (
        <div className={styles.follower} key={index}>
          <img
            src={follower.avatar || placeholderAvatarUrl}
            alt="Avatar"
            onError={(e) => (e.target.src = placeholderAvatarUrl)}
          />
          <p className={styles.followerName}>{follower.name}</p>
        </div>
      ))}
    </div>
  );
};

export default FollowersView;
