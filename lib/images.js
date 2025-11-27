// Helper untuk memilih path gambar berdasarkan nama barang
export function getImagePath(item) {
  if (!item) return "/barang/kabelroll.jpg";

  // Name-based map untuk matching
  const nameMap = {
    'kabel roll': "/barang/kabelroll.jpg",
    'laptop': "/barang/laptop.jpg",
    'pc': "/barang/pc.jpg",
    'proyektor': "/barang/proyektor.jpg",
    'kamera': "/barang/kamera.jpg",
    'pembersih toilet': "/barang/pembersih.jpg",
    'pembersih': "/barang/pembersih.jpg",
    'baterai': "/barang/baterai.jpg",
    'lakban': "/barang/lakban.jpg",
    'bola sepak': "/barang/bola.jpg",
    'bola basket': "/barang/bola basket.jpg",
    'bola voli': "/barang/bola voli.jpg",
    'matras senam': "/barang/matras.jpg",
    'matras': "/barang/matras.jpg",
    'kursi siswa': "/barang/kursi.jpg",
    'kursi': "/barang/kursi.jpg",
    'meja siswa': "/barang/meja.jpg",
    'meja': "/barang/meja.jpg",
    'papan tulis putih': "/barang/papantulis.jpeg",
    'papantulis': "/barang/papantulis.jpeg",
    'rak buku': "/barang/rak buku.jpg",
    'meja guru': "/barang/meja guru.jpg",
    'kursi guru': "/barang/kursi guru.jpg",
    'filing cabinet': "/barang/kabinet.jpg",
    'kabinet': "/barang/kabinet.jpg",
  };

  const name = (item.namaBarang || item.nama || '').toLowerCase();
  if (!name) return "/barang/kabelroll.jpg";

  // Try exact matches first
  if (nameMap[name]) return nameMap[name];

  // Fuzzy match: find any key that is included in item name
  for (const key of Object.keys(nameMap)) {
    if (name.includes(key)) return nameMap[key];
  }

  // Fallback
  return "/barang/kabelroll.jpg";
}
