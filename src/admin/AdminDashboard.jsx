import { useEffect, useState } from "react";
import api from "../API/Axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const users = await api.get("/api/admin/users");
      const products = await api.get("/api/products");
      const orders = await api.get("/api/admin/orders");

      setStats({
        users: users.data.users?.length || users.data.length,
        products: products.data.products?.length || products.data.length,
        orders: orders.data.orders?.length || orders.data.length,
      });
    };

    loadStats();
  }, []);

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {[
          { label: "Total Users", value: stats.users },
          { label: "Total Products", value: stats.products },
          { label: "Total Orders", value: stats.orders },
        ].map(card => (
          <div
            key={card.label}
            className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition"
          >
            <p className="text-gray-500 mb-1">{card.label}</p>
            <h2 className="text-4xl font-bold">{card.value}</h2>
          </div>
        ))}

      </div>
    </div>
  );
}
