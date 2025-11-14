"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

// Data dummy
const books = {
  1: {
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    image: "/books/laskarpelangi.jpg",
    synopsis:
      "Laskar Pelangi menceritakan perjuangan sekelompok anak di Belitung untuk mendapatkan pendidikan di tengah keterbatasan. Kisah ini penuh inspirasi, semangat, dan nilai persahabatan.",
  },
  2: {
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    image: "/books/bumimanusia.jpg",
    synopsis:
      "Novel ini menggambarkan kehidupan kolonial di Hindia Belanda, melalui sudut pandang Minke, seorang pribumi yang berjuang melawan ketidakadilan sosial.",
  },
  3: {
    title: "Negeri 5 Menara",
    author: "Ahmad Fuadi",
    image: "/books/negeri.jpg",
    synopsis:
      "Cerita enam santri di pesantren yang memiliki mimpi besar untuk menaklukkan dunia. Dengan motto ‘Man Jadda Wajada’, siapa yang bersungguh-sungguh pasti berhasil.",
  },
};

export default function BookDetail({ params }) {
  const { id } = React.use(params);
  const book = books[id];

  const [showReadPopup, setShowReadPopup] = useState(false);
  const [showBorrowPopup, setShowBorrowPopup] = useState(false);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold mb-4">Buku tidak ditemukan</h2>
        <Link href="/" className="text-blue-600 hover:underline">
          Kembali ke halaman utama
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header sederhana */}
      <header className="flex justify-between items-center px-10 py-6 bg-white shadow">
        <Link href="/" className="text-2xl font-bold text-green-400">
          Lif-Pus
        </Link>
      </header>

      <section className="max-w-5xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Gambar buku */}
        <div>
          <Image
            src={book.image}
            alt={book.title}
            width={500}
            height={500}
            className="rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Detail buku */}
        <div>
          <h2 className="text-3xl font-bold mb-3">{book.title}</h2>
          <p className="text-lg text-gray-600 mb-6">Penulis: {book.author}</p>
          <h3 className="text-xl font-semibold mb-2">Sinopsis:</h3>
          <p className="text-gray-700 leading-relaxed mb-8">{book.synopsis}</p>

          {/* Tombol aksi */}
          <div className="flex gap-4">
            <button
              onClick={() => setShowReadPopup(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              📖 Baca Buku
            </button>
            <button
              onClick={() => setShowBorrowPopup(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              📚 Pinjam Buku
            </button>
          </div>
        </div>
      </section>

      {/* Popup Baca Buku */}
      {showReadPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">📖 Baca Buku</h2>
            <p className="text-gray-700 mb-6 text-2xl font-bold">
              Apakah kamu sudah login? 
            </p>
            <p className="text-sm text-gray-500 mb-6">
              (Jika belum login, silahkan login terlebih dahulu)
            </p>
            <Link href="/login" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-cyan-600">
              Login
            </Link>
          </div>
        </div>
      )}

      {/* Popup Pinjam Buku */}
      {showBorrowPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">📚 Pinjam Buku</h2>
            <p className="text-gray-700 mb-6">
              Apakah kamu ingin meminjam buku <b>{book.title}</b>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  alert("Buku berhasil dipinjam 📘");
                  setShowBorrowPopup(false);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Ya, Pinjam
              </button>
              <button
                onClick={() => setShowBorrowPopup(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
