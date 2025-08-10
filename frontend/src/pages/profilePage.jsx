import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link,  } from 'react-router-dom';
import api from '../axios';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/user/profile`, { withCredentials: true })  
      .then(res => {
        setUser(res.data.user);
        setForm({ name: res.data.user.name, email: res.data.user.email, password: '' });
      })
      .catch(() => {
        toast.error('Failed to load profile');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      email: form.email,
      ...(form.password.trim() ? { password: form.password } : {})
    };

    setLoading(true);
    try {
      await api.put(`/user/updateProfile`, payload, { withCredentials: true });
      toast.success('Profile updated successfully!');
      setUser(prev => ({
        ...prev,
        name: payload.name,
        email: payload.email
      }));
      setForm(prev => ({ ...prev, password: '' }));
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    api.post(`/user/logout`, {}, { withCredentials: true })
      .then(() => {
        window.location.href = '/'; // isse --> Full page reload + navigation 
      })
      .catch((err) => {
        console.error('Logout failed:', err);
        toast.error('Logout failed');
      });
  };

  if (loading && !user) return <p className="text-center mt-10 text-gray-400">Loading profile...</p>;

  const avatarUrl = 'https://i.pravatar.cc/100';

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 sm:p-6 font-sans text-gray-300">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col sm:flex-row w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden bg-gray-800 bg-opacity-90 backdrop-blur-sm">
        
        <div className="sm:w-3/5 w-full p-6 sm:p-10 flex flex-col items-center justify-center bg-gray-700 shadow-inner sm:rounded-l-2xl rounded-t-2xl sm:rounded-tr-none">
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-20 mask-b-from-10% h-20 sm:w-24 sm:h-24 rounded-full border-4 border-gray-400 shadow-md mb-4 sm:mb-6"
          />
          <h1 className="text-2xl sm:text-3xl font-semibold mb-1 tracking-wide text-gray-100">
            {user?.name || 'User Name'}
          </h1>
          <p className="text-sm sm:text-md text-gray-300 mb-1">{user?.email || 'user@example.com'}</p>
          <p className="italic text-xs text-gray-400 mt-2 sm:mt-3 max-w-xs text-center leading-snug">
            Welcome to your profile! Update your info or log out on the right.
          </p>
        </div>

        <div className="sm:w-2/5 w-full p-6 sm:p-8 bg-gray-900 flex flex-col justify-center space-y-4 sm:space-y-5 sm:rounded-r-2xl rounded-b-2xl sm:rounded-bl-none">
          <h2 className="text-xl sm:text-2xl font-semibold text-center tracking-tight text-gray-100">
            Profile Settings
          </h2>

          <form onSubmit={handleUpdate} className="space-y-3 sm:space-y-4">
            <label className="block font-medium text-gray-300 text-sm">
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className="w-full mt-1 px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
              />
            </label>

            <label className="block font-medium text-gray-300 text-sm">
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full mt-1 px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
              />
            </label>

            <label className="block font-medium text-gray-300 text-sm">
              Password <span className="text-xs text-gray-500">(leave blank if no change)</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="new-password"
                className="w-full mt-1 px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full mt-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
          >
            Logout
          </button>

          <div className="mt-4 text-center">
            <Link
              to="/create-your-space"
              className="inline-block px-5 py-2 bg-indigo-700 text-white font-semibold rounded-full shadow-md hover:bg-indigo-800 hover:scale-105 transition-transform"
            >
              Create Your Space &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
