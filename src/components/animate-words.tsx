"use client";
import { motion } from "framer-motion";

interface AnimateWordsProps {
  text: string;
  className?: string;
}

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const wordFade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Animate Words
 *
 * @param text The text string to animate word by word
 * @param className Optional additional class names for styling
 * @returns {JSX.Element} The animated heading component
 */
const AnimatedWords = ({ text, className = "" }: AnimateWordsProps) => {
  const words = text.split(" ");

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordFade} className="inline-block mr-2">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default AnimatedWords;
