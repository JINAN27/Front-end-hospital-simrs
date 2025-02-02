import { useEffect, useState } from "react"
import { getDokter, createDokter, updateDokter, deleteDokter } from "../api/api"
import styles from "./Dokter.module.css"

const Dokter = () => {
  const [dokterList, setDokterList] = useState([])
  const [nama, setNama] = useState("")
  const [spesialis, setSpesialis] = useState("")
  const [noHp, setNoHp] = useState("")
  const [jadwal, setJadwal] = useState("")
  const [idEdit, setIdEdit] = useState(null)

  useEffect(() => {
    fetchDokter()
  }, [])

  const fetchDokter = async () => {
    try {
      const response = await getDokter()
      setDokterList(response.data)
    } catch (error) {
      console.error("Gagal mengambil data dokter:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const dokterData = { nama, spesialis, no_hp: noHp, jadwal }

    try {
      if (idEdit) {
        await updateDokter(idEdit, dokterData)
      } else {
        await createDokter(dokterData)
      }
      resetForm()
      fetchDokter()
    } catch (error) {
      console.error("Gagal menyimpan data dokter:", error)
    }
  }

  const handleEdit = (dokter) => {
    setNama(dokter.nama)
    setSpesialis(dokter.spesialis)
    setNoHp(dokter.no_hp)
    setJadwal(dokter.jadwal)
    setIdEdit(dokter._id)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus dokter ini?")) {
      try {
        await deleteDokter(id)
        fetchDokter()
      } catch (error) {
        console.error("Gagal menghapus data dokter:", error)
      }
    }
  }

  const resetForm = () => {
    setNama("")
    setSpesialis("")
    setNoHp("")
    setJadwal("")
    setIdEdit(null)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manajemen Dokter</h1>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>{idEdit ? "Edit Dokter" : "Tambah Dokter Baru"}</h2>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama Dokter"
            required
          />
          <input
            type="text"
            value={spesialis}
            onChange={(e) => setSpesialis(e.target.value)}
            placeholder="Spesialis"
            required
          />
          <input type="text" value={noHp} onChange={(e) => setNoHp(e.target.value)} placeholder="No HP" required />
          <input type="text" value={jadwal} onChange={(e) => setJadwal(e.target.value)} placeholder="Jadwal" required />
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              {idEdit ? "Update" : "Tambah"}
            </button>
            {idEdit && (
              <button type="button" onClick={resetForm} className={styles.cancelButton}>
                Batal
              </button>
            )}
          </div>
        </form>
        <div className={styles.listContainer}>
          <h2>Daftar Dokter</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Spesialis</th>
                <th>No HP</th>
                <th>Jadwal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dokterList.map((dokter) => (
                <tr key={dokter._id}>
                  <td>{dokter.nama}</td>
                  <td>{dokter.spesialis}</td>
                  <td>{dokter.no_hp}</td>
                  <td>{dokter.jadwal}</td>
                  <td>
                    <button onClick={() => handleEdit(dokter)} className={styles.editButton}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(dokter._id)} className={styles.deleteButton}>
                      Hapus
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

export default Dokter

