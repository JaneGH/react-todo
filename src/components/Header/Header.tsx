import React from "react";
import Navigation from "../Navigation/Navigation";
import logo from "../../assets/logo.png";
import styles from "./Header.module.css";
import { useTheme } from "../../context/ThemeContext";

const Header: React.FC = () => {
  const { isNightMode, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Todo logo" />
        <span className={styles.logoText}>Daily Tasks</span>
      </div>
      <div className={styles.navAndToggle}>
        <Navigation />
        <button className={styles.themeToggle} onClick={toggleTheme}>
          {isNightMode ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
};

export default Header;
