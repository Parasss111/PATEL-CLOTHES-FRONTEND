import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../API/Axios";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();   // ✅ clearCart added
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  

  const [paymentMethod, setPaymentMethod] = useState("COD");

  if (!user) return null;

  



  const total = cart.reduce(
    (sum, p) => sum + p.price * p.qty,
    0
  );

  const isAddressValid = Object.values(address).every(
  v => v.trim() !== ""
);


  const placeOrder = async () => {
  if (cart.length === 0) {
    toast.error("Your cart is empty 🛒");
    navigate("/cart");
    return;
  }

  if (!isAddressValid) {
    toast.warning("Please fill all address fields 📦");
    return;
  }

  try {
    const orderItems = cart.map(p => ({
      product: p._id,
      name: p.name,
      price: p.price,
      quantity: p.qty,
      image: p.image?.url,
    }));

    const res = await api.post("/api/orders", {
      items: orderItems,
      address,
      paymentMethod,
      total,
    });

    console.log("ORDER RESPONSE:", res.data); // 🔥 DEBUG

    clearCart();
    toast.success("Order placed successfully 🎉");
    navigate("/order-success");

  } catch (error) {

    console.error("ORDER ERROR:", error.response?.data || error.message);

    toast.error(
      error.response?.data?.message || "Order failed — check backend"
    );
  }
};



  return (
    <div className="pt-24 pb-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* ================= ADDRESS ================= */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">

          <h2 className="text-2xl font-bold">Shipping Address</h2>

          {["fullName","phone","street","city","state","pincode"].map(field => (
            <input
              key={field}
              placeholder={field.replace(/([A-Z])/g," $1").toUpperCase()}
              value={address[field]}
              onChange={e =>
                setAddress({ ...address, [field]: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
            />
          ))}

          <div className="pt-3 space-y-2">
            <h3 className="font-semibold">Payment Method</h3>

            {["COD","CARD","UPI"].map(m => (
              <label key={m} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={paymentMethod === m}
                  onChange={() => setPaymentMethod(m)}
                />
                {m}
              </label>
            ))}
          </div>
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4 h-fit">

          <h2 className="text-2xl font-bold">Order Summary</h2>

          {cart.map(p => (
            <div key={p._id} className="flex justify-between text-sm">
              <span>{p.name} × {p.qty}</span>
              <span>₹{p.price * p.qty}</span>
            </div>
          ))}

          <hr />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={placeOrder}
            className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-xl font-semibold mt-3 transition"
          >
            Place Order
          </button>

        </div>
      </div>
    </div>
  );
}
