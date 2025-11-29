
"use server"

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


import bcrypt from "bcryptjs";
import getConnection from "./database";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { connection } from "next/server";

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
    redirect('/sekertaris');
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