"use server";

import bcrypt from "bcryptjs";
import getConnection from "./database";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function simpanUser(formData) {
  const connection = await getConnection();
  const email = formData.get("email");
  const username = formData.get("username");
  const role = formData.get("role");
  const password = bcrypt.hashSync(formData.get("password"));

  await connection.execute("insert into pengguna (username,email,password,role) values (?,?,?,?)", [
    username,
    email,
    password,
    role,
  ]);
  redirect("/login");
}

export async function getUserByEmail(email) {
  const connection = await getConnection();
  const [user] = await connection.execute("select * from pengguna where email = ?", [email]);

  if (!user.length) return null;

  return user[0];
}

export async function updateUserProfile({ name, email, bio, password }) {
  const connection = await getConnection();
  let query = "UPDATE pengguna SET username = ?, bio = ?";
  let params = [name, bio];
  if (password && password.length > 0) {
    const hashed = bcrypt.hashSync(password);
    query += ", password = ?";
    params.push(hashed);
  }
  query += " WHERE email = ?";
  params.push(email);
  const [result] = await connection.execute(query, params);
  return result.affectedRows > 0;
}


export async function hapusUser (id){
    const connection = await getConnection();
    await connection.execute(
        "delete from allbarang where id = ?",
        [id]
    )
    revalidatePath('/sekertaris');
}

export async function tambahBarang (formData){
    const connection = await getConnection();
    const namaBarang = formData.get("namaBarang");
    const deskripsi = formData.get("deskripsi");
    const stok = formData.get("stok");
    await connection.execute(
        "insert into allbarang (namaBarang, deskripsi, stok) values (?, ?, ?)",
        [
          namaBarang,
          deskripsi,
          stok
        ]
    )
    revalidatePath('/sekertaris');
    return { success: true };
}

export async function ambilBarang (){
  const connection = await getConnection();
    const [barang] = await connection.query(
        "select * from allbarang"
    )

    return barang;
}

export async function editBarang (formData){
    const connection = await getConnection();
    const namaBarang = formData.get("namaBarang");
    const deskripsi = formData.get("deskripsi");
    const stok = formData.get("stok");
    await connection.execute(
        "update allbarang set namaBarang = ?, deskripsi = ?, stok = ? where id = ?",
        [
          namaBarang,
          deskripsi,
          stok,
          formData.get("id"),
        ]
    )
    redirect('/sekertaris');
}


export async function getAlat() {
  const connection = await getConnection();
  
  // Gunakan allbarang yang memiliki ID global unik
  const [barang] = await connection.execute("SELECT * FROM allbarang ORDER BY id ASC");
  
  // Map kategori berdasarkan nama
  return barang.map(item => {
    let kategori = 'Lainnya';
    if (item.namaBarang) {
      const nama = item.namaBarang.toLowerCase();
      if (['kabel roll', 'laptop', 'pc', 'proyektor', 'kamera'].some(k => nama.includes(k))) {
        kategori = 'Elektronik';
      } else if (['pembersih', 'baterai', 'lakban'].some(k => nama.includes(k))) {
        kategori = 'Habis Pakai';
      } else if (['bola', 'matras'].some(k => nama.includes(k))) {
        kategori = 'Olahraga';
      } else if (['kursi', 'meja', 'papan', 'rak', 'filing', 'kabinet'].some(k => nama.includes(k))) {
        kategori = 'Mabler';
      }
    }
    return { ...item, kategori };
  });
}

export async function getAlatById(id) {
  if (!id) return null;
  
  const connection = await getConnection();
  const numId = parseInt(id);
  
  // Gunakan allbarang dengan ID global
  const [rows] = await connection.execute("SELECT * FROM allbarang WHERE id = ?", [numId]);
  
  if (rows && rows.length > 0) {
    const item = rows[0];
    
    // Tentukan kategori
    let kategori = 'Lainnya';
    if (item.namaBarang) {
      const nama = item.namaBarang.toLowerCase();
      if (['kabel roll', 'laptop', 'pc', 'proyektor', 'kamera'].some(k => nama.includes(k))) {
        kategori = 'Elektronik';
      } else if (['pembersih', 'baterai', 'lakban'].some(k => nama.includes(k))) {
        kategori = 'Habis Pakai';
      } else if (['bola', 'matras'].some(k => nama.includes(k))) {
        kategori = 'Olahraga';
      } else if (['kursi', 'meja', 'papan', 'rak', 'filing', 'kabinet'].some(k => nama.includes(k))) {
        kategori = 'Mabler';
      }
    }
    
    return { ...item, kategori };
  }
  
  return null;
}

export async function getAlatByCategory(category) {
  if (!category) return [];
  const connection = await getConnection();
  // Ambil data langsung berdasarkan kategori field di database
  const [data] = await connection.execute("SELECT * FROM allbarang WHERE kategori = ? ORDER BY id ASC", [category]);
  return data;
}

// ===== FUNGSI TRANSAKSI PEMINJAMAN =====

