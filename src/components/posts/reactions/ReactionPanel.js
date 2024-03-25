import React, { useState } from "react";
import EmojiButton from "./ReactionButton";
import { useMyAuth } from "../../../settings/auth";
import { baseUrl } from "../../../settings/api";
import styles from "../../../styles/posts/reactions/ReactionPanel.module.css";

const EmojiReactionPanel = ({ postId, onNewReaction }) => {
  const authToken = useMyAuth();
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleButtonClick = () => {
    setShowEmojis(!showEmojis);
    setErrorMessage(null);
  };

  const handleEmojiClick = async (emoji) => {
    try {
      const reactionUrl =
        baseUrl + `posts/${postId}/react/${encodeURIComponent(emoji)}`;
      const response = await fetch(reactionUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({
          emoji: emoji,
        }),
      });

      if (!response.ok) {
        const errorMessage = `Failed to send reaction`;
        setErrorMessage(errorMessage);
        throw new Error(errorMessage);
      }

      onNewReaction();

      setSelectedEmoji(emoji);

      setShowEmojis(false);
    } catch (error) {
      console.error("Error sending reaction:", error.message);
    }
  };

  return (
    <div>
      <button
        className={`${styles.reactButton} ${
          selectedEmoji ? styles.reacted : ""
        }`}
        onClick={handleButtonClick}
      >
        {selectedEmoji ? (
          <span role="img" aria-label="Selected Emoji">
            You reacted with {selectedEmoji}
          </span>
        ) : (
          "React"
        )}
      </button>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      {showEmojis && (
        <div className={styles.emojis}>
          <EmojiButton emoji="👍" onEmojiClick={handleEmojiClick} />
          <EmojiButton emoji="❤️" onEmojiClick={handleEmojiClick} />
          <EmojiButton emoji="😄" onEmojiClick={handleEmojiClick} />
          <EmojiButton emoji="😍" onEmojiClick={handleEmojiClick} />
          <EmojiButton emoji="😂" onEmojiClick={handleEmojiClick} />
          <EmojiButton emoji="😎" onEmojiClick={handleEmojiClick} />
          <EmojiButton emoji="🥹" onEmojiClick={handleEmojiClick} />
          <EmojiButton emoji="😡" onEmojiClick={handleEmojiClick} />
          <EmojiButton emoji="🥴" onEmojiClick={handleEmojiClick} />
          <EmojiButton emoji="🤓" onEmojiClick={handleEmojiClick} />
          <EmojiButton emoji="🙈" onEmojiClick={handleEmojiClick} />
          <EmojiButton emoji="😜" onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiReactionPanel;
