import api from "./Axios";

export const getAllOrders = async () => {
  const res = await api.get("/api/admin/orders");
  return res.data;
};

export const getSingleOrder = async (id) => {
  const res = await api.get(`/api/admin/orders/${id}`);
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await api.put(`/api/admin/orders/${id}`, { status });
  return res.data;
};
