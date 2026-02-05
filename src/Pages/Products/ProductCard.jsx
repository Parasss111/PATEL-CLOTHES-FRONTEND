import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
      console.log("CLICKED:", product._id);
      navigate(`/products/${product._id}`);
    }}
      className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition p-3"
    >
      <img
        src={product.image?.url}
        className="w-full h-48 object-cover rounded-lg"
      />

      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>
    </div>
  );
}
