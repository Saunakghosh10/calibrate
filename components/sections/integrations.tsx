'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { 
  Slack, 
  Calendar, 
  Mail, 
  Video, 
  MessageSquare,
  ArrowRight
} from "lucide-react"

const apps = [
  {
    name: "Calendar",
    icon: Calendar,
    color: "text-blue-500",
  },
  {
    name: "Slack",
    icon: Slack,
    color: "text-purple-500",
  },
  {
    name: "Gmail",
    icon: Mail,
    color: "text-red-500",
  },
  {
    name: "Zoom",
    icon: Video,
    color: "text-cyan-500",
  },
  {
    name: "Teams",
    icon: MessageSquare,
    color: "text-green-500",
  },
]

export function Integrations() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
            Connect your favorite apps
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto">
            Calibrate works with all apps already in your scheduling flow ensuring everything works perfectly together
          </p>
        </motion.div>

        <motion.div 
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {apps.map((app) => (
            <motion.div
              key={app.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Card className="border-2 border-transparent hover:border-primary/20 transition-colors">
                <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                  <app.icon className={`h-12 w-12 ${app.color}`} />
                  <CardTitle className="text-sm sm:text-base">{app.name}</CardTitle>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 