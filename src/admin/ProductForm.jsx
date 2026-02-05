import { useState } from "react";

const ProductForm = ({ initialData, onSubmit, loading }) => {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    price: initialData?.price || "",
    category: initialData?.category || "",
    sizes: initialData?.sizes?.join(",") || "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("category", form.category);
    fd.append("sizes", form.sizes);
    if (form.image) fd.append("image", form.image);

    onSubmit(fd);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl">
      <input name="name" placeholder="Name" onChange={handleChange} value={form.name} className="border p-2 w-full" />
      <input name="price" placeholder="Price" onChange={handleChange} value={form.price} className="border p-2 w-full" />
      <input name="category" placeholder="Category" onChange={handleChange} value={form.category} className="border p-2 w-full" />
      <input name="sizes" placeholder="Sizes (S,M,L)" onChange={handleChange} value={form.sizes} className="border p-2 w-full" />

      <input type="file" name="image" onChange={handleChange} />

      <button className="bg-black text-white px-4 py-2 rounded">
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default ProductForm;
