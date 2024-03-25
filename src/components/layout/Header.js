import { Link } from "react-router-dom";
import Nav from "./Nav";
import styles from "../../styles/layout/Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.logoLink} to="/">
        <div className={styles.logo}>TweeMe</div>
      </Link>
      <Nav />
    </header>
  );
}

export default Header;
