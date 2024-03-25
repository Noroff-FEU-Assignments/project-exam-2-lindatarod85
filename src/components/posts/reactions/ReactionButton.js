import React from "react";

const EmojiButton = ({ emoji, onEmojiClick }) => {
  return <img src={emoji} alt={emoji} onClick={() => onEmojiClick(emoji)} />;
};

export default EmojiButton;
