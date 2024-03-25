import React, { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { clearStorage } from "../../utils/storage";
import styles from "../../styles/layout/Nav.module.css";

function Nav() {
  const { token, setToken } = useContext(AuthContext);
  const isUserLoggedIn = !!token;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    clearStorage();
    setToken("");
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <div
        className={`${styles.hamburger} hamburger`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        &#9776;
      </div>
      <ul className={`${styles.ul} ${isMenuOpen ? styles.active : ""}`}>
        {isUserLoggedIn ? (
          <>
            <li className={styles.li}>
              <NavLink
                className={styles.navLink}
                to="/posts"
                onClick={() => setIsMenuOpen(false)}
              >
                Posts
              </NavLink>
            </li>
            <li className={styles.li}>
              <NavLink
                className={styles.navLink}
                to="/profiles"
                onClick={() => setIsMenuOpen(false)}
              >
                Profiles
              </NavLink>
            </li>

            <li className={styles.li}>
              <NavLink
                className={styles.navLink}
                to="/myprofile"
                onClick={() => setIsMenuOpen(false)}
              >
                My Profile
              </NavLink>
            </li>

            <li className={styles.li}>
              <button className={styles.logout} onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className={styles.li}>
              <NavLink
                className={styles.navLink}
                to="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
            </li>
            <li className={styles.li}>
              <NavLink
                className={styles.navLink}
                to="/register"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
