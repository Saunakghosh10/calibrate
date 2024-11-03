'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { ArrowRight } from "lucide-react"
import { GridBackground } from "../ui/grid-background"
import ShimmerButton from "@/components/magicui/shimmer-button"

const USE_CASES = [
  {
    title: "Enterprise",
    description: "Perfect for large organizations with complex scheduling needs",
    features: [
      "Advanced team management",
      "Custom workflows",
      "Enterprise SSO",
      "Dedicated support"
    ]
  },
  {
    title: "Small Business",
    description: "Ideal for growing teams and businesses",
    features: [
      "Team calendar",
      "Basic integrations",
      "Analytics",
      "Email support"
    ]
  }
]

export function UseCases() {
  return (
    <GridBackground className="py-24 sm:py-32" isDark>
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
            Scheduling that adapts to{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              any business
            </span>
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto">
            Whether you're a small team or a large enterprise, we've got you covered
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {USE_CASES.map((useCase) => (
            <motion.div
              key={useCase.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  <CardDescription className="text-base">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {useCase.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <ShimmerButton className="bg-background text-foreground hover:text-primary/90 text-base font-medium border border-primary/20">
            <span className="flex items-center gap-2">
              Learn more
              <motion.span
                className="inline-block"
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </span>
          </ShimmerButton>
        </motion.div>
      </div>
    </GridBackground>
  )
} 