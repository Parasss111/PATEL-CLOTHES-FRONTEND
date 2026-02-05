import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { useEffect } from "react";

const OrderSuccess = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center space-y-6 animate-fade">

        {/* SUCCESS ICON */}
        <div className="mx-auto w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-5xl">
          ✅
        </div>

        <h1 className="text-3xl font-extrabold">
          Order Confirmed!
        </h1>

        <p className="text-gray-600">
          Your order has been placed successfully and will be delivered soon.
        </p>

        {/* TRUST INFO */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-500 pt-2">
          <div>🚚 Fast Delivery</div>
          <div>🔒 Secure Payment</div>
          <div>📦 Easy Returns</div>
          <div>📞 24/7 Support</div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">

          <Link
            to="/products"
            className="flex-1 bg-black text-white py-3 rounded-xl font-semibold hover:scale-[1.03] transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Go Home
          </Link>

        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;
