import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/profiles/ProfileCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faNewspaper } from "@fortawesome/free-solid-svg-icons";

const ProfileCard = ({ profile }) => {
  const { name, avatar, _count } = profile;
  const { posts, followers } = _count || { posts: 0, followers: 0 };

  const placeholderAvatarUrl =
    "https://eu.ui-avatars.com/api/?name=John+Doe&size=250";

  const [imageSrc, setImageSrc] = useState(avatar || placeholderAvatarUrl);

  const handleImageError = () => {
    setImageSrc(placeholderAvatarUrl);
  };

  return (
    <div className={styles.profileCardContainer}>
      <img src={imageSrc} alt={name} onError={handleImageError} />
      <h3>{name && name.charAt(0).toUpperCase() + name.slice(1)}</h3>

      <div className={styles.postsContainer}>
        <p>
          <FontAwesomeIcon icon={faNewspaper} className={styles.icon} /> Posts:{" "}
          {posts !== undefined ? posts : 0}
        </p>
        <p>
          <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />{" "}
          Followers: {followers !== undefined ? followers : 0}
        </p>
      </div>
      {name && (
        <Link className={styles.viewProfile} to={`/profile/${name}`}>
          View profile
        </Link>
      )}
    </div>
  );
};

export default ProfileCard;
