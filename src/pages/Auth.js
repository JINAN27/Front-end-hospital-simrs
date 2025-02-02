import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/api"
import "./Auth.css" // We'll create this CSS file for styling

const Auth = ({ type }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = type === "login" ? "/auth/login" : "/auth/register"
      const response = await API.post(url, { username, password })

      if (type === "login") {
        localStorage.setItem("token", response.data.token)
        navigate("/")
      } else {
        alert("Registrasi berhasil! Silakan login.")
        navigate("/login")
      }
    } catch (error) {
      alert(error.response?.data?.message || "Terjadi kesalahan.")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{type === "login" ? "Login ke akun Anda" : "Buat akun baru"}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Masukkan username Anda"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Masukkan password Anda"
            />
          </div>
          <button type="submit" className="auth-button">
            {type === "login" ? "Login" : "Register"}
          </button>
        </form>
        <p className="auth-switch">
          {type === "login" ? (
            <>
              Belum punya akun?{" "}
              <a href="/register" className="auth-link">
                Daftar
              </a>
            </>
          ) : (
            <>
              Sudah punya akun?{" "}
              <a href="/login" className="auth-link">
                Login
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default Auth

