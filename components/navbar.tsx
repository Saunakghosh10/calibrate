'use client'

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Calendar, Menu as MenuIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Menu, MenuItem, HoveredLink, ProductItem } from "./ui/navbar-menu"
import { UserButton, SignInButton, useAuth } from "@clerk/nextjs";
import Image from "next/image"

export function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Calibrate" width={32} height={32} />
          <span className="text-xl font-bold">Calibrate</span>
        </Link>

        <div className="flex-1" />

        {isSignedIn ? (
          <>
            <Button variant="ghost" asChild className="mr-4">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
} 