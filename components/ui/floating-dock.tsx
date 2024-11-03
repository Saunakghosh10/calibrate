"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingDockProps {
  items: {
    title: string
    icon: React.ReactNode
    href: string
  }[]
  className?: string
  mobileClassName?: string
}

export function FloatingDock({
  items,
  className,
  mobileClassName,
}: FloatingDockProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-3 rounded-2xl bg-background/70 backdrop-blur-lg border border-border/50 shadow-lg",
        "flex items-center gap-4",
        "sm:gap-6",
        className,
        mobileClassName
      )}
    >
      {items.map((item, idx) => (
        <motion.a
          key={item.title}
          href={item.href}
          className="relative group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-6 h-6 sm:w-8 sm:h-8">{item.icon}</div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: -20 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover px-2 py-1 rounded text-xs whitespace-nowrap"
          >
            {item.title}
          </motion.span>
        </motion.a>
      ))}
    </motion.div>
  )
} 