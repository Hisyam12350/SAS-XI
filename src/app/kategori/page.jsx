"use client";

import Link from "next/link";
import Image from "next/image";

export default function CategoriesPage() {
  const categories = [
    {
      id: "elektronik",
      name: "Elektronik",
      description: "Produk elektronik seperti laptop, smartphone, dan aksesoris.",
      color: "bg-blue-500",
    },
    {
      id: "habis-pakai",
      name: "Habis Pakai",
      description: "Barang kebutuhan sehari-hari yang bisa habis.",
      color: "bg-green-500",
    },
    {
      id: "olahraga",
      name: "Olahraga",
      description: "Peralatan dan perlengkapan olahraga.",
      color: "bg-red-500",
    },
    {
      id: "mabler",
      name: "Mabler",
      description: "Peralatan dan perlengkapan untuk sekolah.",
      color: "bg-purple-600",
    },
  ];

  return (
  <div>
    <nav className="flex justify-between items-center px-10 py-6 text-black bg-white shadow">
          <div className="flex items-center gap-2">
            <Image src="/barang/icon.jpg" alt="Logo" width={32} height={32} />
            <Link href="/home"><h1 className="text-2xl font-bold text-blue-500 ">Lif-Pas</h1></Link>
          </div>
              <ul className="flex gap-6 text-lg font-medium md:text-md">
                <li><a href="/home" className="hover:text-blue-600">Home</a></li>
                <Link href={'/profile'}>
                  <Image src="/barang/image.png" alt="User" width={32} height={32} className="rounded-full"/>
                </Link>
              </ul>
        </nav>
    <div className={`min-h-screen bg-linear-to-br from-blue-200 via-purple-200 to-pink-200 flex flex-col items-center py-10`}>
      <h1 className="text-3xl font-bold mb-8 text-black">Kategori Produk</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 max-w-5xl">
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            href={`/kategori/${cat.id}`}
            className={`rounded-lg shadow-lg p-6 text-white transform transition hover:scale-105 ${cat.color}`}
          >
            <h2 className="text-xl font-semibold mb-2">{cat.name}</h2>
            <p className="text-sm">{cat.description}</p>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
}