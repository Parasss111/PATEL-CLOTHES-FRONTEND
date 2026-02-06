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
          <p>User: {o.address?.fullName}</p>
          <p>Street: {o.address?.street}</p>
          <p>City: {o.address?.city}</p>
          <p>State: {o.address?.state}</p>
          <p>Phone: {o.address?.phone}</p>
          <p>Total: ₹{o.total}</p>
          <p>Payment: {o.paymentMethod}</p>
          <p>Status: {o.orderStatus}</p>
        </div>
      ))}
    </div>
  );
}
