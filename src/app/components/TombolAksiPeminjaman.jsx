"use client";

import { updateStatusPeminjaman, hapusPeminjaman } from "../../../lib/action";

export function TombolSetujui({ id }) {
  return (
    <form action={updateStatusPeminjaman}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value="disetujui" />
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
      >
        Setujui
      </button>
    </form>
  );
}

export function TombolTolak({ id }) {
  return (
    <form action={updateStatusPeminjaman}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value="ditolak" />
      <button
        type="submit"
        className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
      >
        Tolak
      </button>
    </form>
  );
}

export function TombolSelesai({ id }) {
  return (
    <form action={updateStatusPeminjaman}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value="selesai" />
      <button
        type="submit"
        className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
      >
        Selesai
      </button>
    </form>
  );
}

export function TombolHapus({ id }) {
  const handleClick = (e) => {
    if (!confirm('Yakin ingin menghapus data ini?')) {
      e.preventDefault();
    }
  };

  return (
    <form action={hapusPeminjaman}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        onClick={handleClick}
        className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
      >
        Hapus
      </button>
    </form>
  );
}
