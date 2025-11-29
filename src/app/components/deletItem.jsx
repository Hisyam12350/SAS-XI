export default function DeleteItem({ item }) {
    const handleDelete = async () => {
    await fetch(`/api/items/${item.id}`, { method: "DELETE" });
    alert("Item berhasil dihapus");
    // Bisa tambahkan router.refresh() untuk update UI
  };
    return (
        <button onClick={() => handleDelete(item.id)}>Delete</button>
    )
}