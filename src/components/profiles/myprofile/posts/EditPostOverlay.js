import React, { useState } from "react";
import EditPost from "./EditPost";
import styles from "../../../../styles/profiles/myprofile/posts/EditPostOverlay.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

const EditPostOverlay = ({ onEditPost, postId }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleOverlayToggle = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const handleEditPost = async () => {
    if (onEditPost) {
      await onEditPost();
    }

    setTimeout(() => {
      setIsOverlayOpen(false);
    }, 2000);
  };

  return (
    <div>
      <button
        className={`${styles.editPostButton} ${
          isOverlayOpen ? styles.activeButton : ""
        }`}
        onClick={handleOverlayToggle}
      >
        <FontAwesomeIcon icon={isOverlayOpen ? faTimes : faEdit} />
        {isOverlayOpen ? " Close Edit" : " Edit Post"}
      </button>

      {isOverlayOpen && (
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <EditPost onEditPost={handleEditPost} postId={postId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPostOverlay;
