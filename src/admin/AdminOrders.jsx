import { useEffect, useState } from "react";
import api from "../API/Axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/api/admin/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Orders</h2>

      {orders.map(o => (
        <div key={o._id} className="border p-3 mb-2">
          <p>User: {o.user?.email}</p>
          <p>Total: ₹{o.totalAmount}</p>
          <p>Status: {o.status}</p>
        </div>
      ))}
    </div>
  );
}
