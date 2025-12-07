"use client"
import { useState } from "react";
import Link from "next/link";
import { tambahBarang } from "../../../lib/action";

export default function TambahBarangPage() {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let fileName = null;

            // Upload gambar jika ada
            if (file) {
                const formImg = new FormData();
                formImg.append("file", file);

                const upload = await fetch("/api/gambar", {
                    method: "POST",
                    body: formImg,
                });

                if (upload.ok) {
                    const img = await upload.json();
                    fileName = img.fileName;
                }
            }

            // Submit form dengan nama file gambar
            const formData = new FormData(e.target);
            
            // Set gambar filename (bukan File object)
            if (fileName) {
                formData.set("gambar", fileName); // Gunakan set() untuk replace/add
            } else {
                formData.set("gambar", ""); // Set empty string jika tidak ada gambar
            }

            const result = await tambahBarang(formData);
            
            if (result.success) {
                alert("Barang berhasil ditambahkan!");
                window.location.href = "/sekertaris";
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Gagal menambahkan barang: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tambah Barang Baru</h1>
                
                <div>
                    <label htmlFor="namaBarang" className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Barang
                    </label>
                    <input
                        id="namaBarang"
                        name="namaBarang"
                        type="text"
                        required
                        className="w-full px-3 py-2 text-black border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Masukkan nama barang"
                    />
                </div>
                <div>
                    <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-1">
                        Deskripsi
                    </label>
                    <input
                        id="deskripsi"
                        name="deskripsi"
                        type="text"
                        required
                        className="w-full px-3 py-2 border text-black border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Masukkan deskripsi"
                    />
                </div>
                <div>
                    <label htmlFor="stok" className="block text-sm font-medium text-gray-700 mb-1">
                        Stok
                    </label>
                    <input
                        id="stok"
                        name="stok"
                        type="number"
                        required
                        min={1}
                        className="w-full px-3 py-2 border text-black border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Minimal jumlah stok"
                    />
                </div>
                <div>
                    <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 mb-1">
                        Kategori
                    </label>
                    <select 
                        name="kategori" 
                        id="kategori" 
                        required
                        className="w-full px-3 py-2 border text-black border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">-- Pilih Kategori --</option>
                        <option value="elektronik">Elektronik</option>
                        <option value="mabler">Mabler</option>
                        <option value="olahraga">Olahraga</option>
                        <option value="habisPakai">Habis Pakai</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="gambar" className="block text-sm font-medium text-gray-700 mb-1">
                        Gambar
                    </label>
                    <input
                        id="gambar"
                        type="file"
                        accept="image/*"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    {file && (
                        <p className="text-xs text-gray-500 mt-1">File dipilih: {file.name}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Menambahkan..." : "Tambah Barang"}
                    </button>
                    <Link 
                        href="/sekertaris" 
                        className="w-full inline-flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition text-center"
                    >
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    );
}