export async function buatPeminjaman(formData) {
  const connection = await getConnection();
  
  const penggunaId = formData.get("penggunaId"); // ID pengguna yang login
  const idBarang = formData.get("idBarang");
  const jumlah = parseInt(formData.get("jumlah"));
  const tanggalPinjam = formData.get("tanggalPinjam");
  const tanggalKembali = formData.get("tanggalKembali");
  
  // Cek stok barang
  const [barang] = await connection.execute(
    "SELECT stok, namaBarang FROM allbarang WHERE id = ?",
    [idBarang]
  );
  
  if (!barang.length || barang[0].stok < jumlah) {
    throw new Error("Stok tidak mencukupi");
  }
  
  // Tentukan kategori barang
  let kategoriBarang = 'mobile';
  const nama = barang[0].namaBarang.toLowerCase();
  if (['kabel roll', 'laptop', 'pc', 'proyektor', 'kamera'].some(k => nama.includes(k))) {
    kategoriBarang = 'elektronik';
  } else if (['pembersih', 'baterai', 'lakban'].some(k => nama.includes(k))) {
    kategoriBarang = 'habisPakai';
  } else if (['bola', 'matras'].some(k => nama.includes(k))) {
    kategoriBarang = 'olahraga';
  }
  
  // Insert ke tabel pinjam
  const [resultPinjam] = await connection.execute(
    "INSERT INTO pinjam (pengguna_id, tanggal_pinjam, tanggal_kembali, status) VALUES (?, ?, ?, 'diproses')",
    [penggunaId, tanggalPinjam, tanggalKembali]
  );
  
  const pinjamId = resultPinjam.insertId;
  
  // Insert ke tabel detail_pinjam
  await connection.execute(
    "INSERT INTO detail_pinjam (pinjam_id, id_barang, kategori_barang, jumlah) VALUES (?, ?, ?, ?)",
    [pinjamId, idBarang, kategoriBarang, jumlah]
  );
  
  // Kurangi stok barang
  await connection.execute(
    "UPDATE allbarang SET stok = stok - ? WHERE id = ?",
    [jumlah, idBarang]
  );
  
  revalidatePath('/pinjam');
  redirect('/pinjam/riwayat');
}

export async function ambilSemuaPeminjaman() {
  const connection = await getConnection();
  const [peminjaman] = await connection.query(
    `SELECT 
      p.id,
      p.pengguna_id,
      pg.username as namaPeminjam,
      pg.email as emailPeminjam,
      p.tanggal_pinjam as tanggalPinjam,
      p.tanggal_kembali as tanggalKembali,
      p.status,
      dp.id_barang as idBarang,
      dp.kategori_barang as kategoriBarang,
      dp.jumlah,
      a.namaBarang,
      a.deskripsi
     FROM pinjam p
     JOIN pengguna pg ON p.pengguna_id = pg.id
     JOIN detail_pinjam dp ON p.id = dp.pinjam_id
     LEFT JOIN allbarang a ON dp.id_barang = a.id
     ORDER BY p.tanggal_pinjam DESC`
  );
  return peminjaman;
}

export async function ambilPeminjamanByUserId(userId) {
  const connection = await getConnection();
  const [peminjaman] = await connection.execute(
    `SELECT 
      p.id,
      p.pengguna_id,
      pg.username as namaPeminjam,
      pg.email as emailPeminjam,
      p.tanggal_pinjam as tanggalPinjam,
      p.tanggal_kembali as tanggalKembali,
      p.status,
      dp.id_barang as idBarang,
      dp.kategori_barang as kategoriBarang,
      dp.jumlah,
      a.namaBarang,
      a.deskripsi
     FROM pinjam p
     JOIN pengguna pg ON p.pengguna_id = pg.id
     JOIN detail_pinjam dp ON p.id = dp.pinjam_id
     LEFT JOIN allbarang a ON dp.id_barang = a.id
     WHERE p.pengguna_id = ?
     ORDER BY p.tanggal_pinjam DESC`,
    [userId]
  );
  return peminjaman;
}

export async function updateStatusPeminjaman(formData) {
  const connection = await getConnection();
  const pinjamId = formData.get("id");
  const status = formData.get("status"); // 'disetujui', 'ditolak', 'selesai'
  
  // Update status peminjaman
  await connection.execute(
    "UPDATE pinjam SET status = ? WHERE id = ?",
    [status, pinjamId]
  );
  
  // Jika ditolak atau selesai, kembalikan stok
  if (status === 'ditolak' || status === 'selesai') {
    const [detail] = await connection.execute(
      "SELECT id_barang, jumlah FROM detail_pinjam WHERE pinjam_id = ?",
      [pinjamId]
    );
    
    if (detail.length) {
      await connection.execute(
        "UPDATE allbarang SET stok = stok + ? WHERE id = ?",
        [detail[0].jumlah, detail[0].id_barang]
      );
    }
  }
  
  revalidatePath('/pinjam/riwayat');
  redirect('/pinjam/riwayat');
}

export async function hapusPeminjaman(formData) {
  const connection = await getConnection();
  const id = formData.get("id");
  
  // Ambil data detail untuk kembalikan stok jika belum selesai
  const [pinjam] = await connection.execute(
    "SELECT status FROM pinjam WHERE id = ?",
    [id]
  );
  
  if (pinjam.length && pinjam[0].status !== 'selesai' && pinjam[0].status !== 'ditolak') {
    const [detail] = await connection.execute(
      "SELECT id_barang, jumlah FROM detail_pinjam WHERE pinjam_id = ?",
      [id]
    );
    
    if (detail.length) {
      await connection.execute(
        "UPDATE allbarang SET stok = stok + ? WHERE id = ?",
        [detail[0].jumlah, detail[0].id_barang]
      );
    }
  }
  
  // Hapus detail dulu (foreign key)
  await connection.execute("DELETE FROM detail_pinjam WHERE pinjam_id = ?", [id]);
  
  // Hapus pinjam
  await connection.execute("DELETE FROM pinjam WHERE id = ?", [id]);
  
  revalidatePath('/pinjam/riwayat');
  redirect('/pinjam/riwayat');
}
