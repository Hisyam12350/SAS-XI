import Image from "next/image";
import Link from "next/link";
import {ambilBarang, hapusUser} from "../../../lib/action";
import { getCurrentUser } from "../../../lib/auth";
import { redirect } from "next/navigation";

export default async function SekertarisPage() {
  const currentUser = await getCurrentUser();
  
  // Cek apakah user adalah sekretaris
  if (!currentUser || currentUser.role !== 'sekertaris') {
    redirect('/home');
  }
  
  // Ambil semua data barang dari database
  const barang = await ambilBarang();
  return (
    <div className="">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 md:px-10 py-4 md:py-6 bg-white shadow">
        <div className="flex items-center gap-2">
          <Image src="/barang/icon.jpg" alt="Logo" width={32} height={32} />
          <Link href="/sekertaris"><h1 className="text-lg md:text-2xl font-bold text-blue-500">Lif-Pas</h1></Link>
        </div>
        <ul className="flex gap-2 md:gap-6 text-xs md:text-lg font-medium items-center">
          <li className="text-xs md:text-sm text-gray-600 hidden md:block">Sekretaris: {currentUser.username}</li>
          <Link href={'/profile'}>
            <Image src="/barang/image.png" alt="User" width={32} height={32} className="rounded-full"/>
          </Link>
        </ul>
      </nav>

      {/* Menu Navigasi */}
      <div className="bg-white shadow-md p-4 mb-6">
        <div className="flex gap-2 md:gap-4 flex-wrap">
          <Link
            href="/sekertaris/peminjaman"
            className="bg-blue-600 text-white px-3 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2 text-sm md:text-base"
          >
            📋 <span className="hidden sm:inline">Kelola</span> Peminjaman
          </Link>
          <Link
            href="/tambahBarang"
            className="bg-green-600 text-white px-3 md:px-6 py-2 md:py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center gap-2 text-sm md:text-base"
          >
            ➕ <span className="hidden sm:inline">Tambah</span> Barang
          </Link>
        </div>
      </div>

      <h2 className="text-lg md:text-xl font-bold mb-4 px-4">Daftar Barang</h2>
      <div className="overflow-x-auto px-4">
        <table className="min-w-full border border-gray-300 text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border px-1 md:px-2 py-2 text-xs md:text-sm">No</th>
              <th className="border px-1 md:px-2 py-2 text-xs md:text-sm hidden md:table-cell">id</th>
              <th className="border px-1 md:px-2 py-2 text-xs md:text-sm">Nama Barang</th>
              <th className="border px-1 md:px-2 py-2 text-xs md:text-sm">Kategori</th>
              <th className="border px-1 md:px-2 py-2 text-xs md:text-sm">Jumlah</th>
              <th className="border px-1 md:px-2 py-2 text-xs md:text-sm">Kondisi</th>
              <th className="border px-1 md:px-2 py-2 text-xs md:text-sm">Edit</th>
            </tr>
          </thead>
          <tbody>
            {barang.map((item, idx) => {
                const destroyUserWithId = hapusUser.bind(null, item.id);
                return(
                <tr key={item.id}>
                    <td className="border px-1 md:px-2 py-2 text-xs md:text-sm">{idx + 1}</td>
                    <td className="border px-1 md:px-2 py-2 text-xs md:text-sm hidden md:table-cell">{item.id}</td>
                    <td className="border px-1 md:px-2 py-2 text-xs md:text-sm">{item.namaBarang}</td>
                    <td className="border px-1 md:px-2 py-2 text-xs md:text-sm">{item.kategori}</td>
                    <td className="border px-1 md:px-2 py-2 text-xs md:text-sm">{item.stok}</td>
                    <td className="border px-1 md:px-2 py-2 text-center bg-red-500">
                        <form action={destroyUserWithId}>
                                    <input value={item.id} name="id" type="hidden"/>
                                    <button type="submit" className="text-white text-xs md:text-sm px-1 md:px-2">hapus</button>
                        </form>
                    </td>
                        <td className="border px-1 md:px-2 py-2 text-center">
                            <Link href={`/editBarang/${item.id}`} className="text-xs md:text-sm">edit</Link>
                        </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
}
