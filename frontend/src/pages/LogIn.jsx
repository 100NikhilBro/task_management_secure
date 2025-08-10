import React, { useState } from "react";
import api from "../axios";
import { Link, useNavigate } from "react-router-dom";


// Note --> login mein
// humsha yaad rakhna agr ek baar login hua --> to local staorage mein set krna hai 



import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await api.post("/user/signin", form);
    
    // console.log("Login response token:", res.data.token);
    

    localStorage.setItem('token', res.data.token);
    
    toast.success(res.data.message || "Login successful!");
    
    setTimeout(() => {
      navigate('/profile');
    }, 1000);
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed!");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6 relative overflow-hidden">
        <div className="relative bg-[#222222] p-8 rounded-xl max-w-md w-full shadow-xl text-white z-10">
          <h2 className="text-2xl font-semibold mb-5 text-center">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="********"
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
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-500 hover:underline">
              Signup here
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Login;
