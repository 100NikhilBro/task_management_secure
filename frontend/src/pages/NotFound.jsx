import React from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black px-4">
      <motion.h1
        initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 10,
          duration: 0.8,
          delay: 0.3,
        }}
        whileHover={{ scale: 1.1, rotate: 5, color: "#ff49db" }}
        className="text-[12rem] sm:text-[18rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 select-none leading-none"
        style={{ marginBottom: '-50px' }}
      >
        404
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-3xl sm:text-5xl text-gray-300 font-semibold max-w-md text-center"
      ><br></br><br></br>
        Ooops! Page Not Found
      </motion.p>
    </div>
  );
};

export default NotFound;
