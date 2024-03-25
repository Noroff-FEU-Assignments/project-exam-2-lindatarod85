import React, { useState } from "react";
import { useMyAuth } from "../../../settings/auth";
import { baseUrl } from "../../../settings/api";
import styles from "../../../styles/profiles/follow/FollowProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const FollowProfile = ({ profileName, onToggleFollow }) => {
  const authToken = useMyAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleToggleFollow = async () => {
    const followUrl = baseUrl + `profiles/${profileName}/follow`;
    const unfollowUrl = baseUrl + `profiles/${profileName}/unfollow`;

    try {
      const response = await fetch(isFollowing ? unfollowUrl : followUrl, {
        method: "PUT",
        headers: {
          Authorization: authToken,
        },
      });

      if (response.ok) {
        setIsFollowing(!isFollowing);
        onToggleFollow();
      } else {
        setErrorMessage("Failed to follow");
      }
    } catch (error) {
      setErrorMessage("Error following");
    }
  };

  return (
    <div>
      <button
        className={`${styles.followButton} ${
          isFollowing ? styles.unfollowButton : ""
        }`}
        onClick={handleToggleFollow}
        type="button"
      >
        <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
        {isFollowing ? "Unfollow" : "Follow"}
      </button>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default FollowProfile;
