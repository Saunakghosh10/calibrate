"use client";
import { cn } from "@/lib/utils";
import React from "react";

export default function AnimatedShinyText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative inline-block overflow-hidden [--shiny-width:50%] before:absolute before:inset-0 before:-z-10 before:translate-x-[calc(-100%-var(--shiny-width))] before:animate-[shiny-text_8s_ease-in-out_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent",
        className
      )}
    >
      {children}
    </div>
  );
} 