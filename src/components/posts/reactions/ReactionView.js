import React, { useEffect, useState, useCallback } from "react";
import { baseUrl } from "../../../settings/api";
import { useMyAuth } from "../../../settings/auth";
import styles from "../../../styles/posts/reactions/ReactionView.module.css";

const ReactionView = ({ reactionId, reactionsCount, onNewReaction }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const authToken = useMyAuth();
  const viewReactionsUrl = baseUrl + `posts/${reactionId}?_reactions=true`;

  const fetchReactions = useCallback(async () => {
    try {
      const response = await fetch(viewReactionsUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result.reactions || []);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }, [viewReactionsUrl, authToken]);

  useEffect(() => {
    fetchReactions();
  }, [reactionsCount, fetchReactions]);

  useEffect(() => {
    if (typeof onNewReaction === "function") {
      fetchReactions();
    }
  }, [onNewReaction, fetchReactions]);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (isError) {
    return <div className={styles.error}>An Error Occurred</div>;
  }

  return (
    <div className={styles.emojiScroll}>
      {data.map((reaction, index) => (
        <div key={index}>
          <div className={styles.emojiSymbol}>
            {reaction.symbol} ({reaction.count})
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReactionView;
