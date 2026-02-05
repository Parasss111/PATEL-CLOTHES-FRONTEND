import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../API/Axios";
import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";


export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, buyNow } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/api/products/${id}`);
      setProduct(res.data.product || res.data);
    };
    load();
  }, [id]);

  if (!product)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading product...
      </div>
    );

  return (
    <div className="pt-24 pb-28 bg-gray-50">
      {" "}
      {/* extra bottom padding for sticky bar */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* IMAGE */}
        <div className="bg-white p-6 rounded-3xl shadow">
          <img
            src={product.image?.url}
            className="w-full h-[420px] object-cover rounded-2xl"
            alt={product.name}
          />
        </div>

        {/* PRODUCT INFO */}
        <div className="space-y-5">
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-extrabold text-gray-900">
              ₹{product.price}
            </span>
            <span className="text-green-600 font-semibold">Special Price</span>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {product.description ||
              "Premium quality product with fast delivery & easy returns."}
          </p>

          {/* TRUST STRIP */}
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-500 pt-2">
            <span>🚚 Free Delivery</span>
            <span>🔁 7 Day Return</span>
            <span>💳 Secure Payment</span>
            <span>⭐ Top Rated</span>
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="hidden md:flex gap-4 pt-6">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl text-lg font-bold shadow"
            >
              ADD TO CART
            </button>

            <button
              onClick={() => {
                buyNow(product);
                navigate("/checkout");
              }}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {/* ================= FLIPKART STYLE STICKY BAR (MOBILE) ================= */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden flex">
        <button
          onClick={() => addToCart(product)}
          className="w-1/2 bg-orange-500 text-white py-4 font-bold text-lg"
        >
          ADD TO CART
        </button>

        <button className="w-1/2 bg-yellow-400 text-black py-4 font-bold text-lg">
          BUY NOW
        </button>
      </div>
    </div>
  );
}
