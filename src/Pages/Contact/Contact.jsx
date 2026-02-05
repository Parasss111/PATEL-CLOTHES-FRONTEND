import { useState } from "react";
import api from "../../API/Axios";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  await api.post("/api/contact", form);

  alert("Message sent successfully! 📩");
  setForm({ name: "", email: "", message: "" });
};

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-gray-50 mt-12">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT INFO */}
        <div className="bg-black text-white p-10 flex flex-col justify-center space-y-4">
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="text-gray-300">
            Have questions about our products or orders?  
            We’d love to hear from you.
          </p>

          <div className="space-y-2 text-sm text-gray-300">
            <p>📧 support@patelstore.com</p>
            <p>📞 +91 80002 18725</p>
            <p>📍 Surat, India</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-10 space-y-5"
        >
          <h3 className="text-2xl font-bold mb-2">Contact Us</h3>

          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
          />

          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
          />

          <textarea
            rows="4"
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none resize-none"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
          >
            Send Message
          </button>
        </form>

      </div>
    </div>
  );
};

export default Contact;
