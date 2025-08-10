import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../axios";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",  // yehan pr abhi ke liye --> role ko degfault user rakh rhe hai in future jb RBAC fully implemnet krenge jo backend mein bna padha hai tb dekhenge   
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await api.post("/user/signup", form);
      setMessage(res.data.message || "Signup successful!");
      setForm({ name: "", email: "", password: "", role: "User" }); 
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6 relative overflow-hidden">
      <div className="relative bg-[#222222] p-8 rounded-xl max-w-md w-full shadow-xl text-white z-10">
        <h2 className="text-2xl font-semibold mb-5 text-center">Create Account</h2>

        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="example@mail.com"
              className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Minimum 8 chars, uppercase, lowercase, digit, special char"
              className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            } transition py-2 rounded-md font-semibold shadow-md`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400 text-sm">
          Already logged in?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
