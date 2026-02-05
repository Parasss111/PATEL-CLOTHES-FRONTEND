import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { X, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/AuthContext";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();

  const validationSchema = Yup.object({
    name: isLogin ? Yup.string() : Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);

        if (isLogin) {
          await login({ email: values.email, password: values.password });
          toast.success("Logged in successfully");
        } else {
          await signup(values);
          toast.success("Account created successfully");
        }

        resetForm();
        onClose();
      } catch (err) {
        toast.error(err?.response?.data?.message || err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <>
      {/* BACKDROP */}
      <motion.div
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
      />

      {/* MODAL */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        bg-white rounded-3xl shadow-2xl w-[92%] max-w-md z-[1000] overflow-hidden"
      >
        {/* HEADER GRADIENT */}
        <div className="bg-gradient-to-r from-black via-gray-900 to-black p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-300 hover:text-white"
          >
            <X />
          </button>

          <h2 className="text-2xl font-extrabold tracking-wide">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <p className="text-gray-300 text-sm mt-1">
            {isLogin ? "Login to continue shopping" : "Sign up to get started"}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={formik.handleSubmit} className="p-6 space-y-4">

          {!isLogin && (
            <div>
              <input
                name="name"
                placeholder="Full Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
              )}
            </div>
          )}

          <div>
            <input
              name="email"
              placeholder="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition"
            />

            <button
              type="button"
              onClick={() => setShowPassword(p => !p)}
              className="absolute right-4 top-3 text-gray-500 hover:text-black"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>

            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:scale-[1.03] hover:bg-gray-900"
            }`}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {/* FOOTER SWITCH */}
        <div className="pb-6 text-center text-sm">
          {isLogin ? "New here?" : "Already have an account?"}
          <span
            onClick={() => {
              setIsLogin(p => !p);
              formik.resetForm();
            }}
            className="ml-1 text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            {isLogin ? "Create account" : "Login"}
          </span>
        </div>
      </motion.div>
    </>
  );
}
