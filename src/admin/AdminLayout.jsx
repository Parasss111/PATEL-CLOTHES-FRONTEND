import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 mt-12">
      {/* ============ SIDEBAR ============ */}
      <aside className="w-64 bg-gradient-to-b from-black to-gray-900 text-white flex flex-col p-6 shadow-xl">
        <h2 className="text-2xl font-extrabold tracking-wide mb-10">
          Admin Panel
        </h2>

        <nav className="space-y-3 text-sm">
  {[
    { name: "Dashboard", path: "/admin" },
    { name: "Products", path: "/admin/products" },   // view/edit/delete
    { name: "Add Product", path: "/admin/add-product" }, // create only
    { name: "Users", path: "/admin/users" },
    { name: "Orders", path: "/admin/orders" },
  ].map(link => (
    <NavLink
      key={link.path}
      to={link.path}
      end={link.path === "/admin"}
      className={({ isActive }) =>
        `block px-4 py-3 rounded-xl transition ${
          isActive
            ? "bg-white text-black font-semibold shadow"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }`
      }
    >
      {link.name}
    </NavLink>
  ))}
</nav>


        {/* Footer branding */}
        <div className="mt-auto text-gray-400 text-xs">
          © {new Date().getFullYear()} Admin System
        </div>
      </aside>

      {/* ============ CONTENT AREA ============ */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow p-8 min-h-[calc(100vh-5rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
