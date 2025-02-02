import { useEffect, useState } from "react"
import { getKamar, createKamar, updateKamar, deleteKamar } from "../api/api"
import styles from "./Kamar.module.css"
import { FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa"

const Kamar = () => {
  const [kamarList, setKamarList] = useState([])
  const [nomor, setNomor] = useState("")
  const [jenis, setJenis] = useState("")
  const [status, setStatus] = useState("Tersedia")
  const [idEdit, setIdEdit] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterJenis, setFilterJenis] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    fetchKamar()
  }, [])

  const fetchKamar = async () => {
    try {
      const response = await getKamar()
      setKamarList(response.data)
    } catch (error) {
      console.error("Error fetching rooms:", error)
      alert("Terjadi kesalahan saat mengambil data kamar.")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const kamarData = { nomor: Number.parseInt(nomor), jenis, status }
    try {
      if (idEdit) {
        await updateKamar(idEdit, kamarData)
      } else {
        await createKamar(kamarData)
      }
      resetForm()
      fetchKamar()
    } catch (error) {
      console.error("Error saving room:", error)
      alert("Terjadi kesalahan saat menyimpan data kamar.")
    }
  }

  const handleEdit = (kamar) => {
    setNomor(kamar.nomor)
    setJenis(kamar.jenis)
    setStatus(kamar.status)
    setIdEdit(kamar._id)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kamar ini?")) {
      try {
        await deleteKamar(id)
        fetchKamar()
      } catch (error) {
        console.error("Error deleting room:", error)
        alert("Terjadi kesalahan saat menghapus kamar.")
      }
    }
  }

  const resetForm = () => {
    setNomor("")
    setJenis("")
    setStatus("Tersedia")
    setIdEdit(null)
  }

  const filteredKamar = kamarList.filter((kamar) => {
    const matchesSearch = kamar.nomor.toString().includes(searchTerm)
    const matchesJenis = filterJenis === "all" || kamar.jenis === filterJenis
    const matchesStatus = filterStatus === "all" || kamar.status === filterStatus
    return matchesSearch && matchesJenis && matchesStatus
  })

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manajemen Kamar</h1>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>{idEdit ? "Edit Kamar" : "Tambah Kamar Baru"}</h2>
          <div className={styles.formGroup}>
            <label htmlFor="nomor">Nomor Kamar</label>
            <input id="nomor" type="number" value={nomor} onChange={(e) => setNomor(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="jenis">Jenis Kamar</label>
            <select id="jenis" value={jenis} onChange={(e) => setJenis(e.target.value)} required>
              <option value="">Pilih Jenis Kamar</option>
              <option value="VIP">VIP</option>
              <option value="Standar">Standar</option>
              <option value="ICU">ICU</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="status">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="Tersedia">Tersedia</option>
              <option value="Terisi">Terisi</option>
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
                  <FaPlus /> Tambah
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
          <h2>Daftar Kamar</h2>
          <div className={styles.filters}>
            <div className={styles.searchBox}>
              <FaSearch />
              <input
                type="text"
                placeholder="Cari nomor kamar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={filterJenis}
              onChange={(e) => setFilterJenis(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Semua Jenis</option>
              <option value="VIP">VIP</option>
              <option value="Standar">Standar</option>
              <option value="ICU">ICU</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Semua Status</option>
              <option value="Tersedia">Tersedia</option>
              <option value="Terisi">Terisi</option>
            </select>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nomor</th>
                <th>Jenis</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredKamar.map((kamar) => (
                <tr key={kamar._id}>
                  <td>{kamar.nomor}</td>
                  <td>{kamar.jenis}</td>
                  <td>
                    <span className={`${styles.status} ${styles[kamar.status.toLowerCase()]}`}>{kamar.status}</span>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(kamar)} className={styles.editButton}>
                      <FaEdit /> Edit
                    </button>
                    <button onClick={() => handleDelete(kamar._id)} className={styles.deleteButton}>
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

export default Kamar

