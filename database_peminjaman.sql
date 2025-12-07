-- SQL untuk tabel peminjaman (sudah ada di database Anda)
-- Struktur tabel yang digunakan:

-- Tabel pinjam
CREATE TABLE IF NOT EXISTS pinjam (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pengguna_id INT NOT NULL,
  tanggal_pinjam DATE NOT NULL,
  tanggal_kembali DATE NOT NULL,
  status ENUM('diproses', 'disetujui', 'ditolak', 'selesai') DEFAULT 'diproses',
  FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE
);

-- Tabel detail_pinjam
CREATE TABLE IF NOT EXISTS detail_pinjam (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pinjam_id INT NOT NULL,
  id_barang INT NOT NULL,
  kategori_barang ENUM('elektronik', 'habisPakai', 'olahraga', 'mobile') NOT NULL,
  jumlah INT NOT NULL,
  FOREIGN KEY (pinjam_id) REFERENCES pinjam(id) ON DELETE CASCADE
);

-- Index untuk performa query
CREATE INDEX idx_pengguna ON pinjam(pengguna_id);
CREATE INDEX idx_status ON pinjam(status);
CREATE INDEX idx_tanggal_pinjam ON pinjam(tanggal_pinjam);
CREATE INDEX idx_pinjam_id ON detail_pinjam(pinjam_id);
