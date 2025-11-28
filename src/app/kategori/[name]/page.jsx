import { getAlatByCategory } from "../../../../lib/action";
// Force this page to be a server component and always fetch fresh data
export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { Lexend } from "next/font/google";
import { getImagePath } from "../../../../lib/images";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400"],
});

export default async function CategoryPage({ params }) {
  const { name } = await params;
  
  
  // Map slug ke nama kategori yang sesuai database (enum lowercase)
  const slugMap = {
    'elektronik': 'elektronik',
    'mabler': 'mabler',
    'olahraga': 'olahraga',
    'habis-pakai': 'habisPakai',
  };

  const categoryName = slugMap[name] || name;
  const barang = await getAlatByCategory(categoryName);

  return (
    <div className={lexend.className}>
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 bg-white shadow">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Lif-Pus
        </Link>
        <Link href="/kategori" className="text-blue-600 hover:underline">
          ← Kembali ke Kategori
        </Link>
      </header>

      {/* Main Content */}
      <main className="min-h-screen bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-800">
        <section className="max-w-6xl mx-auto py-16 px-6">
          {/* Title */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-2 capitalize">Kategori: {categoryName}</h1>
            <p className="text-gray-600">
              Menampilkan {barang.length} barang dalam kategori {categoryName}
            </p>
          </div>

          {/* Barang Grid */}
          {barang.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {barang.map((item) => {
                const gambarUrl = getImagePath(item);
                return (
                  <Link
                    href={`/detailAlat/${item.id}`}
                    key={item.id}
                    className="block"
                  >
                    <div className="bg-linear-to-tr from-blue-200 via-purple-200 to-pink-200 border border-gray-200 shadow-sm rounded-xl p-4 text-center hover:shadow-lg transition h-full flex flex-col">
                      <div className="relative w-full aspect-square mb-4 rounded-md overflow-hidden bg-gray-100">
                        <Image
                          src={gambarUrl}
                          alt={item.namaBarang || "barang"}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                        {item.namaBarang}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Kategori: {item.kategori}
                      </p>
                      <p className="text-md text-gray-600 mt-auto">
                        Stok: <span className="font-semibold text-green-600">{item.stok || 0}</span>
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500 mb-4">
                Tidak ada barang dalam kategori "{categoryName}"
              </p>
              <Link href="/kategori" className="text-blue-600 hover:underline">
                Kembali ke Kategori
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
