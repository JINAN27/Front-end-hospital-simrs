import { useEffect, useState } from "react"
import { getPasien, createPasien, updatePasien, deletePasien } from "../api/api"
import styles from "./Pasien.module.css"
import { FaUserPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa"

const Pasien = () => {
  const [pasienList, setPasienList] = useState([])
  const [nama, setNama] = useState("")
  const [umur, setUmur] = useState("")
  const [alamat, setAlamat] = useState("")
  const [riwayatMedis, setRiwayatMedis] = useState("")
  const [idEdit, setIdEdit] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  useEffect(() => {
    fetchPasien()
  }, [])

  const fetchPasien = async () => {
    try {
      const response = await getPasien()
      setPasienList(response.data)
    } catch (error) {
      console.error("Error fetching patients:", error)
      alert("Terjadi kesalahan saat mengambil data pasien.")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const pasienData = { nama, umur, alamat, riwayat_medis: riwayatMedis }
    try {
      if (idEdit) {
        await updatePasien(idEdit, pasienData)
      } else {
        await createPasien(pasienData)
      }
      resetForm()
      fetchPasien()
    } catch (error) {
      console.error("Error saving patient:", error)
      alert("Terjadi kesalahan saat menyimpan data pasien.")
    }
  }

  const handleEdit = (pasien) => {
    setNama(pasien.nama)
    setUmur(pasien.umur)
    setAlamat(pasien.alamat)
    setRiwayatMedis(pasien.riwayat_medis || "")
    setIdEdit(pasien._id)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data pasien ini?")) {
      try {
        await deletePasien(id)
        fetchPasien()
      } catch (error) {
        console.error("Error deleting patient:", error)
        alert("Terjadi kesalahan saat menghapus data pasien.")
      }
    }
  }

  const resetForm = () => {
    setNama("")
    setUmur("")
    setAlamat("")
    setRiwayatMedis("")
    setIdEdit(null)
  }

  const filteredPasien = pasienList.filter((pasien) => pasien.nama.toLowerCase().includes(searchTerm.toLowerCase()))

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredPasien.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manajemen Pasien</h1>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>{idEdit ? "Edit Pasien" : "Tambah Pasien Baru"}</h2>
          <div className={styles.formGroup}>
            <label htmlFor="nama">Nama Pasien</label>
            <input id="nama" type="text" value={nama} onChange={(e) => setNama(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="umur">Umur</label>
            <input id="umur" type="number" value={umur} onChange={(e) => setUmur(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="alamat">Alamat</label>
            <input id="alamat" type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="riwayatMedis">Riwayat Medis</label>
            <textarea
              id="riwayatMedis"
              value={riwayatMedis}
              onChange={(e) => setRiwayatMedis(e.target.value)}
              placeholder="Opsional"
            />
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              {idEdit ? (
                <>
                  <FaEdit /> Update
                </>
              ) : (
                <>
                  <FaUserPlus /> Tambah
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
          <h2>Daftar Pasien</h2>
          <div className={styles.searchBox}>
            <FaSearch />
            <input
              type="text"
              placeholder="Cari pasien..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Umur</th>
                <th>Alamat</th>
                <th>Riwayat Medis</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((pasien) => (
                <tr key={pasien._id}>
                  <td>{pasien.nama}</td>
                  <td>{pasien.umur} tahun</td>
                  <td>{pasien.alamat}</td>
                  <td>{pasien.riwayat_medis || "Tidak ada"}</td>
                  <td>
                    <button onClick={() => handleEdit(pasien)} className={styles.editButton}>
                      <FaEdit /> Edit
                    </button>
                    <button onClick={() => handleDelete(pasien._id)} className={styles.deleteButton}>
                      <FaTrash /> Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>
            {Array.from({ length: Math.ceil(filteredPasien.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? styles.activePage : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pasien

