import React, { useState } from "react";
import EditBanner from "./EditBanner";
import styles from "../../../../styles/profiles/myprofile/media/EditBannerOverlay.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const EditBannerOverlay = ({ userName, onBannerUpdate }) => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  const handleOpenOverlay = () => {
    setOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setOverlayOpen(false);
  };

  return (
    <div className={styles.bannerOverlayContainer}>
      <button className={styles.editBanner} onClick={handleOpenOverlay}>
        <FontAwesomeIcon icon={faEdit} /> Edit Banner
      </button>

      {isOverlayOpen && (
        <div className="overlay">
          <div className="overlayContent">
            <EditBanner
              userName={userName}
              onBannerUpdate={onBannerUpdate}
              onOverlayClose={handleCloseOverlay}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBannerOverlay;
