import React, { useState } from "react";
import { useMyAuth } from "../../../../settings/auth";
import { baseUrl } from "../../../../settings/api";
import styles from "../../../../styles/profiles/myprofile/media/EditBanner.module.css";

const EditBanner = ({ userName, onBannerUpdate, onOverlayClose }) => {
  const authToken = useMyAuth();
  const [bannerUrl, setBannerUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const bannerUpdateUrl = baseUrl + `profiles/${userName}/media`;

    try {
      const response = await fetch(bannerUpdateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({ banner: bannerUrl }),
      });

      if (!response.ok) {
        setErrorMessage("Failed to edit banner");
      } else {
        onBannerUpdate(bannerUrl);
        onOverlayClose();
      }
    } catch (error) {
      setErrorMessage("An error ocurred");
    }
  };

  return (
    <form className={styles.editBannerForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Banner URL"
        value={bannerUrl}
        onChange={(e) => setBannerUrl(e.target.value)}
      />
      <button type="submit">Submit</button>
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </form>
  );
};

export default EditBanner;
