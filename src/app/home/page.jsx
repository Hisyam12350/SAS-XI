import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogoutButton from "../components/LogoutButton";
import Link from "next/link";
import { redirect } from "next/navigation";
import { use } from "react";
import Image from "next/image";


export default async function DasbordPage() {
    const hasba = await getServerSession(authOptions);
    const user = hasba.user;

    // if (user.role != 'admin') {
    //     redirect('/login');
    // }

    const books = [
  {
    id: 1,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    image: "/books/laskarpelangi.jpg",
  },
  {
    id: 2,
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    image: "/books/bumimanusia.jpg",
  },
  {
    id: 3,
    title: "Negeri 5 Menara",
    author: "Ahmad Fuadi",
    image: "/books/negeri.jpg",
  },
  {
    id: 4,
    title: "Negeri 5 Menara",
    author: "Ahmad Fuadi",
    image: "/books/negeri.jpg",
  },
  {
    id: 5,
    title: "Negeri 5 Menara",
    author: "Ahmad Fuadi",
    image: "/books/negeri.jpg",
  },
];

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
              {/* Navbar */}
              <nav className="flex justify-between items-center p-4 shadow-md bg-white">
                <div className="flex items-center gap-2">
                  <Image src="/books/icon.jpg" alt="Logo" width={32} height={32} />
                  <h1 className="text-xl font-bold text-blue-600">Lif-Pus</h1>
                </div>
                <ul className="flex gap-6 text-lg font-medium md:text-md">
                  <li><a href="#" className="hover:text-blue-600">Beranda</a></li>
                  <li><a href="#" className="hover:text-blue-600">Koleksi</a></li>
                  <li><a href="#" className="hover:text-blue-600">Kontak</a></li>
                </ul>
              </nav>
        
              {/* Hero Section */}
              <main className=" text-center py-16">
                <h2 className="text-3xl font-bold text-blue-600 mb-2">
                  Selamat Datang di Lif-Pus
                </h2>
                <p className="text-gray-600 mb-10">
                  Temukan dan baca buku favoritmu dengan mudah dan cepat
                </p>
        
                {/* Books Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 md:px-20">
                  {books.map((book) => (
                    <Link href={`/detailBuku/${book.id}`} key={book.id}>
                    <div
                      key={book.id}
                      className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 text-center hover:shadow-lg transition"
                    >
                      <Image
                        src={book.image}
                        alt={book.title}
                        width={300}
                        height={250}
                        className="mx-auto rounded-md"
                      />
                      <h3 className="mt-4 text-xl font-semibold">{book.title}</h3>
                      <p className="text-md text-gray-500">{book.author}</p>
                    </div>
                  </Link>
                  ))}
                </div>
              </main>
        
              {/* Footer */}
              <footer className="bg-gray-100 text-center py-6 text-sm border-t border-gray-200">
                <p className="font-semibold text-blue-600">Hubungi Kami</p>
                <p>Email: info@perpustakaanku.com</p>
                <p>Alamat: Jl. Buku Indah No. 123, Depok</p>
              </footer>
            </div>
    );
}