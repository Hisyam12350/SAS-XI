import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAlat } from "../../../lib/action";
import { getImagePath } from "../../../lib/images";
import { getCurrentUser } from "../../../lib/auth";
import MobileMenu from "../components/MobileMenu";


export default async function Home() {
  const currentUser = await getCurrentUser();
  
  // Redirect ke login jika belum login
  if (!currentUser) {
    redirect('/login');
  }
  
  // Redirect ke halaman sekretaris jika role adalah sekretaris
  if (currentUser.role === 'sekertaris') {
    redirect('/sekertaris');
  }
  
  const alat = await getAlat();



  return (
    <div className={`min-h-screen flex flex-col bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-800`}>
        {/* Navbar */}
        <nav className="flex justify-between items-center px-4 md:px-10 py-4 md:py-6 bg-white shadow">
          <div className="flex items-center gap-2">
            <Image src="/barang/icon.jpg" alt="Logo" width={32} height={32} />
            <Link href="/home"><h1 className="text-lg md:text-2xl font-bold text-blue-500">Lif-Pas</h1></Link>
          </div>
          <div className="flex items-center gap-2">
            <ul className="hidden md:flex gap-6 text-lg font-medium items-center">
              <li><a href="#" className="hover:text-blue-600">Home</a></li>
              <li><a href="/kategori" className="hover:text-blue-600">Kategori</a></li>
              <li><a href="/pinjam/riwayat" className="hover:text-blue-600">Riwayat</a></li>
              <li className="text-sm text-gray-600">Halo, {currentUser.username}</li>
              <Link href={'/profile'}>
                <Image src="/barang/image.png" alt="User" width={32} height={32} className="rounded-full"/>
              </Link>
            </ul>
            <div className="flex md:hidden items-center gap-2">
              <Link href={'/profile'}>
                <Image src="/barang/image.png" alt="User" width={32} height={32} className="rounded-full"/>
              </Link>
              <MobileMenu currentUser={currentUser} />
            </div>
          </div>
        </nav>
      <div>
      <main className={`text-center py-8 md:py-16 px-4`}>
        <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
          Selamat Datang di Lif-Pas
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-10">
          Temukan barang yang ingin di pinjam dengan mudah dan cepat
        </p>

        {/* Barang Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 px-4 md:px-20">
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
      <footer className="bg-white text-center py-4 md:py-6 text-xs md:text-sm border-t border-gray-200 px-4">
        <p className="font-semibold text-gray-800">Hubungi Kami</p>
        <p>Email: info@Sapras.com</p>
        <p className="text-xs">Alamat: Jl. Pekapuran No. 123, Depok</p>
      </footer>
    </div>
  );
}
