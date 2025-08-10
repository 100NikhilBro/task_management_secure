import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TextAnimation = ({ text }) => {
  const textAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 50,
      },
    }),
  };

  return (
    <div style={{ display: "inline-flex", overflow: "hidden" }}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={textAnimation}
          initial="hidden"
          animate="visible"
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:hidden bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6">
        <h1 className="text-white text-2xl sm:text-3xl font-extrabold text-center drop-shadow-lg mb-4">
          <TextAnimation text={"Welcome to Planify"} />
        </h1>
        <p className="text-gray-300 text-center text-sm">
          Manage your tasks easily and boost productivity.
        </p>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-black via-gray-900 to-gray-800 items-center justify-center p-8">
        <div>
          <h1 className="text-white text-5xl font-extrabold mb-4 text-left drop-shadow-lg">
            <TextAnimation text={"Welcome to Planify"} />
          </h1>
          <p className="text-gray-300 text-lg max-w-md text-left">
            Manage your tasks easily and boost productivity with modern features.
          </p>
        </div>
      </div>

      <div className="flex-1 w-full md:w-1/2 bg-[#121212] p-8 flex items-center justify-center">
        <div className="space-y-6 w-full max-w-xs">
         <Link to="/signup">
  <button
    className="relative cursor-pointer overflow-hidden w-full py-3 text-indigo-200 border-b-2 border-indigo-500 font-semibold bg-transparent transition-all duration-300
      before:content-[''] before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-indigo-500 before:transition-all before:duration-500 hover:before:w-full hover:text-white"
  >
    <span className="relative z-10">Sign Up</span>
  </button>
</Link>

<Link to="/login">
  <button
    className="relative cursor-pointer overflow-hidden w-full py-3 text-white border-b-2 border-white font-semibold bg-transparent transition-all duration-300
      before:content-[''] before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-white before:bg-opacity-20 before:transition-all before:duration-500 hover:before:w-full hover:text-black"
  >
    <span className="relative z-10">Log In</span>
  </button>
</Link>

        </div>
      </div>
    </div>
  );
};

export default Home;
