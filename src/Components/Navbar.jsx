import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X, LogOutIcon } from "lucide-react";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import AuthModal from "./AuthPage/AuthModal";
import "../App.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="font-bold text-xl">
          PATEL
        </Link>

        {/* LINKS (DESKTOP) */}
        <div className="hidden md:flex gap-6">
          {/* ✅ HOME ADDED */}
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/my-orders">My Orders</Link>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-3">
          {/* CART ICON WITH BADGE */}
          <button
            onClick={() => navigate("/cart")}
            className="relative p-2 rounded-full hover:bg-gray-100"
          >
            <ShoppingCart size={22} />

            {cart.length > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-red-600 text-white text-xs
                w-5 h-5 flex items-center justify-center rounded-full"
              >
                {cart.length}
              </span>
            )}
          </button>

          {/* AUTH */}
          {user ? (
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <LogOutIcon size={22} />
            </button>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <User size={22} />
            </button>
          )}

          {/* MOBILE MENU */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* AUTH MODAL */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      {/* Menu */}
      {menuOpen && (
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          } bg-white shadow-lg border-t`}
        >
          <div className="flex flex-col px-4 py-4 space-y-4">
            {[
              { path: "/", label: "Home" },
              { path: "/products", label: "Products" },
              { path: "/contact", label: "Contact" },
              { path: "/my-orders", label: "My Orders" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium hover:text-orange-500 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
