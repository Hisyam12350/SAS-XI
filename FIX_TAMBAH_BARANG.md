# Fix Error Tambah Barang - Kategori dan Gambar

## Masalah
- Tidak bisa menambah gambar saat tambah barang
- Kategori tidak terdeteksi/tersimpan

## Penyebab
Fungsi `tambahBarang` di `lib/action.js` tidak menyimpan data kategori dan gambar ke database.

## Solusi

### 1. Update Struktur Database
Jalankan query SQL berikut di database MySQL:

```sql
-- Tambahkan kolom kategori dan gambar
ALTER TABLE allbarang 
ADD COLUMN IF NOT EXISTS kategori ENUM('elektronik', 'mabler', 'olahraga', 'habisPakai') DEFAULT NULL,
ADD COLUMN IF NOT EXISTS gambar VARCHAR(255) DEFAULT NULL;
```

File SQL lengkap: `UPDATE_ALLBARANG_TABLE.sql`

### 2. Update Fungsi `tambahBarang`
File: `lib/action.js`

**Sebelum:**
```javascript
export async function tambahBarang (formData){
    const connection = await getConnection();
    const namaBarang = formData.get("namaBarang");
    const deskripsi = formData.get("deskripsi");
    const stok = formData.get("stok");
    await connection.execute(
        "insert into allbarang (namaBarang, deskripsi, stok) values (?, ?, ?)",
        [namaBarang, deskripsi, stok]
    )
    revalidatePath('/sekertaris');
    return { success: true };
}
```

**Sesudah:**
```javascript
export async function tambahBarang (formData){
    const connection = await getConnection();
    const namaBarang = formData.get("namaBarang");
    const deskripsi = formData.get("deskripsi");
    const stok = formData.get("stok");
    const kategori = formData.get("kategori");
    const gambar = formData.get("gambar");
    
    await connection.execute(
        "insert into allbarang (namaBarang, deskripsi, stok, kategori, gambar) values (?, ?, ?, ?, ?)",
        [namaBarang, deskripsi, stok, kategori, gambar || null]
    )
    revalidatePath('/sekertaris');
    return { success: true };
}
```

### 3. Update Fungsi `editBarang`
Menambahkan support untuk update kategori dan gambar saat edit barang.

### 4. Update Halaman Edit Barang
File: `src/app/editBarang/[id]/page.jsx`
- Menambahkan dropdown kategori
- Menampilkan gambar saat ini jika ada

## Cara Menggunakan

### Tambah Barang Baru:
1. Login sebagai sekretaris
2. Klik "Tambah Barang"
3. Isi form:
   - Nama Barang
   - Deskripsi
   - Stok
   - **Kategori** (pilih dari dropdown)
   - **Gambar** (upload file gambar)
4. Klik "Tambah Barang"

### Edit Barang:
1. Di halaman sekretaris, klik "edit" pada barang
2. Update data yang diperlukan termasuk kategori
3. Klik "Simpan"

## Kategori yang Tersedia
- **elektronik** - Laptop, PC, Proyektor, Kamera, Kabel Roll
- **mabler** - Kursi, Meja, Papan Tulis, Rak Buku, Kabinet
- **olahraga** - Bola, Matras
- **habisPakai** - Pembersih, Baterai, Lakban

## Upload Gambar
- Gambar akan disimpan di folder `public/uploads/`
- Format nama file: `timestamp-namafile.jpg`
- Gambar dapat diakses via `/uploads/namafile.jpg`

## Testing
1. Jalankan query SQL untuk update tabel
2. Restart development server
3. Test tambah barang dengan kategori dan gambar
4. Verifikasi data tersimpan di database
5. Cek gambar muncul di halaman home

## Catatan
- Pastikan folder `public/uploads/` memiliki permission write
- Gambar yang diupload akan otomatis diberi nama unik dengan timestamp
- Jika tidak upload gambar, field gambar akan NULL di database
