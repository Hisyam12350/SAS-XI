import { tambahBarang } from "../../../lib/action";
export default function TambahBarangPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <form action={tambahBarang} className="space-y-4">
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
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
                                    >
                                    Daftar
                                </button>
                            </div>
                        </form>
                    </div>
    )
}