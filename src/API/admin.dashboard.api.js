import api from "./Axios";

export const getDashboardData = async () => {
  const res = await api.get("/api/admin/dashboard");
  return res.data;
};
