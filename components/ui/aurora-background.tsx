"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        {/* Aurora effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary aurora */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 
            animate-aurora blur-[100px] opacity-50"
          />
          
          {/* Secondary aurora */}
          <div 
            className="absolute inset-0 bg-gradient-to-l from-secondary/30 via-secondary/10 to-secondary/30 
            animate-aurora-secondary blur-[100px] opacity-50"
          />
          
          {/* Accent aurora */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-accent/30 via-accent/10 to-accent/30 
            animate-aurora-accent blur-[100px] opacity-50"
          />

          {/* Noise texture overlay */}
          <div className="absolute inset-0 bg-noise opacity-20" />
        </div>

        {/* Radial gradient */}
        {showRadialGradient && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background to-transparent opacity-80" />
        )}

        {/* Content */}
        <div className="relative z-10 w-full">
          {children}
        </div>
      </div>
    </main>
  );
};
