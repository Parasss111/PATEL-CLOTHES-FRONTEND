import { useEffect, useState } from "react";
import api from "../API/Axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const loadProducts = async () => {
    const res = await api.get("/api/products");
    setProducts(res.data.products || res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id) => {
    await api.delete(`/api/products/${id}`);
    loadProducts();
  };

  const saveProduct = async () => {
    const formData = new FormData();
    formData.append("name", editProduct.name);
    formData.append("price", editProduct.price);
    if (newImage) formData.append("image", newImage);

    await api.put(`/api/products/${editProduct._id}`, formData);
    setEditProduct(null);
    setNewImage(null);
    loadProducts();
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">All Products</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map(p => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img src={p.image?.url} className="w-14 h-14 rounded-lg object-cover" />
                </td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">₹{p.price}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => setEditProduct(p)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL (same as before) */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[350px] space-y-4">
            <h3 className="text-lg font-semibold text-center">Edit Product</h3>

            <input
              value={editProduct.name}
              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
              className="w-full border px-3 py-2 rounded-lg"
            />

            <input
              value={editProduct.price}
              onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
              className="w-full border px-3 py-2 rounded-lg"
            />

            <input type="file" onChange={(e) => setNewImage(e.target.files[0])} />

            <div className="flex gap-2">
              <button onClick={saveProduct} className="bg-black text-white flex-1 py-2 rounded-lg">
                Save
              </button>
              <button onClick={() => setEditProduct(null)} className="border flex-1 py-2 rounded-lg">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
