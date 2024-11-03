'use client'

import { motion } from "framer-motion"
import { CardStack } from "../ui/card-stack"
import { cn } from "@/lib/utils"

// Highlight component
const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-primary/10 text-primary dark:bg-primary/20 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  )
}

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    designation: "Product Manager at TechCorp",
    content: (
      <p>
        <Highlight>Calibrate has transformed</Highlight> how our team handles meetings. The AI scheduling is brilliant, and the interface is so intuitive!
      </p>
    ),
  },
  {
    id: 2,
    name: "Michael Chen",
    designation: "Engineering Lead",
    content: (
      <p>
        Finally, a scheduling tool that <Highlight>actually understands timezones</Highlight>! No more confusion with international clients. This is a game-changer.
      </p>
    ),
  },
  {
    id: 3,
    name: "Emma Davis",
    designation: "Marketing Director",
    content: (
      <p>
        The <Highlight>team coordination features</Highlight> are incredible. We've saved countless hours of back-and-forth emails. Highly recommend!
      </p>
    ),
  },
]

export function Testimonials() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      
      <div className="container relative px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
            Loved by teams worldwide
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
            See what our users have to say about their experience with Calibrate
          </p>
        </motion.div>

        <div className="mt-16 flex justify-center">
          <CardStack items={TESTIMONIALS} />
        </div>
      </div>
    </section>
  )
} 