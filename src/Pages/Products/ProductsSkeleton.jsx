const ProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-200 h-80 rounded-xl"
        />
      ))}
    </div>
  );
};

export default ProductsSkeleton;
