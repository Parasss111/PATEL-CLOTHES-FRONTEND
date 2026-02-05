import api from "./Axios";

export const placeOrder = async (orderData) => {
  const res = await api.post("/api/orders", orderData);
  return res.data;
};
