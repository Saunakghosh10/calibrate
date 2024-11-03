"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function NumberTicker({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 50,
    damping: 30,
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [spring, value, isInView]);

  useEffect(() => {
    setIsInView(true);
  }, []);

  const display = useTransform(spring, (current) =>
    Math.round(current).toString()
  );

  return (
    <motion.span
      ref={ref}
      className={className}
    >
      {display}
    </motion.span>
  );
} 