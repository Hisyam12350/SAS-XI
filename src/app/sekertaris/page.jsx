import Image from "next/image";
import Link from "next/link";
import {ambilBarang, getAlatById, hapusUser } from "../../../lib/action";

export default async function SekertarisPage() {
  // Ambil semua data barang dari database
  const barang = await ambilBarang();
  return (
    <div className="">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow">
        <div className="flex items-center gap-2">
          <Image src="/barang/icon.jpg" alt="Logo" width={32} height={32} />
          <Link href="/home"><h1 className="text-xl md:text-2xl font-bold text-blue-500 ">Lif-Pas</h1></Link>
        </div>
        <ul className="flex gap-6 text-lg font-medium md:text-md">
          <Link href={'/profile'}>
            <Image src="/barang/image.png" alt="User" width={32} height={32} className="rounded-full"/>
          </Link>
        </ul>
      </nav>
      <h2 className="text-xl font-bold mb-4">Daftar Barang</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm sm:text-base">
          <thead>
            <tr className="bg-blue-500">
              <th className="border px-2 py-2">No</th>
              <th className="border px-2 py-2">id</th>
              <th className="border px-2 py-2">Nama Barang</th>
              <th className="border px-2 py-2">Kategori</th>
              <th className="border px-2 py-2">Jumlah</th>
              <th className="border px-2 py-2">Kondisi</th>
              <th className="border px-2 py-2">Edit</th>
            </tr>
          </thead>
          <tbody>
            {barang.map((item, idx) => {
                const destroyUserWithId = hapusUser.bind(null, item.id);
                return(
                <tr key={item.id}>
                    <td className="border px-2 py-2">{idx + 1}</td>
                    <td className="border px-2 py-2">{item.id}</td>
                    <td className="border px-2 py-2">{item.namaBarang}</td>
                    <td className="border px-2 py-2">{item.kategori}</td>
                    <td className="border px-2 py-2">{item.stok}</td>
                    <td className="border px-2 py-2 text-center bg-red-500">
                        <form action={destroyUserWithId}>
                                    <input value={item.id} name="id" type="hidden"/>
                                    <button type="submit" className="text-white">hapus</button>
                        </form>
                    </td>
                        <td className="border px-2 py-2 text-center">
                            <Link href={`/editBarang/${item.id}`} className="text-white">edit</Link>
                        </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
}
