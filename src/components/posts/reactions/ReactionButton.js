import React from "react";

const EmojiButton = ({ emoji, onEmojiClick }) => {
  return (
    <span
      role="img"
      aria-label={emoji}
      style={{ cursor: "pointer" }}
      onClick={() => onEmojiClick(emoji)}
    >
      {emoji}
    </span>
  );
};

export default EmojiButton;
