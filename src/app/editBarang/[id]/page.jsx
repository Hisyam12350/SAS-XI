import Link from "next/link";
import { ambilBarang, editBarang,} from "../../../../lib/action";
export default async function EditBarangPage({ params }) {
        // Fix: params is a promise in Next.js dynamic route, so await it first
        const ambilId = await params;
        const barang = await ambilBarang();
        console.log('params.id:', ambilId.id);
        console.log('barang:', barang);
        const barangs = barang.find(a => a.id === parseInt(ambilId.id));
        if (!barangs) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
                    <div className="bg-white p-8 rounded shadow text-center">
                        <h2 className="text-xl font-bold text-red-600 mb-4">Barang tidak ditemukan</h2>
                        <p className="text-gray-700">ID barang tidak valid atau data sudah dihapus.</p>
                    </div>
                </div>
            );
        }
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
                <form action={editBarang} className="space-y-4 max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Barang</h1>
                    <div>
                        <input type="hidden" id="id" name="id" defaultValue={barangs.id} />
                        <label htmlFor="namaBarang" className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Barang
                        </label>
                        <input
                            id="namaBarang"
                            name="namaBarang"
                            type="text"
                            defaultValue={barangs.namaBarang}
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
                            defaultValue={barangs.deskripsi}
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
                            defaultValue={barangs.stok}
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
                            defaultValue={barangs.kategori || ""}
                            className="w-full px-3 py-2 border text-black border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">-- Pilih Kategori --</option>
                            <option value="elektronik">Elektronik</option>
                            <option value="mabler">Mabler</option>
                            <option value="olahraga">Olahraga</option>
                            <option value="habisPakai">Habis Pakai</option>
                        </select>
                    </div>
                    {barangs.gambar && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gambar Saat Ini
                            </label>
                            <p className="text-xs text-gray-500">{barangs.gambar}</p>
                        </div>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
                        >
                            Simpan
                        </button>
                        <Link href="/sekertaris" className="w-full inline-flex items-center justify-center gap-2 mt-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition text-center">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        );
}