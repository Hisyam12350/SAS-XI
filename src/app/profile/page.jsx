import Link from "next/link";
import { getUserByEmail } from "../../../lib/action";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";

export default async function ProfilePage() {
  // Ambil session dari NextAuth
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 ${lexend.className}`}>
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-blue-200">
          <h2 className="text-3xl font-bold mb-4 text-blue-700">Anda belum masuk</h2>
          <p className="text-gray-600 mb-8">Silakan masuk terlebih dahulu untuk melihat profil Anda.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/login" className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow hover:scale-105 transition">Masuk</Link>
            <Link href="/" className="px-5 py-2 border border-blue-400 rounded-lg text-blue-700 hover:bg-blue-50 transition">Kembali</Link>
          </div>
        </div>
      </div>
    );
  }

  // Ambil data user dari database berdasarkan email
  const user = await getUserByEmail(session.user.email);
  console.log('Session:', session);
  console.log('User from DB:', user);

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-purple-100 to-pink-100`}>
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-blue-200 text-center">
          <h2 className="text-3xl font-bold mb-4 text-red-600">Profil tidak ditemukan</h2>
          <p className="text-gray-600 mb-8">Data pengguna tidak tersedia di database.</p>
          <Link href="/" className="px-5 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow hover:scale-105 transition">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  return (
  <div>
    <nav className="flex justify-between items-center px-10 py-6 bg-white shadow">
      <div className="flex items-center gap-2">
        <Image src="/barang/icon.jpg" alt="Logo" width={32} height={32} />
        <Link href="/home"><h1 className="text-2xl font-bold text-blue-600 ">Lif-Pas</h1></Link>
      </div>
          <ul className="flex gap-6 text-lg font-medium md:text-md text-black">
            <li><a href="home" className="hover:text-blue-600">Home</a></li>
            <li><a href="/kategori" className="hover:text-blue-600">Kategori</a></li>
          </ul>
      </nav>
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 flex items-start justify-center py-16">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-3xl p-10 border border-blue-200">
        <div className="flex items-center gap-8">
          <div className="w-28 h-28 rounded-full bg-linear-to-tr from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center text-4xl text-white font-bold shadow-lg border-4 border-white">
            {(user.username || user.name || 'U').charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-blue-700 mb-1">{user.username || user.name}</h1>
            <p className="text-gray-600 text-lg">{user.email}</p>
            <p className="mt-2 text-sm text-gray-500">Role: <span className="font-semibold text-purple-700">{user.role || 'user'}</span></p>
          </div>
          <div className="ml-auto">
            <Link href="/edit" className="px-5 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow hover:scale-105 transition">Edit Profile</Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 rounded-xl p-6 shadow">
            <h3 className="text-xl font-bold mb-3 text-blue-700">Tentang Saya</h3>
            <p className="text-gray-700 text-base">{user.bio || user.deskripsi || 'Belum ada bio.'}</p>
          </div>

          <div className="bg-purple-50 rounded-xl p-6 shadow">
            <h3 className="text-xl font-bold mb-3 text-purple-700">Informasi</h3>
            <ul className="text-gray-700 space-y-3 text-base">
              <li><strong className="text-blue-700">Email:</strong> {user.email}</li>
              <li><strong className="text-blue-700">Username:</strong> {user.username || user.name}</li>
              <li><strong className="text-blue-700">Role:</strong> {user.role || '-'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}