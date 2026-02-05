const RecentOrders = ({ orders }) => {
  return (
    <div className="bg-white rounded-xl shadow mt-8">
      <h3 className="text-xl font-bold p-6 border-b">Recent Orders</h3>

      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="p-4">Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id} className="border-b">
              <td className="p-4">{order.user?.name}</td>
              <td>₹{order.total}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;
