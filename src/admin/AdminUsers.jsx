import { useEffect, useState } from "react";
import api from "../API/Axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await api.get("/api/admin/users");
    setUsers(res.data.users || res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    await api.delete(`/api/admin/users/${id}`);
    loadUsers();
  };

  const blockUser = async (id) => {
    await api.patch(`/api/admin/users/${id}/block`);
    loadUsers();
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Manage Users</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Role</th> {/* ✅ NEW */}
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr
                key={u._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">{u.name}</td>
                <td className="p-3">{u.email}</td>

                {/* ✅ ROLE BADGE */}
                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>

                {/* STATUS */}
                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.isBlocked
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {u.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => blockUser(u._id)}
                    className="px-3 py-1 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    {u.isBlocked ? "Unblock" : "Block"}
                  </button>

                  <button
                    onClick={() => deleteUser(u._id)}
                    className="px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No users found
          </p>
        )}
      </div>
    </div>
  );
}
