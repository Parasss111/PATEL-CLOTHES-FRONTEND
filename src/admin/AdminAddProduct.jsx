import { useState } from "react";
import api from "../API/Axios";

export default function AdminAddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const createProduct = async () => {
    if (!form.name || !form.price || !form.image) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("image", form.image);

    await api.post("/api/products", formData);

    setForm({ name: "", price: "", image: null });
    setPreview(null);
    alert("🎉 Product added successfully!");
  };

  return (
    <div className="flex justify-center items-start min-h-screen pt-10">

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl space-y-6">

        <h1 className="text-3xl font-bold text-center">
          Add New Product
        </h1>

        {/* IMAGE PREVIEW */}
        <div className="flex justify-center">
          {preview ? (
            <img
              src={preview}
              className="w-40 h-40 rounded-xl object-cover shadow"
            />
          ) : (
            <div className="w-40 h-40 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-400">
              Image Preview
            </div>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          className="w-full text-sm border rounded-lg p-2"
          onChange={(e) => {
            const file = e.target.files[0];
            setForm({ ...form, image: file });
            setPreview(URL.createObjectURL(file));
          }}
        />

        <input
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
        />

        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
        />

        <button
          onClick={createProduct}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
        >
          Add Product
        </button>

        <p className="text-xs text-gray-400 text-center">
          Supported formats: JPG, PNG • Max size 5MB
        </p>

      </div>
    </div>
  );
}
