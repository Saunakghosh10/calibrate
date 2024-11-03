'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { Separator } from "../ui/separator"

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16 lg:py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 sm:gap-12 sm:grid-cols-2 md:grid-cols-4 lg:gap-16"
          >
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <Calendar className="h-6 w-6" />
                <span className="font-bold text-xl">Calibrate</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-[16rem]">
                Scheduling infrastructure for everyone. Simple, powerful, and flexible.
              </p>
            </motion.div>

            {/* Product Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="font-semibold text-base">Product</h4>
              <ul className="space-y-3">
                {["Features", "Integrations", "Pricing", "API"].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`#${item.toLowerCase()}`} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="font-semibold text-base">Company</h4>
              <ul className="space-y-3">
                {["About", "Blog", "Careers", "Contact"].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/${item.toLowerCase()}`} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="font-semibold text-base">Legal</h4>
              <ul className="space-y-3">
                {["Privacy", "Terms", "Security", "Cookies"].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/${item.toLowerCase()}`} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        <Separator className="opacity-50" />
        
        {/* Bottom Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-6 sm:py-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <motion.p variants={itemVariants} className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Calibrate. All rights reserved.
          </motion.p>
          <motion.div variants={itemVariants} className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
} 