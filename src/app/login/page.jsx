"use client"

import Link from "next/link";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
export default function LoginPage() {
    async function handleLogin(formData) {

        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false
        })

        if(!response.ok){
            alert("Login Gagal")
            return
        }
        alert("Berhasil Login")
        redirect("/home")

    }

    return( 
    <form action={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
        <h1>Login</h1>
        <input className="border p-2" type="email" name="email" placeholder="Email" />
        <input className="border p-2" type="password" name="password" placeholder="Password" />
        <button className="bg-blue-500 text-white py-2 px-4 rounded" type="submit">Login</button>
        <Link href="/register">Don't have an account? Register</Link>
    </form>
    // <div>Login Page</div>

    )
}