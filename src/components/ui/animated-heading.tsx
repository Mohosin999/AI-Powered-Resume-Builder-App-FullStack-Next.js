"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

// Define the props interface
interface AnimatedHeadingProps {
  text: string;
  className?: string;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  className = "",
}) => {
  const words = text.split(" ");

  // Define animation variants with typed custom parameter
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <h1 className={`text-3xl md:text-5xl font-bold ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={wordVariants}
          className="inline-block"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </h1>
  );
};

export default AnimatedHeading;
