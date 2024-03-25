import React from "react";
import useApi from "../../hooks/useApi";
import { baseUrl } from "../../settings/api";
import { useMyAuth } from "../../settings/auth";
import ProfileCard from "./ProfileCard";
import styles from "../../styles/profiles/ProfilesPage.module.css";
import { Helmet } from "react-helmet-async";

const ProfilesPage = () => {
  const authToken = useMyAuth();
  const apiUrl = baseUrl + "profiles";

  const { data, isLoading, isError } = useApi(apiUrl, authToken);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (isError) {
    return <div className={styles.error}>An Error Occured</div>;
  }

  return (
    <div className={styles.profilesContainer}>
      <Helmet>
        <title>TweeMe | Profiles</title>
      </Helmet>
      <h1>Profiles</h1>
      {data.map((profile) => (
        <ProfileCard key={profile.name} profile={profile} />
      ))}
    </div>
  );
};

export default ProfilesPage;
