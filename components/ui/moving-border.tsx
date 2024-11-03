"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const Button = React.forwardRef<
  HTMLButtonElement,
  {
    borderRadius?: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }
>(({ borderRadius = "1.75rem", className, children, onClick }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={cn(
        "bg-transparent relative text-sm font-medium px-4 py-2 border border-primary/30 hover:border-primary/50",
        "transition-all duration-500 hover:scale-105",
        "group/button cursor-pointer",
        className
      )}
      style={{ borderRadius: borderRadius }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50 opacity-0 group-hover/button:opacity-100 blur-xl transition-all duration-500"
        style={{ borderRadius: borderRadius }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-primary opacity-0 group-hover/button:opacity-10 transition-all duration-500"
        style={{ borderRadius: borderRadius }}
      />
      <div className="relative">{children}</div>
    </button>
  );
});

Button.displayName = "MovingBorderButton";
