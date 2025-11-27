import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background: contained image, blurred, with dim overlay */}
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div
          className="w-full h-full bg-center bg-no-repeat bg-contain filter blur-md"
          style={{ backgroundImage: "url('/barang/bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Page content (above background) */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <nav className="flex justify-between items-center px-10 py-5 bg-blue-600 shadow">
          <h1 className="text-xl font-bold text-white">Sarana-Prasarana</h1>
          <ul className="flex gap-6 text-lg font-medium md:text-md">
            <li>
              <Link className="bg-white py-1 px-5 rounded-2xl text-black" href={'/login'}>
                Login
              </Link>
            </li>
          </ul>
        </nav>

        <main className="flex-1 flex items-center justify-center">
          <div className="text-center text-white p-6 sm:p-12 md:p-24 w-full sm:w-auto">
            <h2 className="text-4xl font-bold mb-4">Selamat Datang</h2>
            <p className="max-w-xl mx-auto">Temukan dan pinjam sarana-prasarana sekolah dengan mudah.</p>
          </div>
        </main>
      </div>
    </div>
  );
}