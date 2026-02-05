import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../API/product.api";
import ProductCard from "../Products/ProductCard";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.slice(0, 8));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="pt-20 overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[70vh] md:h-[85vh] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_60%)]" />

        <div className="relative text-center max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
            Elevate Your Street Style
          </h1>

          <p className="text-gray-300 text-sm sm:text-lg mb-6 sm:mb-8">
            Premium fashion crafted for bold personalities
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/products")}
              className="bg-white text-black px-6 sm:px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              Shop Collection
            </button>

            <button
              onClick={() => navigate("/products")}
              className="border border-white px-6 sm:px-8 py-3 rounded-full hover:bg-white hover:text-black transition"
            >
              New Arrivals
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="max-w-7xl mx-auto px-4 py-14 sm:py-20">

        <div className="flex justify-between items-center mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-3xl font-bold">
            🔥 Featured Products
          </h2>

          <button
            onClick={() => navigate("/products")}
            className="text-blue-600 font-medium hover:underline text-sm sm:text-base"
          >
            View All →
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-56 sm:h-80 bg-gray-200 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {products.map(product => (
              <div
                key={product._id}
                className="hover:-translate-y-2 transition duration-300"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= CATEGORY STRIP ================= */}
      <section className="bg-black text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8 text-center">

          {["Hoodies", "Sneakers", "Accessories"].map((item, i) => (
            <div
              key={i}
              className="p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 hover:scale-105 transition cursor-pointer"
              onClick={() => navigate("/products")}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                {item}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Explore now
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PROMO ================= */}
      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">

          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 sm:mb-4">
            Designed For Comfort & Style
          </h2>

          <p className="text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            Our clothing blends premium materials with modern design for everyday wear.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="bg-black text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full hover:scale-105 transition"
          >
            Explore Collection
          </button>
        </div>
      </section>

    </div>
  );
};

export default Home;
