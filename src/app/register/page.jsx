import Link from "next/link";
import { simpanUser } from "../../../lib/action";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-tr from-blue-200 via-purple-200 to-pink-200 py-12 px-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Buat Akun Baru</h1>
                    <p className="text-sm text-gray-500 mt-1">Daftar untuk mulai meminjam barang</p>
                </div>

                <form action={simpanUser} className="space-y-4 ">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="w-full px-3 py-2 text-black border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Masukkan username"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-3 py-2 border text-black border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="nama@contoh.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            minLength={3}
                            className="w-full px-3 py-2 border text-black border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Minimal 3 karakter"
                        />
                    </div>

                    <input type="hidden" name="role" value="sekertaris" />

                    <div>
                        <button
                            type="submit"
                            className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
                        >
                            Daftar
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Sudah punya akun?{' '}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Login di sini
                    </Link>
                </div>
            </div>
        </div>
    );
}