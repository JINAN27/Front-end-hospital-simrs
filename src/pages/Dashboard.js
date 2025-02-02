import styles from "./Dashboard.module.css"
import { FaUserMd, FaBed, FaCalendarCheck, FaChartLine } from "react-icons/fa"

const Dashboard = () => {
  const stats = [
    { icon: <FaUserMd />, title: "Dokter", value: 5 },
    { icon: <FaBed />, title: "Kamar", value: 10 },
    { icon: <FaCalendarCheck />, title: "Janji Temu", value: 5 },
    { icon: <FaChartLine />, title: "Pasien Baru", value: "+15%" },
  ]

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Dashboard SIMRS</h1>
        <p>Sistem Informasi Manajemen Rumah Sakit</p>
      </header>
      <main className={styles.main}>
        <section className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statInfo}>
                <h2>{stat.value}</h2>
                <p>{stat.title}</p>
              </div>
            </div>
          ))}
        </section>
        <section className={styles.recentActivity}>
          <h2>Aktivitas Terkini</h2>
          <ul>
            <li>Dr. Andi Wijaya melakukan pemeriksaan pada pasien kamar 012</li>
            <li>Pasien baru terdaftar: Budi Santoso</li>
            <li>Stok obat Paracetamol perlu diisi ulang</li>
            <li>Jadwal operasi untuk besok telah diperbarui</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default Dashboard

