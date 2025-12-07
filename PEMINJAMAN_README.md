# Sistem Transaksi Peminjaman Barang

## Struktur Database

Sistem ini menggunakan 2 tabel yang sudah ada di database Anda:

### Tabel `pinjam`
- `id`: Primary key
- `pengguna_id`: Foreign key ke tabel pengguna
- `tanggal_pinjam`: Tanggal mulai pinjam
- `tanggal_kembali`: Tanggal rencana kembali
- `status`: ENUM('diproses', 'disetujui', 'ditolak', 'selesai')

### Tabel `detail_pinjam`
- `id`: Primary key
- `pinjam_id`: Foreign key ke tabel pinjam
- `id_barang`: ID barang yang dipinjam
- `kategori_barang`: ENUM('elektronik', 'habisPakai', 'olahraga', 'mobile')
- `jumlah`: Jumlah barang yang dipinjam

## Fitur yang Tersedia

### 1. Form Peminjaman (Modal di `/detailAlat/[id]`)
- Form peminjaman muncul sebagai modal di halaman detail alat
- User klik tombol "📌 Pinjam Alat" untuk membuka form
- Pilih jumlah barang yang dipinjam (max sesuai stok)
- Pilih tanggal pinjam dan tanggal kembali
- Validasi stok otomatis
- Kategori barang ditentukan otomatis berdasarkan nama barang
- Status awal: "Diproses" (menunggu persetujuan sekretaris)

### 2. Kelola Peminjaman Sekretaris (`/sekertaris/peminjaman`)
- Dashboard khusus untuk sekretaris mengelola peminjaman
- Statistik peminjaman (Diproses, Disetujui, Selesai, Ditolak)
- Tabel prioritas: Peminjaman yang perlu persetujuan
- Tabel riwayat: Semua peminjaman dengan filter status
- Tombol aksi berdasarkan status:
  - **Diproses**: Setujui atau Tolak
  - **Disetujui**: Tandai Selesai
  - **Semua status**: Hapus
- Join dengan tabel pengguna dan allbarang untuk detail lengkap

### 3. Riwayat Peminjaman User (`/pinjam/riwayat`)
- Lihat semua transaksi peminjaman
- Status peminjaman dengan badge warna
- Aksi pengelolaan peminjaman

## Fungsi-fungsi di lib/action.js

### `buatPeminjaman(formData)`
- Membuat transaksi peminjaman baru
- Insert ke tabel `pinjam` dan `detail_pinjam`
- Mengurangi stok barang otomatis
- Validasi stok tersedia
- Kategori barang ditentukan otomatis

### `ambilSemuaPeminjaman()`
- Mengambil semua data peminjaman
- JOIN dengan tabel `pengguna` dan `allbarang`
- Menampilkan detail lengkap peminjam dan barang

### `ambilPeminjamanByUserId(userId)`
- Mengambil peminjaman berdasarkan ID pengguna
- Berguna untuk user melihat riwayat peminjaman mereka sendiri

### `updateStatusPeminjaman(formData)`
- Update status peminjaman (disetujui, ditolak, selesai)
- Otomatis mengembalikan stok jika status ditolak atau selesai

### `hapusPeminjaman(formData)`
- Menghapus data peminjaman
- Hapus dari `detail_pinjam` terlebih dahulu (foreign key)
- Otomatis mengembalikan stok jika status belum selesai/ditolak

## Cara Menggunakan

### Untuk User:
1. **Login** terlebih dahulu dengan akun Anda
2. Buka halaman detail alat (`/detailAlat/[id]`)
3. Klik tombol "📌 Pinjam Alat" (jika belum login, akan muncul tombol "Login untuk Pinjam")
4. Modal form peminjaman akan muncul dengan info peminjam (nama & email) otomatis terisi
5. Isi form peminjaman (jumlah, tanggal pinjam, tanggal kembali)
6. Klik "Ajukan Peminjaman"
7. Status awal: "Diproses" (menunggu persetujuan)
8. Lihat status peminjaman di `/pinjam/riwayat` (hanya menampilkan peminjaman Anda)

### Untuk Sekretaris:
1. **Login** dengan akun sekretaris (role: 'sekertaris')
2. Akses halaman `/sekertaris` (protected - hanya sekretaris)
3. Klik menu "📋 Kelola Peminjaman"
4. Lihat statistik peminjaman (Diproses, Disetujui, Selesai, Ditolak)
5. Tabel prioritas menampilkan peminjaman yang perlu disetujui
6. Klik "Setujui" atau "Tolak" untuk memproses peminjaman
7. Untuk peminjaman yang disetujui, klik "Selesai" saat barang dikembalikan
8. Di `/pinjam/riwayat`, sekretaris bisa melihat SEMUA peminjaman dari semua user

## Flow Status Peminjaman

```
Diproses → Disetujui → Selesai
         ↘ Ditolak
```

- **Diproses**: Peminjaman baru dibuat, menunggu persetujuan
- **Disetujui**: Admin menyetujui peminjaman
- **Ditolak**: Admin menolak peminjaman (stok dikembalikan)
- **Selesai**: Barang sudah dikembalikan (stok dikembalikan)

## Fitur Otomatis

- ✅ Stok barang berkurang otomatis saat peminjaman dibuat
- ✅ Stok barang bertambah otomatis saat status ditolak atau selesai
- ✅ Stok barang bertambah otomatis saat peminjaman dihapus (jika belum selesai/ditolak)
- ✅ Validasi stok tersedia sebelum peminjaman
- ✅ Kategori barang ditentukan otomatis berdasarkan nama
- ✅ Revalidasi halaman otomatis setelah aksi
- ✅ Relasi database dengan foreign key untuk integritas data

## Struktur File

```
lib/
└── auth.js                           # Helper functions untuk autentikasi

src/app/
├── detailAlat/[id]/page.jsx          # Halaman detail alat dengan tombol pinjam
├── components/
│   ├── FormPinjamModal.jsx           # Modal form peminjaman (Client Component)
│   └── TombolAksiPeminjaman.jsx      # Tombol aksi untuk sekretaris (Client Component)
├── sekertaris/
│   ├── page.jsx                      # Dashboard sekretaris (protected)
│   └── peminjaman/page.jsx           # Halaman kelola peminjaman (protected)
└── pinjam/
    └── riwayat/page.jsx              # Halaman riwayat peminjaman (role-based)
```

## Sistem Autentikasi

Sistem peminjaman terintegrasi dengan NextAuth untuk autentikasi:

- **User ID otomatis**: Diambil dari session user yang login
- **Role-based access**: 
  - User biasa: Hanya bisa melihat peminjaman mereka sendiri
  - Sekretaris: Bisa melihat dan mengelola semua peminjaman
- **Protected routes**: Halaman sekretaris hanya bisa diakses oleh role 'sekertaris'
- **User info**: Nama dan email peminjam otomatis terisi dari data user yang login

## Catatan Penting

- ✅ User ID diambil otomatis dari session NextAuth
- ✅ Kategori barang ditentukan otomatis berdasarkan nama barang
- ✅ Sistem menggunakan relasi database yang sudah ada (pengguna, pinjam, detail_pinjam, allbarang)
- ✅ Form peminjaman menggunakan modal untuk UX yang lebih baik
- ✅ Sekretaris memiliki dashboard khusus untuk mengelola peminjaman
- ✅ Tombol aksi menggunakan Client Component untuk interaktivitas
- ✅ Role-based access control untuk keamanan
- ✅ User harus login untuk melakukan peminjaman
