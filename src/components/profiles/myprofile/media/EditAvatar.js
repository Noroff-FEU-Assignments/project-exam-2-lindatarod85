import React, { useState } from "react";
import { useMyAuth } from "../../../../settings/auth";
import { baseUrl } from "../../../../settings/api";
import styles from "../../../../styles/profiles/myprofile/media/EditAvatar.module.css";

const EditAvatar = ({ userName, onAvatarUpdate, onOverlayClose }) => {
  const authToken = useMyAuth();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const avatarUpdateUrl = baseUrl + `profiles/${userName}/media`;

    try {
      const response = await fetch(avatarUpdateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({ avatar: avatarUrl }),
      });

      if (!response.ok) {
        console.error("Failed to edit avatar");
        setErrorMessage("Failed to edit avatar");
      } else {
        onAvatarUpdate(avatarUrl);
        onOverlayClose();
      }
    } catch (error) {
      setErrorMessage("An error occurred");
    }
  };

  return (
    <form className={styles.editAvatarForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Avatar URL"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
      />
      <button type="submit">Submit</button>
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </form>
  );
};

export default EditAvatar;
