import React, { useState, useEffect } from "react";
import { baseUrl } from "../../settings/api";
import { useMyAuth } from "../../settings/auth";
import styles from "../../styles/profiles/SingleProfilePage.module.css";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faNewspaper,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import FollowProfile from "./follow/FollowProfile";
import FollowersView from "./follow/FollowersView";
import ProfileFollowing from "./follow/ProfileFollowing";
import PostsByProfile from "./PostsByProfile";

const SingleProfile = () => {
  const { name: profileName } = useParams();
  const authToken = useMyAuth();
  const apiUrl = baseUrl + `profiles/${profileName}`;
  const [postsCount, setPostsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const fetchData = async () => {
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
      const _count = result?._count || { posts: 0, followers: 0 };
      const { posts, followers } = _count;

      setPostsCount(posts !== undefined ? posts : 0);
      setFollowersCount(followers !== undefined ? followers : 0);
      setData(result);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl, authToken]);

  const handleToggleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowersCount((prevCount) =>
      isFollowing ? prevCount - 1 : prevCount + 1
    );
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (isError) {
    return <div className={styles.error}>An Error Occurred</div>;
  }

  const { banner, avatar, _count } = data;
  const { followers } = _count || { followers: 0 };

  const placeholderAvatarUrl =
    "https://eu.ui-avatars.com/api/?name=John+Doe&size=250";
  const placeholderBannerUrl = "https://placehold.jp/600x300.png";

  return (
    <div className={styles.singleProfileContainer}>
      <Helmet>
        <title>TweeMe | Profile | {profileName}</title>
      </Helmet>
      <Link className={styles.seeAllProfiles} to="/profiles">
        <FontAwesomeIcon icon={faArrowLeft} /> See all Profiles
      </Link>

      <div className={styles.profileTopContainer}>
        <div className={styles.avatarContainer}>
          <h1>
            {profileName &&
              profileName.charAt(0).toUpperCase() + profileName.slice(1)}
          </h1>
          <img
            src={avatar || placeholderAvatarUrl}
            alt={profileName}
            onError={(e) => (e.target.src = placeholderAvatarUrl)}
          />

          <div className={styles.countsContainer}>
            <div className={styles.postsFollowersContainer}>
              <div>
                <FontAwesomeIcon icon={faNewspaper} className={styles.icon} />{" "}
                Posts: {postsCount !== undefined ? postsCount : 0}
              </div>
            </div>

            <div className={styles.followersContainer}>
              <div>
                <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />{" "}
                Followers: {followersCount !== undefined ? followersCount : 0}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bannerContainer}>
          <img
            src={banner || placeholderBannerUrl}
            alt={profileName}
            onError={(e) => (e.target.src = placeholderBannerUrl)}
          />
        </div>

        <div className={styles.followContainer}>
          <h3>Followers</h3>
          <FollowersView followersName={profileName} key={followersCount} />
          <FollowProfile
            profileName={profileName}
            isFollowing={isFollowing}
            onToggleFollow={handleToggleFollow}
          />
        </div>
      </div>

      <div className={styles.profileActivity}>
        <div className={styles.posts}>
          <h2>Posts by {profileName}</h2>
          <PostsByProfile profileName={profileName} />
        </div>
        <div className={styles.following}>
          <h3>{profileName} is Following</h3>
          <ProfileFollowing followingName={profileName} />
        </div>
      </div>
    </div>
  );
};

export default SingleProfile;
