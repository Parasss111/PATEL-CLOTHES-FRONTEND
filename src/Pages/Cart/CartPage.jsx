import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  if (cart.length === 0)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500 text-lg">
        🛒 Your cart is empty
      </div>
    );

  return (
    <div className="pt-24 pb-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ============ CART ITEMS ============ */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl shadow p-4 flex gap-4 items-center hover:shadow-md transition"
            >
              <img
                src={p.image?.url}
                className="w-24 h-24 rounded-xl object-cover"
              />

              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-gray-600">₹{p.price}</p>

                <button
                  onClick={() => removeFromCart(p._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>

              {/* QUANTITY CONTROLLER */}
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => updateQty(p._id, Math.max(1, p.qty - 1))}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  −
                </button>

                <span className="px-4">{p.qty}</span>

                <button
                  onClick={() => updateQty(p._id, p.qty + 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ============ PRICE SUMMARY ============ */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4 h-fit sticky top-24">
          <h2 className="text-lg font-semibold text-gray-700">PRICE DETAILS</h2>

          <div className="flex justify-between text-sm">
            <span>Price ({cart.length} items)</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Delivery</span>
            <span className="text-green-600">FREE</span>
          </div>

          <hr />

          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={() => {
              if (cart.length === 0) {
                toast.error("Your cart is empty 🛒");
                return;
              }
              navigate("/checkout");
            }}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-lg mt-3"
          >
            PLACE ORDER
          </button>
        </div>
      </div>

      {/* ============ MOBILE STICKY CHECKOUT ============ */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow md:hidden flex justify-between items-center px-4 py-3">
        <span className="font-bold text-lg">₹{total}</span>

        <button
          onClick={() => navigate("/checkout")}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
