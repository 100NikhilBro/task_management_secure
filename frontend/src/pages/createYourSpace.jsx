import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CreateYourSpace = () => {
  const [darkMode, setDarkMode] = useState(true);

  const nav = useNavigate();

  function navHandler(){
    nav("/createtask")
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-6 py-12 transition-colors duration-700
        ${
          darkMode
            ? 'bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-teal-300'
            : 'bg-[#f5f5f5] text-[#333]'
        }`}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-2 rounded-full shadow-lg hover:scale-110 transform transition"
      >
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>

      <motion.h1
        className="text-5xl font-extrabold mb-8 drop-shadow-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Create Your Space
      </motion.h1>

      <motion.p
        className="max-w-xl text-center mb-12 text-lg tracking-wide leading-relaxed font-semibold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Build your own digital space with vibrant backgrounds, animations, and dark mode support!
      </motion.p>

      <motion.button
      onClick={()=>{navHandler()}}
        className="px-10 py-4 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-full shadow-2xl
        hover:scale-110 hover:shadow-[0_0_25px_rgba(0,255,200,0.5)] transform transition duration-500 font-bold text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Get Started
      </motion.button>
    </div>
  );
};

export default CreateYourSpace;
