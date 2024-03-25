import React, { useEffect } from "react";
import useApi from "../../../hooks/useApi";
import { baseUrl } from "../../../settings/api";
import { useMyAuth } from "../../../settings/auth";
import styles from "../../../styles/posts/author/Author.module.css";

const Author = ({ authorId, onAuthorName }) => {
  const authToken = useMyAuth();
  const authorUrl = `${baseUrl}posts/${authorId}?_author=true`;

  const { data, isLoading, isError } = useApi(authorUrl, authToken);

  useEffect(() => {
    if (data && data.author && onAuthorName) {
      onAuthorName(data.author.name);
    }
  }, [data, onAuthorName]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An Error Occurred</div>;
  }

  return (
    <div>
      <div className={styles.author}>
        {data.author.avatar ? (
          <img src={data.author.avatar} alt={data.author.name} />
        ) : (
          <img
            src="https://eu.ui-avatars.com/api/?name=John+Doe&size=250"
            alt="Placeholder"
          />
        )}
        <p>{data.author.name}</p>
      </div>
    </div>
  );
};

export default Author;
