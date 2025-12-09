import { ambilSemuaPeminjaman } from "../../../../lib/action";
import { TombolSetujui, TombolTolak, TombolSelesai, TombolHapus } from "../../components/TombolAksiPeminjaman";
import { getCurrentUser } from "../../../../lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function KelolaPeminjamanPage() {
  const currentUser = await getCurrentUser();
  
  // Cek apakah user adalah sekretaris
  if (!currentUser || currentUser.role !== 'sekertaris') {
    redirect('/home');
  }
  
  const peminjaman = await ambilSemuaPeminjaman();

  const getStatusBadge = (status) => {
    const statusConfig = {
      'diproses': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Diproses' },
      'disetujui': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Disetujui' },
      'ditolak': { bg: 'bg-red-100', text: 'text-red-800', label: 'Ditolak' },
      'selesai': { bg: 'bg-green-100', text: 'text-green-800', label: 'Selesai' }
    };
    const config = statusConfig[status] || statusConfig['diproses'];
    return `${config.bg} ${config.text}`;
  };

  const getStatusLabel = (status) => {
    const labels = {
      'diproses': 'Diproses',
      'disetujui': 'Disetujui',
      'ditolak': 'Ditolak',
      'selesai': 'Selesai'
    };
    return labels[status] || status;
  };

  // Filter peminjaman yang perlu diproses
  const peminjamanDiproses = peminjaman.filter(p => p.status === 'diproses');
  const peminjamanLainnya = peminjaman.filter(p => p.status !== 'diproses');

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-2 md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3">
            <h1 className="text-xl md:text-3xl font-bold text-gray-800">Kelola Peminjaman</h1>
            <Link
              href="/sekertaris"
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm md:text-base"
            >
              ← Kembali
            </Link>
          </div>

          {/* Statistik */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="bg-yellow-50 p-3 md:p-4 rounded-lg border border-yellow-200">
              <p className="text-xs md:text-sm text-gray-600">Menunggu</p>
              <p className="text-xl md:text-2xl font-bold text-yellow-700">
                {peminjaman.filter(p => p.status === 'diproses').length}
              </p>
            </div>
            <div className="bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-200">
              <p className="text-xs md:text-sm text-gray-600">Disetujui</p>
              <p className="text-xl md:text-2xl font-bold text-blue-700">
                {peminjaman.filter(p => p.status === 'disetujui').length}
              </p>
            </div>
            <div className="bg-green-50 p-3 md:p-4 rounded-lg border border-green-200">
              <p className="text-xs md:text-sm text-gray-600">Selesai</p>
              <p className="text-xl md:text-2xl font-bold text-green-700">
                {peminjaman.filter(p => p.status === 'selesai').length}
              </p>
            </div>
            <div className="bg-red-50 p-3 md:p-4 rounded-lg border border-red-200">
              <p className="text-xs md:text-sm text-gray-600">Ditolak</p>
              <p className="text-xl md:text-2xl font-bold text-red-700">
                {peminjaman.filter(p => p.status === 'ditolak').length}
              </p>
            </div>
          </div>
        </div>

        {/* Peminjaman yang Perlu Diproses */}
        {peminjamanDiproses.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
              🔔 Perlu Persetujuan ({peminjamanDiproses.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead className="bg-yellow-50">
                  <tr>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700">No</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Barang</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700 hidden md:table-cell">Peminjam</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Jml</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700 hidden sm:table-cell">Tanggal</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {peminjamanDiproses.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700">{index + 1}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <div className="text-xs md:text-sm font-medium text-gray-900">{item.namaBarang}</div>
                        <div className="text-xs text-gray-500 capitalize">{item.kategoriBarang}</div>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 hidden md:table-cell">
                        <div className="text-xs md:text-sm text-gray-900">{item.namaPeminjam}</div>
                        <div className="text-xs text-gray-500">{item.emailPeminjam}</div>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700">{item.jumlah}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 hidden sm:table-cell">
                        <div>{new Date(item.tanggalPinjam).toLocaleDateString('id-ID', {day: '2-digit', month: '2-digit'})}</div>
                        <div className="text-xs text-gray-500">
                          s/d {new Date(item.tanggalKembali).toLocaleDateString('id-ID', {day: '2-digit', month: '2-digit'})}
                        </div>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <div className="flex flex-col md:flex-row gap-1 md:gap-2">
                          <TombolSetujui id={item.id} />
                          <TombolTolak id={item.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Semua Riwayat Peminjaman */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Semua Riwayat Peminjaman</h2>
          
          {peminjaman.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <p className="text-gray-500 text-base md:text-lg">Belum ada data peminjaman</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700">No</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Barang</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700 hidden lg:table-cell">Peminjam</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Jml</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700 hidden md:table-cell">Kategori</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700 hidden sm:table-cell">Tgl Pinjam</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700 hidden sm:table-cell">Tgl Kembali</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {peminjaman.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700">{index + 1}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <div className="text-xs md:text-sm font-medium text-gray-900">{item.namaBarang}</div>
                        <div className="text-xs text-gray-500 hidden md:block">{item.deskripsi}</div>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 hidden lg:table-cell">
                        <div className="text-xs md:text-sm text-gray-900">{item.namaPeminjam}</div>
                        <div className="text-xs text-gray-500">{item.emailPeminjam}</div>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700">{item.jumlah}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 capitalize hidden md:table-cell">{item.kategoriBarang}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 hidden sm:table-cell">
                        {new Date(item.tanggalPinjam).toLocaleDateString('id-ID', {day: '2-digit', month: '2-digit'})}
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-700 hidden sm:table-cell">
                        {new Date(item.tanggalKembali).toLocaleDateString('id-ID', {day: '2-digit', month: '2-digit'})}
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <span className={`inline-flex px-1 md:px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(item.status)}`}>
                          {getStatusLabel(item.status)}
                        </span>
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3">
                        <div className="flex flex-col md:flex-row gap-1 md:gap-2">
                          {item.status === 'diproses'}
                          {item.status === 'disetujui' && (
                            <TombolSelesai id={item.id} />
                          )}
                          <TombolHapus id={item.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
