import { useEffect, useState } from "react";
import api from "../../API/Axios";
import ProductCard from "./ProductCard";
import ProductsSkeleton from "./ProductsSkeleton";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/products");

      // handle both paginated and normal response safely
      const list = res.data.products || res.data;

      setProducts(list);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <ProductsSkeleton />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">

      <h1 className="text-3xl font-bold mb-10 text-center">
        Our Collection
      </h1>

      {products.length === 0 ? (
        <p className="text-center">No products found</p>
      ) : (
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            gap-4
          "
        >
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};

export default ProductsPage;
