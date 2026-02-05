import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-12
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-3 tracking-wide">
            PATEL
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Premium streetwear designed for everyday comfort and bold style.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-white transition">Products</Link></li>
            <li><Link to="/cart" className="hover:text-white transition">Cart</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer transition">Shipping & Returns</li>
            <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer transition">Terms of Service</li>
            <li className="hover:text-white cursor-pointer transition">FAQs</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-white font-semibold mb-3">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-3">
            Get exclusive deals in your inbox
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="px-3 py-2 rounded-lg text-black outline-none w-full"
            />
            <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:scale-105 transition">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs sm:text-sm text-gray-500">
        © {new Date().getFullYear()} PATEL. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
