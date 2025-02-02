import { NavLink } from "react-router-dom"
import { FaUserMd, FaUser, FaCalendarAlt, FaBed, FaHospital } from "react-icons/fa"
import styles from "./Sidebar.module.css"

const Sidebar = () => {
  const menuItems = [
    { to: "/dokter", icon: FaUserMd, label: "Dokter" },
    { to: "/pasien", icon: FaUser, label: "Pasien" },
    { to: "/janji-temu", icon: FaCalendarAlt, label: "Janji Temu" },
    { to: "/kamar", icon: FaBed, label: "Kamar" },
  ]

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <FaHospital />
        <h1>RSUD Sehat</h1>
      </div>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`}
          >
            <item.icon className={styles.icon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar

