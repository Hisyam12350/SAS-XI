"use client";

import { useState } from "react";
import { buatPeminjaman } from "../../../lib/action";

export default function FormPinjamModal({ alat, user }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      await buatPeminjaman(formData);
      setIsOpen(false);
      alert("Peminjaman berhasil diajukan! Menunggu persetujuan sekretaris.");
    } catch (error) {
      alert(error.message || "Terjadi kesalahan saat mengajukan peminjaman");
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!alat.stok || alat.stok === 0}
      >
        {!alat.stok || alat.stok === 0 ? "Stok Habis" : "📌 Pinjam Alat"}
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Form Peminjaman</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Info Peminjam */}
            <div className="bg-purple-50 p-4 rounded-lg mb-4">
              <p className="text-xs text-gray-600">Peminjam:</p>
              <p className="text-sm font-semibold text-gray-800">{user.username}</p>
              <p className="text-xs text-gray-600">{user.email}</p>
            </div>

            {/* Info Barang */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm font-semibold text-gray-700">{alat.namaBarang}</p>
              <p className="text-xs text-gray-600 mt-1">Stok tersedia: {alat.stok} unit</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="penggunaId" value={user.id} />
              <input type="hidden" name="idBarang" value={alat.id} />

              {/* Jumlah */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Pinjam <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="jumlah"
                  min="1"
                  max={alat.stok}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan jumlah"
                />
              </div>

              {/* Tanggal Pinjam */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Pinjam <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="tanggalPinjam"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Tanggal Kembali */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Kembali <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="tanggalKembali"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Tombol */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Ajukan Peminjaman
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
