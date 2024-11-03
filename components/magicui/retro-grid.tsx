"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function RetroGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div ref={gridRef} className="absolute inset-0 z-0">
      <div className="absolute inset-0 [perspective:1000px] [transform-style:preserve-3d]">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-primary/30 via-primary/10 to-transparent blur-[2px]" />
        <div className="absolute inset-0 flex h-full flex-col items-center justify-center bg-[linear-gradient(transparent_0%,rgb(0_0_0/30%)_50%,transparent_100%)] bg-[length:100%_8px] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] animate-move-vertical" />
        <div className="absolute inset-0 flex h-full flex-col items-center justify-center bg-[linear-gradient(to_right,transparent_0%,rgb(0_0_0/30%)_50%,transparent_100%)] bg-[length:8px_100%] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] animate-move-horizontal" />
      </div>
    </div>
  );
} 