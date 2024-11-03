'use client'

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Calendar, Menu as MenuIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Menu, MenuItem, HoveredLink, ProductItem } from "./ui/navbar-menu"

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const [active, setActive] = React.useState<string | null>(null)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  }

  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        scrolled && "shadow-sm"
      )}
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="font-bold text-lg">Calibrate</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <Menu setActive={setActive}>
              <MenuItem setActive={setActive} active={active} item="Features">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="#calendar">Team Calendar</HoveredLink>
                  <HoveredLink href="#scheduling">Smart Scheduling</HoveredLink>
                  <HoveredLink href="#automation">Workflow Automation</HoveredLink>
                  <HoveredLink href="#analytics">Analytics</HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Solutions">
                <div className="grid grid-cols-2 gap-10 p-4">
                  <ProductItem
                    title="Enterprise"
                    href="/enterprise"
                    src="/enterprise.jpg"
                    description="Advanced features for large teams"
                  />
                  <ProductItem
                    title="Small Business"
                    href="/small-business"
                    src="/small-business.jpg"
                    description="Perfect for growing teams"
                  />
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Pricing">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/pricing#basic">Basic</HoveredLink>
                  <HoveredLink href="/pricing#pro">Professional</HoveredLink>
                  <HoveredLink href="/pricing#team">Team</HoveredLink>
                  <HoveredLink href="/pricing#enterprise">Enterprise</HoveredLink>
                </div>
              </MenuItem>
            </Menu>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" size="sm">Sign in</Button>
              <Button size="sm">Get Started</Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              aria-label="Toggle Menu"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
} 