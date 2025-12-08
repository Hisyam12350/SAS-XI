"use client"

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(formData) {
        setIsLoading(true);

        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false
        })

        if(!response.ok){
            alert("Login Gagal - Email atau password salah")
            setIsLoading(false);
            return
        }

        // Ambil session untuk cek role
        const sessionResponse = await fetch('/api/auth/session');
        const session = await sessionResponse.json();
        
        // Redirect berdasarkan role
        if (session?.user?.role === 'sekertaris') {
            alert("Berhasil Login sebagai Sekertaris");
            router.push('/sekertaris');
        } else {
            alert("Berhasil Login");
            router.push('/home');
        }
        
        setIsLoading(false);
    }

        return(
            <div className="min-h-screen flex items-center justify-center bg-linear-to-tr from-blue-200 via-purple-200 to-pink-200 px-4 py-12">
                <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-md p-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">Login</h1>
                    <p className="text-sm text-gray-500 mb-6">Masuk untuk melanjutkan</p>

                    <form action={handleLogin} className="flex flex-col gap-4 text-black">
                        <label htmlFor="email" className="block -mb-3 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            className="border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="email"
                            name="email"
                            placeholder="Email"
                        />

                        <label htmlFor="password" className="block text-sm -mb-3 font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            className="border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="password"
                            name="password"
                            placeholder="Password"
                        />

                        <button 
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed" 
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'Login'}
                        </button>

                        <div className="mt-6 text-center text-sm text-gray-600">
                            Belum punya akun?{' '}
                            <Link href="/register" className="text-blue-600 hover:underline">
                                       Register
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
}