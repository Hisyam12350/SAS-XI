-- Update struktur tabel allbarang untuk menambahkan kolom kategori dan gambar
-- Jalankan query ini di database MySQL Anda

-- Cek struktur tabel saat ini
DESCRIBE allbarang;

-- Tambahkan kolom kategori dan gambar jika belum ada
ALTER TABLE allbarang 
ADD COLUMN IF NOT EXISTS kategori ENUM('elektronik', 'mabler', 'olahraga', 'habisPakai') DEFAULT NULL,
ADD COLUMN IF NOT EXISTS gambar VARCHAR(255) DEFAULT NULL;

-- Verifikasi perubahan
DESCRIBE allbarang;

-- Update data existing dengan kategori berdasarkan nama barang (opsional)
UPDATE allbarang 
SET kategori = CASE
    WHEN LOWER(namaBarang) LIKE '%laptop%' OR LOWER(namaBarang) LIKE '%pc%' OR LOWER(namaBarang) LIKE '%proyektor%' OR LOWER(namaBarang) LIKE '%kamera%' OR LOWER(namaBarang) LIKE '%kabel%' THEN 'elektronik'
    WHEN LOWER(namaBarang) LIKE '%kursi%' OR LOWER(namaBarang) LIKE '%meja%' OR LOWER(namaBarang) LIKE '%papan%' OR LOWER(namaBarang) LIKE '%rak%' OR LOWER(namaBarang) LIKE '%kabinet%' THEN 'mabler'
    WHEN LOWER(namaBarang) LIKE '%bola%' OR LOWER(namaBarang) LIKE '%matras%' THEN 'olahraga'
    WHEN LOWER(namaBarang) LIKE '%pembersih%' OR LOWER(namaBarang) LIKE '%baterai%' OR LOWER(namaBarang) LIKE '%lakban%' THEN 'habisPakai'
    ELSE NULL
END
WHERE kategori IS NULL;

-- Lihat hasil
SELECT id, namaBarang, kategori, gambar FROM allbarang;
