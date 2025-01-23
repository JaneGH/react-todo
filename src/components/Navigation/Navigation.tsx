import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <ul className={styles.navList}>
          <li>
            <Link to="/" className={styles.navLink}>
              Todo List
            </Link>
          </li>
          <li>
            <Link to="/chart" className={styles.navLink}>
              Chart
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
