# 🔧 Perbaikan File Object Error

## ❌ Error yang Muncul

```
Console Error (Server)
The first argument must be of type string or an instance of Buffer, ArrayBuffer, 
or Array or an Array-like Object. Received an instance of File

lib/action.js (63:22) @ tambahBarang
```

## 🐛 Penyebab Error

### Masalah di Form (`src/app/tambahBarang/page.jsx`):

**Input file memiliki `name="gambar"`:**
```javascript
<input
    name="gambar"  // ❌ Ini menyebabkan File object masuk ke FormData
    type="file"
    onChange={(e) => setFile(e.target.files[0])}
/>
```

**Flow yang salah:**
1. User pilih file → File object tersimpan di state `file`
2. Submit form → `new FormData(e.target)` membuat FormData
3. FormData otomatis include field `gambar` dengan **File object** (karena ada `name="gambar"`)
4. Upload gambar → dapat `fileName` (string)
5. `formData.append("gambar", fileName)` → Menambahkan field `gambar` lagi
6. FormData sekarang punya 2 field `gambar`:
   - `gambar[0]` = File object ❌
   - `gambar[1]` = string filename ✅
7. `formData.get("gambar")` → Mengembalikan yang pertama (File object) ❌
8. SQL execute dengan File object → **ERROR!**

## ✅ Solusi

### 1. Hapus `name="gambar"` dari Input File

```javascript
// SEBELUM ❌
<input
    name="gambar"  // Ini menyebabkan File object masuk FormData
    type="file"
    onChange={(e) => setFile(e.target.files[0])}
/>

// SESUDAH ✅
<input
    id="gambar"
    type="file"  // Tidak ada name, jadi tidak masuk FormData otomatis
    onChange={(e) => setFile(e.target.files[0])}
/>
```

### 2. Gunakan `formData.set()` Bukan `append()`

```javascript
// SEBELUM ❌
const formData = new FormData(e.target);
if (fileName) {
    formData.append("gambar", fileName); // append menambahkan, tidak replace
}

// SESUDAH ✅
const formData = new FormData(e.target);
if (fileName) {
    formData.set("gambar", fileName); // set() replace/add value
} else {
    formData.set("gambar", ""); // Set empty string jika tidak ada gambar
}
```

**Perbedaan `append()` vs `set()`:**
- `append()` → Menambahkan value baru (bisa multiple values untuk 1 key)
- `set()` → Replace value jika key sudah ada, atau add jika belum ada

### 3. Handle Null/Empty di Server

```javascript
// Di lib/action.js
const gambar = formData.get("gambar") || null; // Default ke null jika empty string
```

### 4. Tambah Feedback UI

```javascript
{file && (
    <p className="text-xs text-gray-500 mt-1">
        File dipilih: {file.name}
    </p>
)}
```

### 5. Reset Form Setelah Submit

```javascript
await tambahBarang(formData);
alert("Barang berhasil ditambahkan!");

// Reset form dan file state
e.target.reset();
setFile(null);
```

## 🔄 Flow yang Benar

### Upload dengan Gambar:
1. User pilih file → `setFile(file)` ✅
2. User submit → `handleSubmit` dipanggil ✅
3. Upload file ke `/api/gambar` → dapat `fileName` (string) ✅
4. `new FormData(e.target)` → FormData tanpa field `gambar` ✅
5. `formData.set("gambar", fileName)` → Set gambar dengan string ✅
6. `tambahBarang(formData)` → Execute SQL dengan string ✅
7. Data tersimpan dengan nama file gambar ✅

### Upload tanpa Gambar:
1. User tidak pilih file → `file = null` ✅
2. User submit → `handleSubmit` dipanggil ✅
3. Skip upload (karena `file = null`) ✅
4. `formData.set("gambar", "")` → Set gambar dengan empty string ✅
5. `tambahBarang(formData)` → Execute SQL dengan null ✅
6. Data tersimpan tanpa gambar ✅

## 📊 Tipe Data yang Benar

### FormData Values:
```javascript
// ❌ SALAH - File object
formData.set("gambar", fileObject); // File { name: "image.jpg", ... }

// ✅ BENAR - String filename
formData.set("gambar", "1234567890-image.jpg"); // String

// ✅ BENAR - Empty string
formData.set("gambar", ""); // String (empty)

// ✅ BENAR - Null
formData.set("gambar", null); // null
```

### SQL Values:
```javascript
// ✅ BENAR
await connection.execute(
    "INSERT INTO allbarang (..., gambar) VALUES (?, ?, ?, ?, ?)",
    [namaBarang, deskripsi, stok, kategori, "filename.jpg"] // String
);

// ✅ BENAR
await connection.execute(
    "INSERT INTO allbarang (..., gambar) VALUES (?, ?, ?, ?, ?)",
    [namaBarang, deskripsi, stok, kategori, null] // null
);

// ❌ SALAH
await connection.execute(
    "INSERT INTO allbarang (..., gambar) VALUES (?, ?, ?, ?, ?)",
    [namaBarang, deskripsi, stok, kategori, fileObject] // File object ❌
);
```

## ✅ Testing

Pastikan fitur berikut berfungsi:

1. ✅ Tambah barang **dengan gambar**
   - Pilih file
   - Submit form
   - File ter-upload
   - Data tersimpan dengan nama file

2. ✅ Tambah barang **tanpa gambar**
   - Tidak pilih file
   - Submit form
   - Data tersimpan dengan gambar = null

3. ✅ UI feedback
   - Nama file muncul setelah dipilih
   - Loading state saat submit
   - Form reset setelah berhasil

4. ✅ Error handling
   - Upload gagal → tampilkan error
   - Submit gagal → tampilkan error

## 🎯 Hasil

✅ **File Object Error hilang**  
✅ **FormData hanya berisi string filename, bukan File object**  
✅ **SQL execute dengan tipe data yang benar**  
✅ **Form reset setelah submit berhasil**  
✅ **UI feedback untuk file yang dipilih**

## 📝 Catatan Penting

### Kesalahan Umum dengan FormData:

```javascript
// ❌ SALAH - Input file dengan name
<input name="file" type="file" />
// FormData akan berisi File object

// ✅ BENAR - Input file tanpa name
<input type="file" onChange={handleChange} />
// FormData tidak berisi File object
// Kita kontrol manual kapan dan apa yang di-set
```

### Tips FormData:

1. **Jangan beri `name` pada input file** jika ingin kontrol manual
2. **Gunakan `set()`** untuk replace value
3. **Gunakan `append()`** untuk multiple values
4. **Cek tipe data** sebelum kirim ke server
5. **Handle empty/null** dengan baik

### Debugging FormData:

```javascript
// Lihat isi FormData
for (let [key, value] of formData.entries()) {
    console.log(key, value, typeof value);
}

// Output yang benar:
// namaBarang "Laptop" string
// deskripsi "..." string
// stok "10" string
// kategori "elektronik" string
// gambar "1234567890-laptop.jpg" string ✅

// Output yang salah:
// gambar File { name: "laptop.jpg", ... } object ❌
```
