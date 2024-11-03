"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void
  children: React.ReactNode
}) => {
  return (
    <nav 
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-border/50 bg-background/80 shadow-sm backdrop-blur-md"
    >
      <ul className="flex items-center gap-4 px-8 py-2">{children}</ul>
    </nav>
  )
}

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string | null) => void
  active: string | null
  item: string
  children: React.ReactNode
}) => {
  return (
    <li
      onMouseEnter={() => setActive(item)}
      className="relative rounded-full px-4 py-2 hover:bg-accent/50 transition-colors"
    >
      <motion.span
        animate={{
          color: active === item ? "var(--primary)" : "var(--foreground)",
        }}
        className="relative z-10 text-sm font-medium"
      >
        {item}
      </motion.span>
      {active === item && (
        <motion.div
          layoutId="active"
          className="absolute inset-0 rounded-full bg-accent/50"
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
        />
      )}
      {active === item && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
        >
          <div className="w-max rounded-xl border bg-background p-4 shadow-xl">
            {children}
          </div>
        </motion.div>
      )}
    </li>
  )
}

export const HoveredLink = ({ children, ...props }: any) => {
  return (
    <Link
      {...props}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  )
}

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string
  description: string
  href: string
  src: string
}) => {
  return (
    <Link href={href} className="flex items-center gap-4 p-2 hover:bg-accent/50 rounded-lg transition-colors">
      <Image
        src={src}
        width={60}
        height={60}
        alt={title}
        className="rounded-lg object-cover"
      />
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </Link>
  )
} 