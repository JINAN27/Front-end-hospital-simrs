import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Dokter from "./pages/Dokter"
import Pasien from "./pages/Pasien"
import JanjiTemu from "./pages/JanjiTemu"
import Kamar from "./pages/Kamar"
import Auth from "./pages/Auth"
import ProtectedRoute from "./components/ProtectedRoute"
import styles from "./App.module.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth type="login" />} />
        <Route path="/register" element={<Auth type="register" />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className={styles.app}>
                <Sidebar />
                <div className={styles.mainContent}>
                  <Navbar />
                  <main className={styles.pageContent}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dokter" element={<Dokter />} />
                      <Route path="/pasien" element={<Pasien />} />
                      <Route path="/janji-temu" element={<JanjiTemu />} />
                      <Route path="/kamar" element={<Kamar />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App

