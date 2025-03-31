// src/components/AnimatedButton.jsx
import React from "react";
import { motion } from "framer-motion";

const AnimatedButton = ({ onClick, children, className = "", disabled }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-4 py-2 rounded-lg transition ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;