"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const FlipWords = ({
  words,
  className = "",
  duration = 2000,
}: {
  words: string[];
  className?: string;
  duration?: number;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <span 
      className={`inline-block relative ${className}`}
      style={{ 
        minWidth: '6ch',
        transition: 'min-width 0.1s ease-out',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          className="absolute left-0"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
      <span className="invisible">
        {words[index]}
      </span>
    </span>
  );
};
