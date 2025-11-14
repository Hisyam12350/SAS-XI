"use client";
import { NextResponse } from "next/server";
import { Kavivanar, Lexend } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {getUser} from "../../lib/action"
import React, { use } from "react";

const kavivanar = Kavivanar({
  subsets: ["latin"],
  weight: ["400"],
});

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400"],
});

const alat = [
  {
    id: 1,
    title: "Kabel Roll",
    author: "Andrea Hirata",
    image: "/alat/kabelroll.jpg",
  },
  {
    id: 2,
    title: "Laptop",
    author: "Pramoedya Ananta Toer",
    image: "/alat/laptop.jpg",
  },
  {
    id: 3,
    title: "PC",
    author: "Ahmad Fuadi",
    image: "/alat/pc.jpg",
  },
  {
    id: 4,
    title: "Proyektor",
    author: "Ahmad Fuadi",
    image: "/alat/proyektor.jpg",
  },
  {
    id: 5,
    title: "Kamera",
    author: "Ahmad Fuadi",
    image: "/alat/kamera.jpg",
  },
];

export default async function Home() {

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 shadow-md bg-white">
        <div className="flex items-center gap-2">
          <Image src="/books/icon.jpg" alt="Logo" width={32} height={32} />
          <div className={kavivanar.className}>
          <h1 className="text-xl font-bold text-blue-600 ">Lif-Pus</h1>
          </div>
        </div>
        <div className={kavivanar.className}>
          <ul className="flex gap-6 text-lg font-medium md:text-md">
            <li><a href="#" className="hover:text-blue-600">Beranda</a></li>
            <li><a href="#" className="hover:text-blue-600">Koleksi</a></li>
            <li><a href="#" className="hover:text-blue-600">Kontak</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={lexend.className}>
      <main className=" text-center py-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-2">
          Selamat Datang di Lif-Pus
        </h2>
        <p className="text-gray-600 mb-10">
          Temukan dan baca buku favoritmu dengan mudah dan cepat
        </p>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 md:px-20">
          {alat.map((user) => (  
            <Link href={`/detailBuku/${user.id}`} key={user.id}>
            <div
              key={user.id}
              className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 text-center hover:shadow-lg transition"
            >
              <Image
                src={user.image}
                alt={user.title}
                width={300}
                height={250}
                className="mx-auto rounded-md"
              />
              <h3 className="mt-4 text-xl font-semibold">{user.title}</h3>
              <p className="text-md text-gray-500">{user.author}</p>
            </div>
          </Link>
          ))}
        </div>
      </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-6 text-sm border-t border-gray-200">
        <p className="font-semibold text-blue-600">Hubungi Kami</p>
        <p>Email: info@perpustakaanku.com</p>
        <p>Alamat: Jl. Buku Indah No. 123, Depok</p>
      </footer>
    </div>
  );
}
