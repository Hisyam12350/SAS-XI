import { getAlatById } from "../../../../lib/action";
import Image from "next/image";
import Link from "next/link";
import { getImagePath } from "../../../../lib/images";
import FormPinjamModal from "../../components/FormPinjamModal";
import { getCurrentUser } from "../../../../lib/auth";

export default async function DetailAlat({ params }) {
  const { id } = await params;
  const alat = await getAlatById(id);
  const currentUser = await getCurrentUser();

  if (!alat) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold mb-4">Alat tidak ditemukan</h2>
        <Link href="/" className="text-blue-600 hover:underline">
          Kembali ke halaman utama
        </Link>
      </div>
    );
  }

  const gambarUrl = getImagePath(alat);

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-800">
      <div>
      <nav className="flex justify-between items-center px-4 md:px-10 py-4 md:py-6 bg-white shadow">
          <div className="flex items-center gap-2">
            <Image src="/barang/icon.jpg" alt="Logo" width={32} height={32} />
            <Link href="/home"><h1 className="text-lg md:text-2xl font-bold text-blue-500">Lif-Pas</h1></Link>
          </div>
              <ul className="flex gap-3 md:gap-6 text-sm md:text-lg font-medium">
                <li className="hidden md:block"><a href="#" className="hover:text-blue-600">Home</a></li>
                <li className="hidden md:block"><a href="/kategori" className="hover:text-blue-600">Kategori</a></li>
                <Link href={'/profile'}>
                  <Image src="/barang/image.png" alt="User" width={32} height={32} className="rounded-full"/>
                </Link>
              </ul>
        </nav>
      {/* Detail Section */}
      <section className="max-w-5xl mx-auto py-8 md:py-16 px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start md:items-center">
        {/* Gambar Alat */}
        <div className="w-full">
          <Image
            src={gambarUrl}
            alt={alat.namaBarang || "alat"}
            width={400}
            height={400}
            className="rounded-xl shadow-lg object-cover w-full"
          />
        </div>

        {/* Detail Alat */}
        <div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">{alat.namaBarang}</h2>
          
          {/* Kategori */}
          {alat.kategori && (
            <div className="mb-4">
              <span className="inline-block bg-white text-blue-800 px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                {alat.kategori}
              </span>
            </div>
          )}
          
          {/* Stok */}
          <div className="mb-4 md:mb-6">
            <p className="text-base md:text-lg font-semibold text-gray-700">
              Stok Tersedia: <span className="text-green-600">{alat.stok || 0} unit</span>
            </p>
          </div>

          {/* Deskripsi */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">Deskripsi:</h3>
            <p className="text-gray-700 leading-relaxed text-sm md:text-lg whitespace-pre-wrap">
              {alat.deskripsi || "Tidak ada deskripsi tersedia untuk alat ini."}
            </p>
          </div>

          {/* Informasi Tambahan */}
          {alat.spesifikasi && (
            <div className="mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">Spesifikasi:</h3>
              <p className="text-gray-700 leading-relaxed text-sm md:text-lg whitespace-pre-wrap">
                {alat.spesifikasi}
              </p>
            </div>
          )}

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            {currentUser ? (
              <FormPinjamModal alat={alat} user={currentUser} />
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-sm md:text-base text-center"
              >
                Login untuk Pinjam
              </Link>
            )}
            <Link
              href="/home"
              className="bg-white text-gray-800 px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-gray-400 transition font-semibold text-sm md:text-base text-center"
              >
              ← Kembali
            </Link>
          </div>
        </div>
      </section>
    </div>
    </main>
  );
}
