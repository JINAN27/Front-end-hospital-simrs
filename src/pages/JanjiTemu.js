import { useEffect, useState } from "react"
import { getJanjiTemu, createJanjiTemu, updateJanjiTemu, deleteJanjiTemu, getDokter, getPasien } from "../api/api"
import styles from "./JanjiTemu.module.css"
import { FaCalendarPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa"

const JanjiTemu = () => {
  const [janjiTemuList, setJanjiTemuList] = useState([])
  const [dokterList, setDokterList] = useState([])
  const [pasienList, setPasienList] = useState([])
  const [dokter, setDokter] = useState("")
  const [pasien, setPasien] = useState("")
  const [tanggal, setTanggal] = useState("")
  const [status, setStatus] = useState("Dijadwalkan")
  const [idEdit, setIdEdit] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    fetchJanjiTemu()
    fetchDokter()
    fetchPasien()
  }, [])

  const fetchJanjiTemu = async () => {
    const response = await getJanjiTemu()
    setJanjiTemuList(response.data)
  }

  const fetchDokter = async () => {
    const response = await getDokter()
    setDokterList(response.data)
  }

  const fetchPasien = async () => {
    const response = await getPasien()
    setPasienList(response.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const janjiTemuData = { dokter, pasien, tanggal, status }
    try {
      if (idEdit) {
        await updateJanjiTemu(idEdit, janjiTemuData)
      } else {
        await createJanjiTemu(janjiTemuData)
      }
      resetForm()
      fetchJanjiTemu()
    } catch (error) {
      console.error("Error saving appointment:", error)
      alert("Terjadi kesalahan saat menyimpan janji temu.")
    }
  }

  const handleEdit = (janji) => {
    setDokter(janji.dokter._id)
    setPasien(janji.pasien._id)
    setTanggal(janji.tanggal.split("T")[0])
    setStatus(janji.status)
    setIdEdit(janji._id)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus janji temu ini?")) {
      try {
        await deleteJanjiTemu(id)
        fetchJanjiTemu()
      } catch (error) {
        console.error("Error deleting appointment:", error)
        alert("Terjadi kesalahan saat menghapus janji temu.")
      }
    }
  }

  const resetForm = () => {
    setDokter("")
    setPasien("")
    setTanggal("")
    setStatus("Dijadwalkan")
    setIdEdit(null)
  }

  const filteredJanjiTemu = janjiTemuList.filter((janji) => {
    const matchesSearch =
      janji.dokter.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      janji.pasien.nama.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || janji.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manajemen Janji Temu</h1>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>{idEdit ? "Edit Janji Temu" : "Tambah Janji Temu Baru"}</h2>
          <div className={styles.formGroup}>
            <label htmlFor="dokter">Dokter</label>
            <select id="dokter" value={dokter} onChange={(e) => setDokter(e.target.value)} required>
              <option value="">Pilih Dokter</option>
              {dokterList.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.nama}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="pasien">Pasien</label>
            <select id="pasien" value={pasien} onChange={(e) => setPasien(e.target.value)} required>
              <option value="">Pilih Pasien</option>
              {pasienList.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.nama}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tanggal">Tanggal</label>
            <input id="tanggal" type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="status">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="Dijadwalkan">Dijadwalkan</option>
              <option value="Selesai">Selesai</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              {idEdit ? (
                <>
                  <FaEdit /> Update
                </>
              ) : (
                <>
                  <FaCalendarPlus /> Tambah
                </>
              )}
            </button>
            {idEdit && (
              <button type="button" onClick={resetForm} className={styles.cancelButton}>
                Batal
              </button>
            )}
          </div>
        </form>
        <div className={styles.listContainer}>
          <h2>Daftar Janji Temu</h2>
          <div className={styles.filters}>
            <div className={styles.searchBox}>
              <FaSearch />
              <input
                type="text"
                placeholder="Cari dokter atau pasien..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={styles.statusFilter}
            >
              <option value="all">Semua Status</option>
              <option value="Dijadwalkan">Dijadwalkan</option>
              <option value="Selesai">Selesai</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Dokter</th>
                <th>Pasien</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredJanjiTemu.map((janji) => (
                <tr key={janji._id}>
                  <td>{janji.dokter.nama}</td>
                  <td>{janji.pasien.nama}</td>
                  <td>
                    {new Date(janji.tanggal).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td>
                    <span className={`${styles.status} ${styles[janji.status.toLowerCase()]}`}>{janji.status}</span>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(janji)} className={styles.editButton}>
                      <FaEdit /> Edit
                    </button>
                    <button onClick={() => handleDelete(janji._id)} className={styles.deleteButton}>
                      <FaTrash /> Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default JanjiTemu

