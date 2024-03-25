import React, { useState } from "react";
import CreatePost from "./CreatePost";
import styles from "../../../../styles/profiles/myprofile/posts/CreatePostOverlay.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";

const CreatePostOverlay = ({ onNewPost }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleOverlayToggle = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const handleNewPost = async () => {
    if (onNewPost) {
      await onNewPost();
    }

    setTimeout(() => {
      setIsOverlayOpen(false);
    }, 2000);
  };

  return (
    <div>
      <button
        className={`${styles.createPostButton} ${
          isOverlayOpen ? styles.activeButton : ""
        }`}
        onClick={handleOverlayToggle}
      >
        <FontAwesomeIcon icon={isOverlayOpen ? faX : faPlus} />
        {isOverlayOpen ? " Close" : " Create Post"}
      </button>

      {isOverlayOpen && (
        <div className="overlay">
          <div className="overlay-content">
            <CreatePost onNewPost={handleNewPost} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePostOverlay;
