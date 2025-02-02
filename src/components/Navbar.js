import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUser } from "react-icons/fa";
import styles from "./Navbar.module.css"; // Pastikan file ini ada

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <h2 className={styles.title}>Admin Panel</h2>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search..." />
      </div>
      <div className={styles.navIcons}>
        <button className={styles.iconButton}>
          <FaBell />
        </button>
        <button className={styles.iconButton}>
          <FaUser />
        </button>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
