import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getSingleOrder,
  updateOrderStatus,
} from "../API/admin.order.api";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOrder = async () => {
  try {
    const data = await getSingleOrder(id);
    setOrder(data);
  } catch (err) {
    toast.error("Failed to load order");
  }
};

const handleStatusChange = async (e) => {
  try {
    const status = e.target.value;
    setLoading(true);
    await updateOrderStatus(id, status);
    toast.success("Order status updated");
    fetchOrder();
  } catch {
    toast.error("Update failed");
  } finally {
    setLoading(false);
  }
};


  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      {/* CUSTOMER INFO */}
      <div className="bg-white p-6 rounded-xl mb-6">
        <p><b>Customer:</b> {order.user?.name}</p>
        <p><b>Email:</b> {order.user?.email}</p>
        <p><b>Total:</b> ₹{order.total}</p>
      </div>

      {/* ITEMS */}
      <div className="bg-white p-6 rounded-xl mb-6">
        <h2 className="font-bold mb-4">Items</h2>

        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between border-b py-2">
            <span>{item.name} ({item.size}) × {item.quantity}</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
      </div>

      {/* STATUS UPDATE */}
      <div className="bg-white p-6 rounded-xl">
        <h2 className="font-bold mb-2">Order Status</h2>

        <select
          value={order.orderStatus}
          onChange={handleStatusChange}
          disabled={loading}
          className="border p-2 rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
    </div>
  );
};

export default OrderDetails;
