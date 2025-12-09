"use client"

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu({ currentUser }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col gap-1 p-2"
        aria-label="Toggle menu"
      >
        <span className={`w-6 h-0.5 bg-gray-800 transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-gray-800 transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`w-6 h-0.5 bg-gray-800 transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg z-50 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-blue-600">Menu</h2>
              <button onClick={() => setIsOpen(false)} className="text-2xl">&times;</button>
            </div>
            <nav className="flex flex-col gap-4">
              <Link href="/home" className="text-lg hover:text-blue-600" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/kategori" className="text-lg hover:text-blue-600" onClick={() => setIsOpen(false)}>
                Kategori
              </Link>
              <Link href="/pinjam/riwayat" className="text-lg hover:text-blue-600" onClick={() => setIsOpen(false)}>
                Riwayat
              </Link>
              {currentUser && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Halo, {currentUser.username}</p>
                  <Link href="/profile" className="text-lg hover:text-blue-600" onClick={() => setIsOpen(false)}>
                    Profile
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
