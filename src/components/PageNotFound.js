import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className={styles.goHome} to="/">
        Go to Home Page
      </Link>
    </div>
  );
};

export default PageNotFound;
