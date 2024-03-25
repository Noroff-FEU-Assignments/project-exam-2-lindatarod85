import React from "react";
import styles from "../../styles/user/ResultMessage.module.css";

const ResultMessage = ({ Result }) => {
  if (!Result) {
    return null;
  }

  const messageClass = Result.success
    ? styles.success
    : Result.error
    ? styles.error
    : "";

  if (Result.success || Result.error) {
    return (
      <div>
        <p className={messageClass}>{Result.message}</p>
      </div>
    );
  }

  return null;
};

export default ResultMessage;
