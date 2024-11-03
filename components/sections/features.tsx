'use client'

import { motion, useInView } from "framer-motion"
import {
  Calendar,
  Globe,
  Users,
  Zap,
  BarChart,
  Settings,
  Lock,
  MessageSquare
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { cn } from "@/lib/utils"
import { GridBackground } from "../ui/grid-background"

const features = [
  {
    title: "Smart Scheduling",
    description: "AI-powered scheduling that learns your preferences",
    icon: Calendar,
    color: "text-blue-500",
  },
  {
    title: "Team Coordination",
    description: "Seamlessly manage team availability and meetings",
    icon: Users,
    color: "text-green-500",
  },
  {
    title: "Global Coverage",
    description: "Automatic timezone detection and smart meeting time suggestions",
    icon: Globe,
    color: "text-yellow-500",
  },
  {
    title: "Lightning Fast",
    description: "Optimized performance with instant updates and real-time sync",
    icon: Zap,
    color: "text-red-500",
  },
  {
    title: "Advanced Analytics",
    description: "Detailed insights into your meeting patterns and productivity",
    icon: BarChart,
    color: "text-purple-500",
  },
  {
    title: "Custom Workflows",
    description: "Build and automate your scheduling workflows with ease",
    icon: Settings,
    color: "text-pink-500",
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade security with SSO and advanced permissions",
    icon: Lock,
    color: "text-teal-500",
  },
  {
    title: "AI Assistant",
    description: "Smart meeting summaries and follow-up suggestions",
    icon: MessageSquare,
    color: "text-orange-500",
  },
]

export function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const featureCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: i * 0.1
      }
    }),
    hover: {
      scale: 1.05,
      rotateY: 10,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }

  return (
    <GridBackground className="py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-12 sm:space-y-16 lg:space-y-20"
        >
          {/* Section header with improved spacing */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
              Features that make scheduling{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                effortless
              </span>
            </h2>
            <p className="mx-auto mt-4 text-base sm:text-lg md:text-xl text-muted-foreground">
              Everything you need to streamline your scheduling process and boost productivity
            </p>
          </motion.div>

          {/* Feature grid with improved responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                variants={featureCardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: "-50px" }}
                className="group relative"
              >
                <Card className="h-full">
                  <CardHeader className="relative space-y-4">
                    <motion.div
                      variants={iconVariants}
                      className={cn(
                        "p-3 rounded-lg w-fit",
                        feature.color.replace('text-', 'bg-').concat('/10')
                      )}
                    >
                      <feature.icon 
                        className={cn("h-6 w-6 sm:h-8 sm:w-8", feature.color)}
                      />
                    </motion.div>
                    <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm sm:text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </GridBackground>
  )
} 