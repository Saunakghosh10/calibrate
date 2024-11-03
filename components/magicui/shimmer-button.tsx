"use client";
import { cn } from "@/lib/utils";
import React from "react";

export default function ShimmerButton({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <button
      className={cn(
        "group relative w-fit cursor-pointer overflow-hidden whitespace-nowrap rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-all hover:scale-105",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-primary-foreground/25 to-transparent [--shimmer-speed:2s] group-hover:[--shimmer-speed:0.7s] animate-[shimmer-slide_var(--shimmer-speed)_infinite]" />
      {children}
    </button>
  );
} 