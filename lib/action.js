"use server"
import bcrypt from "bcryptjs";
import getConnection from "./database";
import { redirect } from "next/navigation";

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
  
  // Get semua data
  const [allData] = await connection.execute("SELECT * FROM allbarang ORDER BY id ASC");
  
  // Filter berdasarkan kategori
  return allData.map(item => {
    let kat = 'Lainnya';
    if (item.namaBarang) {
      const nama = item.namaBarang.toLowerCase();
      if (['kabel roll', 'laptop', 'pc', 'proyektor', 'kamera'].some(k => nama.includes(k))) {
        kat = 'Elektronik';
      } else if (['pembersih', 'baterai', 'lakban'].some(k => nama.includes(k))) {
        kat = 'Habis Pakai';
      } else if (['bola', 'matras'].some(k => nama.includes(k))) {
        kat = 'Olahraga';
      } else if (['kursi', 'meja', 'papan', 'rak', 'filing', 'kabinet'].some(k => nama.includes(k))) {
        kat = 'Mabler';
      }
    }
    return { ...item, kategori: kat };
  }).filter(item => item.kategori === category);
}