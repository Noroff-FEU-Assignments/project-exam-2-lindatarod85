import React from "react";
import useApi from "../../../hooks/useApi";
import { baseUrl } from "../../../settings/api";
import { useMyAuth } from "../../../settings/auth";
import styles from "../../../styles/profiles/follow/ProfileFollowing.module.css";

const ProfileFollowing = ({ followingName }) => {
  const authToken = useMyAuth();
  const viewFollowingUrl =
    baseUrl + `profiles/${followingName}?_following=true`;

  const { data, isLoading, isError } = useApi(viewFollowingUrl, authToken);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (isError) {
    return <div className={styles.error}>An Error Occurred</div>;
  }

  if (!data || !Array.isArray(data.following) || data.following.length === 0) {
    return <div>No followings yet</div>;
  }

  const placeholderAvatarUrl =
    "https://eu.ui-avatars.com/api/?name=John+Doe&size=250";

  return (
    <div className={styles.followingScroll}>
      {data.following.map((following, index) => (
        <div className={styles.following} key={index}>
          <img
            src={following.avatar || placeholderAvatarUrl}
            alt="Avatar"
            onError={(e) => (e.target.src = placeholderAvatarUrl)}
          />
          <p className={styles.followingName}>{following.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileFollowing;
