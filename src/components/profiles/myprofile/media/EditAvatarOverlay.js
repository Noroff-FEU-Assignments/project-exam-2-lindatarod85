import React, { useState } from "react";
import EditAvatar from "./EditAvatar";
import styles from "../../../../styles/profiles/myprofile/media/EditAvatarOverlay.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const EditAvatarOverlay = ({ userName, onAvatarUpdate }) => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  const handleOpenOverlay = () => {
    setOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setOverlayOpen(false);
  };

  return (
    <div className={styles.avatarOverlayContainer}>
      <button className={styles.editAvatar} onClick={handleOpenOverlay}>
        <FontAwesomeIcon icon={faEdit} /> Edit Avatar
      </button>

      {isOverlayOpen && (
        <div className="overlay">
          <div className="overlayContent">
            <EditAvatar
              userName={userName}
              onAvatarUpdate={onAvatarUpdate}
              onOverlayClose={handleCloseOverlay}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditAvatarOverlay;
