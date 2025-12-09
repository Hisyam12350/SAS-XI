
import { ambilSemuaPeminjaman, ambilPeminjamanByUserId } from "../../../../lib/action";
import { TombolSetujui, TombolTolak, TombolSelesai, TombolHapus } from "../../components/TombolAksiPeminjaman";
import { getCurrentUser } from "../../../../lib/auth";
import Link from "next/link";

export default async function RiwayatPeminjamanPage() {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Silakan Login</h2>
          <p className="text-gray-600 mb-6">Anda harus login untuk melihat riwayat peminjaman</p>
          <Link href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Login
          </Link>
        </div>
      </div>
    );
  }
  
  // Jika user adalah sekretaris, tampilkan semua peminjaman
  // Jika user biasa, tampilkan hanya peminjaman mereka
  const peminjaman = currentUser.role === 'sekertaris' 
    ? await ambilSemuaPeminjaman()
    : await ambilPeminjamanByUserId(currentUser.id);

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

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-2 md:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3">
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-gray-800">Riwayat Peminjaman</h1>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                {currentUser.role === 'sekertaris' 
                  ? 'Semua peminjaman' 
                  : `Peminjaman atas nama: ${currentUser.username}`}
              </p>
            </div>
            <Link
              href="/home"
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm md:text-base"
            >
              ← Kembali
            </Link>
          </div>

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
                          {currentUser.role === 'sekertaris' ? (
                            <>
                              {item.status === 'diproses' && (
                                <>
                                  <TombolSetujui id={item.id} />
                                  <TombolTolak id={item.id} />
                                </>
                              )}
                              {item.status === 'disetujui' && (
                                <TombolSelesai id={item.id} />
                              )}
                              <TombolHapus id={item.id} />
                            </>
                          ) : (
                            <span className="text-xs text-gray-500 italic">
                              {item.status === 'diproses' && 'Menunggu'}
                              {item.status === 'disetujui' && 'Disetujui'}
                              {item.status === 'ditolak' && 'Ditolak'}
                              {item.status === 'selesai' && 'Selesai'}
                            </span>
                          )}
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
