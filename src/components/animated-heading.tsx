import React from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
}

// Framer Motion variants
const letterVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03, // shorter delay per letter
      duration: 0.4,
    },
  }),
};

/**
 * Animate words in a heading
 *
 * @param {string} text - Text to animate
 * @returns {JSX.Element} Animated heading
 */
const AnimatedHeading = ({ text, className = "" }: AnimatedHeadingProps) => {
  // Split into words first, then letters for each word
  const words = text.split(" ");

  return (
    <h1
      className={`text-orange-500 text-3xl md:text-5xl font-bold ${className}`}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-block" }}>
          {word.split("").map((letter, letterIndex) => {
            const index = wordIndex * 10 + letterIndex; // unique delay index
            return (
              <motion.span
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                style={{ display: "inline-block" }}
              >
                {letter}
              </motion.span>
            );
          })}
          &nbsp; {/* preserve space between words */}
        </span>
      ))}
    </h1>
  );
};

export default AnimatedHeading;
