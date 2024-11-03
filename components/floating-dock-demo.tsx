"use client"

import React from "react"
import { FloatingDock } from "@/components/ui/floating-dock"
import {
  Home,
  Terminal,
  Layout,
  GitBranch,
  Twitter,
  Github,
  Calendar
} from "lucide-react"
import Image from "next/image"

export function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: <Home className="h-full w-full text-muted-foreground" />,
      href: "#",
    },
    {
      title: "Features",
      icon: <Terminal className="h-full w-full text-muted-foreground" />,
      href: "#features",
    },
    {
      title: "Calendar",
      icon: <Calendar className="h-full w-full text-primary" />,
      href: "#calendar",
    },
    {
      title: "Components",
      icon: <Layout className="h-full w-full text-muted-foreground" />,
      href: "#components",
    },
    {
      title: "Changelog",
      icon: <GitBranch className="h-full w-full text-muted-foreground" />,
      href: "#changelog",
    },
    {
      title: "Twitter",
      icon: <Twitter className="h-full w-full text-muted-foreground" />,
      href: "#twitter",
    },
    {
      title: "GitHub",
      icon: <Github className="h-full w-full text-muted-foreground" />,
      href: "#github",
    },
  ]

  return (
    <FloatingDock
      items={links}
      className="z-50"
      mobileClassName="translate-y-0 bottom-6"
    />
  )
} 