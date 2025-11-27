"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {

  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    password: "",
  });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);
    // Ambil data user dari session dan database
    useEffect(() => {
      async function fetchUser() {
        try {
          // Ambil session user
          const sessionRes = await fetch("/api/auth/session");
          const session = await sessionRes.json();
          if (!session?.user?.email) {
            setMessage("Anda belum login.");
            setInitialLoading(false);
            return;
          }
          // Ambil data user dari database
          const userRes = await fetch(`/api/user?email=${encodeURIComponent(session.user.email)}`);
          const user = await userRes.json();
          if (!user) {
            setMessage("User tidak ditemukan di database.");
          } else {
            setForm({
              name: user.username || user.name || "",
              email: user.email || "",
              bio: user.bio || user.deskripsi || "",
              password: "",
            });
          }
        } catch (err) {
          setMessage("Gagal mengambil data user.");
        } finally {
          setInitialLoading(false);
        }
      }
      fetchUser();
    }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal update profil");
      setMessage("Profil berhasil diupdate!");
      setTimeout(() => router.push("/profile"), 1200);
    } catch (err) {
      let msg = "Terjadi kesalahan saat update profil";
      if (err instanceof Error) msg = err.message;
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 py-16">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-10 border border-blue-200 text-center">
          <h1 className="text-2xl font-bold text-blue-700">Memuat data user...</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 py-8 sm:py-12 md:py-16">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-4 sm:p-8 md:p-10 border border-blue-200 mx-2 sm:mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-6 sm:mb-8 text-center">Edit Profile</h1>
        {message && (
          <div className={`mb-4 text-center font-semibold ${message.includes("berhasil") ? "text-green-600" : "text-red-600"}`}>{message}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border text-black border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border text-black border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50"
              required
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password Baru:</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
              placeholder="Kosongkan jika tidak ingin mengganti"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bio:</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border text-black border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50 resize-none"
              rows={4}
            />
          </div>
          <button type="submit" className="w-full py-2 sm:py-3 bg-linear-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg shadow hover:scale-105 transition" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  );
}