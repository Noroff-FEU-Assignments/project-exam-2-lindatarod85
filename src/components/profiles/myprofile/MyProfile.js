import React, { useState } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import styles from "../../../styles/profiles/myprofile/MyProfile.module.css";
import { Helmet } from "react-helmet-async";
import FollowersView from "../follow/FollowersView";
import EditAvatarOverlay from "./media/EditAvatarOverlay";
import EditBannerOverlay from "./media/EditBannerOverlay";
import MyPostsComponent from "./posts/MyPosts";
import ProfileFollowing from "../follow/ProfileFollowing";
import CreatePostOverlay from "./posts/CreatePostOverlay";

const MyProfile = () => {
  const storedUserNameWithQuotes = localStorage.getItem("name") || "";
  const storedUserName = storedUserNameWithQuotes.replace(/^"(.*)"$/, "$1");

  const [avatar, setAvatar] = useLocalStorage("avatar", null);
  const [banner, setBanner] = useLocalStorage("banner", null);

  const placeholderAvatar =
    "https://eu.ui-avatars.com/api/?name=John+Doe&size=250";
  const placeholderBanner = "https://placehold.jp/600x300.png";

  const updateAvatarInLocalStorage = (newAvatarUrl) => {
    if (typeof newAvatarUrl === "string") {
      setAvatar(newAvatarUrl);
    } else {
      console.error("Invalid avatar URL provided:", newAvatarUrl);
    }
  };

  const updateBannerInLocalStorage = (newBannerUrl) => {
    if (typeof newBannerUrl === "string") {
      setBanner(newBannerUrl);
    } else {
      console.error("Invalid banner URL provided:", newBannerUrl);
    }
  };

  const [newPostTrigger, setNewPostTrigger] = useState(false);

  const handleNewPost = () => {
    setNewPostTrigger(!newPostTrigger);
  };

  return (
    <div className={styles.myProfileContainer}>
      <Helmet>
        <title>TweeMe | My Profile | {storedUserName}</title>
      </Helmet>
      <h1>Welcome</h1>
      <div className={styles.myProfileTopContainer}>
        <div className={styles.myAvatarContainer}>
          <h2>{storedUserName}</h2>
          <img
            src={avatar || placeholderAvatar}
            alt={avatar}
            onError={(e) => (e.target.src = placeholderAvatar)}
          />
          <EditAvatarOverlay
            userName={storedUserName}
            onAvatarUpdate={updateAvatarInLocalStorage}
          />
        </div>

        <div className={styles.myBannerContainer}>
          <img
            src={banner || placeholderBanner}
            alt={banner}
            onError={(e) => (e.target.src = placeholderBanner)}
          />
          <EditBannerOverlay
            userName={storedUserName}
            onBannerUpdate={updateBannerInLocalStorage}
          />
        </div>

        <div className={styles.myFollowersContainer}>
          <h3>Followers</h3>
          <FollowersView followersName={storedUserName} />
        </div>
      </div>

      <div className={styles.myProfileActivity}>
        <div className={styles.myPosts}>
          <div className={styles.createPostContainer}>
            <h2>Posts by {storedUserName}</h2>
            <CreatePostOverlay onNewPost={handleNewPost} />
          </div>
          <MyPostsComponent
            userName={storedUserName}
            newPostTrigger={newPostTrigger}
          />
        </div>
        <div className={styles.following}>
          <h3>You are Following</h3>
          <div className={styles.followingView}>
            <ProfileFollowing followingName={storedUserName} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
