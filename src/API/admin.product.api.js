import api from "./Axios";

export const getAdminProducts = () =>
  api.get("/api/admin/products").then(res => res.data);

export const createProduct = (formData) =>
  api.post("/api/admin/products", formData);

export const updateProduct = (id, formData) =>
  api.put(`/api/admin/products/${id}`, formData);

export const deleteProduct = (id) =>
  api.delete(`/api/admin/products/${id}`);
