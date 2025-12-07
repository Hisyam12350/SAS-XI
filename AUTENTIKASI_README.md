# Sistem Autentikasi Role-Based

## Overview

Sistem autentikasi menggunakan NextAuth dengan role-based access control. User akan diarahkan ke halaman yang sesuai berdasarkan role mereka setelah login.

## Role yang Tersedia

1. **User Biasa** (role: null atau selain 'sekertaris')
   - Akses: `/home`, `/detailAlat`, `/kategori`, `/pinjam/riwayat`, `/profile`
   - Tidak bisa akses: `/sekertaris`

2. **Sekretaris** (role: 'sekertaris')
   - Akses: `/sekertaris`, `/sekertaris/peminjaman`, `/profile`
   - Tidak bisa akses: `/home`

## Flow Autentikasi

### Login
1. User mengisi email dan password di `/login`
2. NextAuth memvalidasi credentials dengan database
3. Jika valid, session dibuat dengan data user (id, name, email, role)
4. Redirect otomatis berdasarkan role:
   - **Sekretaris** → `/sekertaris`
   - **User biasa** → `/home`

### Protected Routes (Middleware)
Middleware melindungi route berikut:
- `/home/*` - Hanya user biasa
- `/sekertaris/*` - Hanya sekretaris
- `/pinjam/*` - Semua user yang login
- `/profile/*` - Semua user yang login
- `/detailAlat/*` - Semua user yang login
- `/kategori/*` - Semua user yang login

### Auto Redirect
- User biasa yang coba akses `/sekertaris` → redirect ke `/home`
- Sekretaris yang coba akses `/home` → redirect ke `/sekertaris`
- User belum login yang coba akses protected route → redirect ke `/login`

## File yang Dimodifikasi

### 1. `src/app/api/auth/[...nextauth]/route.js`
Menambahkan callbacks untuk menyimpan role di session:
```javascript
callbacks: {
    async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
            token.role = user.role;
        }
        return token;
    },
    async session({ session, token }) {
        if (token) {
            session.user.id = token.id;
            session.user.role = token.role;
        }
        return session;
    }
}
```

### 2. `src/app/login/page.jsx`
Redirect berdasarkan role setelah login berhasil:
```javascript
const session = await fetch('/api/auth/session');
if (session?.user?.role === 'sekertaris') {
    router.push('/sekertaris');
} else {
    router.push('/home');
}
```

### 3. `src/middleware.js`
Middleware untuk protect routes dan auto redirect:
```javascript
// Sekretaris akses /home → redirect ke /sekertaris
// User biasa akses /sekertaris → redirect ke /home
```

### 4. `src/app/home/page.jsx`
Cek user dan redirect jika sekretaris:
```javascript
const currentUser = await getCurrentUser();
if (!currentUser) redirect('/login');
if (currentUser.role === 'sekertaris') redirect('/sekertaris');
```

### 5. `src/app/sekertaris/page.jsx`
Cek user dan redirect jika bukan sekretaris:
```javascript
const currentUser = await getCurrentUser();
if (!currentUser || currentUser.role !== 'sekertaris') {
    redirect('/home');
}
```

## Cara Menggunakan

### Untuk User Biasa:
1. Register di `/register` dengan role kosong atau 'user'
2. Login di `/login`
3. Otomatis diarahkan ke `/home`
4. Bisa pinjam barang dan lihat riwayat peminjaman sendiri

### Untuk Sekretaris:
1. Register di `/register` dengan role 'sekertaris'
2. Login di `/login`
3. Otomatis diarahkan ke `/sekertaris`
4. Bisa kelola semua peminjaman dan barang

## Testing

### Test User Biasa:
1. Login dengan akun user biasa
2. Harus masuk ke `/home`
3. Coba akses `/sekertaris` → harus redirect ke `/home`

### Test Sekretaris:
1. Login dengan akun sekretaris
2. Harus masuk ke `/sekertaris`
3. Coba akses `/home` → harus redirect ke `/sekertaris`

### Test Protected Routes:
1. Logout
2. Coba akses `/home` atau `/sekertaris` → harus redirect ke `/login`

## Keamanan

- ✅ Session-based authentication dengan NextAuth
- ✅ Password di-hash dengan bcrypt
- ✅ Role disimpan di JWT token (server-side)
- ✅ Middleware melindungi semua protected routes
- ✅ Server-side validation di setiap halaman
- ✅ Auto redirect mencegah akses unauthorized

## Troubleshooting

### User tidak redirect setelah login
- Pastikan role tersimpan di database
- Cek session dengan `console.log(session)`
- Pastikan callbacks di authOptions sudah benar

### Middleware tidak bekerja
- Cek config matcher di middleware.js
- Pastikan path sesuai dengan route yang ingin dilindungi

### User bisa akses route yang tidak seharusnya
- Pastikan getCurrentUser() dipanggil di setiap protected page
- Tambahkan redirect di server component
