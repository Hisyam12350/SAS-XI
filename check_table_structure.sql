-- -- Query untuk mengecek struktur tabel allbarang
-- DESCRIBE allbarang;

-- -- Atau gunakan:
-- SHOW COLUMNS FROM allbarang;

-- -- Jika kolom kategori dan gambar belum ada, tambahkan dengan:
-- ALTER TABLE allbarang 
-- ADD COLUMN kategori ENUM('elektronik', 'mabler', 'olahraga', 'habisPakai') DEFAULT NULL,
-- ADD COLUMN gambar VARCHAR(255) DEFAULT NULL;
