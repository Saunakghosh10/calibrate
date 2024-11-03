"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = React.useState(false)

  // Handle hydration
  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const iconVariants = {
    initial: { 
      opacity: 0,
      scale: 0.3,
      rotate: -180
    },
    animate: { 
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.3,
      rotate: 180,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-accent/50 
        focus-visible:ring-2 focus-visible:ring-accent 
        active:scale-95 transition-transform"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' ? (
          <motion.div
            key="sun"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-300" />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </span>
    </Button>
  )
} 