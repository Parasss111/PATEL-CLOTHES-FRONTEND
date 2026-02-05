import api from "./Axios";

export const getAllProducts = async () => {
  const res = await api.get("/api/products");
  return res.data;
};

export const getSingleProduct = async (id) => {
  const res = await api.get(`/api/products/${id}`);
  return res.data;
};
