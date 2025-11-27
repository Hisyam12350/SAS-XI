import Image from "next/image";
import Link from "next/link";
import {getAlat} from "../../../lib/action";
import { getImagePath } from "../../../lib/images";


export default async function Home() {
  const alat = await getAlat();

  return (
    <div className={`min-h-screen flex flex-col bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-800`}>
        {/* Navbar */}
        <nav className="flex justify-between items-center px-10 py-6 bg-white shadow">
          <div className="flex items-center gap-2">
            <Image src="/barang/icon.jpg" alt="Logo" width={32} height={32} />
            <Link href="/home"><h1 className="text-xl md:text-2xl font-bold text-blue-500 ">Lif-Pas</h1></Link>
          </div>
              <ul className="flex gap-6 text-lg font-medium md:text-md">
                <li><a href="#" className="hover:text-blue-600">Home</a></li>
                <li><a href="/kategori" className="hover:text-blue-600">Kategori</a></li>
                <Link href={'/profile'}>
                  <Image src="/barang/image.png" alt="User" width={32} height={32} className="rounded-full"/>
                </Link>
              </ul>
        </nav>
      <div>
      <main className={`text-center py-16`}>
        <h2 className="text-3xl font-bold text-blue-600 mb-2">
          Selamat Datang di Lif-Pas
        </h2>
        <p className="text-gray-600 mb-10">
          Temukan barang yang ingin di pinjam dengan mudah dan cepat
        </p>

        {/* Barang Grid */}
        <div className="grid grid-cols-1  md:grid-cols-3 gap-8 px-8 md:px-20">
          {Array.isArray(alat) && alat.map((item, index) => {
            const gambarUrl = getImagePath(item);
            return (
            <Link href={`/detailAlat/${item.id}`} key={`${item.id}-${index}`}>
            <div
              className="bg-linear-to-tr from-blue-200 via-purple-200 to-pink-200 shadow-sm rounded-xl p-4 text-center hover:shadow-lg transition h-full flex flex-col">
              <div className="relative w-full aspect-square mb-4 rounded-md overflow-hidden bg-gray-100">
                <Image
                  src={gambarUrl}
                  alt={item.namaBarang || item.nama || "barang"}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold line-clamp-2">{item.namaBarang}</h3>
              <p className="text-md text-gray-500 mt-auto">Stok: {item.stok}</p>
            </div>
          </Link>
          );
          })}
        </div>
      </main>
      </div>

      {/* Footer */}
      <footer className="bg-white text-center py-6 text-sm border-t border-gray-200">
        <p className="font-semibold text-gray-800">Hubungi Kami</p>
        <p>Email: info@Sapras.com</p>
        <p>Alamat: Jl. Pekapuran No. 123, Depok</p>
      </footer>
    </div>
  );
}
