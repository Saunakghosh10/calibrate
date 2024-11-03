"use client"

import { cn } from "@/lib/utils"
import React from "react"

interface GridBackgroundProps {
  children: React.ReactNode
  className?: string
  isDark?: boolean
}

export function GridBackground({ 
  children, 
  className,
  isDark = false
}: GridBackgroundProps) {
  return (
    <div className={cn(
      "relative w-full",
      isDark ? "dark:bg-black bg-white" : "bg-background",
      "dark:bg-grid-white/[0.2] bg-grid-black/[0.2]",
      className
    )}>
      {/* Radial gradient mask */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  )
} 