import { useEffect, useState } from "react";
import api from "../../API/Axios";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    api.get("/api/orders/my")
      .then(res => setOrders(res.data));
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto py-24 space-y-6 px-4">

      <h1 className="text-3xl font-bold">My Orders</h1>

      {orders.length === 0 && (
        <p>No orders yet</p>
      )}

      {orders.map(o => (
        <div key={o._id} className="border rounded-xl p-4 space-y-3">

          <div className="flex justify-between">
            <p className="font-semibold">₹{o.total}</p>
            <p className="text-sm text-gray-500">
              {new Date(o.createdAt).toLocaleDateString()}
            </p>
          </div>

          <p>Status: <b>{o.orderStatus}</b></p>

          {o.items.map(i => (
            <div key={i._id} className="flex gap-3 items-center border-t pt-2">
              <img src={i.image} className="w-14 rounded-lg" />
              <div>
                <p className="font-medium">{i.name}</p>
                <p className="text-sm">Qty: {i.quantity}</p>
              </div>
            </div>
          ))}

        </div>
      ))}
    </div>
  );
}
