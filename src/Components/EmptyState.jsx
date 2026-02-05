const EmptyState = ({ title, subtitle, action }) => {
  return (
    <div className="py-32 text-center">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-gray-500 mt-2">{subtitle}</p>
      {action}
    </div>
  );
};

export default EmptyState;
