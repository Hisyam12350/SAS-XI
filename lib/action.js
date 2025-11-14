"use server";

import bcrypt from "bcryptjs";
import connection from "./database";
import { redirect } from "next/navigation";

export async function simpanUser(formData) {
    const email = formData.get("email")
    const username = formData.get("username")
    const role = formData.get("role")
    const password = bcrypt.hashSync(formData.get("password"))

   await connection.execute("insert into pengguna (username,email,password,role) values (?,?,?,?)",
   [username,email,password,role]
    );
    redirect("/login")
}

export async function getUserByEmail(email) {
    const [user] = await connection.execute(
        "select * from pengguna where email = ?",
        [email]
    )

    if(!user.length) return null

    return user[0]
}

export async function getUser() {
    const [rows] = await connection.execute("SELECT * FROM alat");
  return rows;
}