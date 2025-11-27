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
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
                <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">Login</h1>
                    <p className="text-sm text-gray-500 mb-6">Masuk untuk melanjutkan</p>

                    <form action={handleLogin} className="flex flex-col gap-4 text-black">
                        <input
                            className="border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="email"
                            name="email"
                            placeholder="Email"
                        />

                        <input
                            className="border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="password"
                            name="password"
                            placeholder="Password"
                        />

                        <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold" type="submit">
                            Login
                        </button>

                        <div className="text-center text-sm text-gray-600 mt-3">
                            <Link href="/register" className="text-blue-600 hover:underline">
                                Don't have an account? Register
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
}