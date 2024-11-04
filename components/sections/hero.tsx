'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "../ui/button"
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"
import { useSpring, animated } from "@react-spring/web"
import { useInView } from "react-intersection-observer"
import { FlipWords } from "../ui/flip-words"
import { Button as MovingBorderButton } from "../ui/moving-border"
import { SparklesCore } from "../ui/sparkles"
import { ArrowRightIcon } from "@radix-ui/react-icons";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import ShimmerButton from "@/components/magicui/shimmer-button";
import RetroGrid from "@/components/magicui/retro-grid";
import Meteors from "@/components/magicui/meteors";

export function Hero() {
  const containerRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    })

    tl.to(textRef.current, {
      backgroundPositionX: "100%",
      ease: "none"
    })

    // Parallax background effect
    gsap.to(".hero-bg", {
      scrollTrigger: {
        trigger: containerRef.current,
        scrub: true,
      },
      y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
      ease: "none",
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  // Enhanced parallax effect
  const [springProps, setSpringProps] = useSpring(() => ({
    from: { scale: 1 },
    config: { mass: 1, tension: 170, friction: 26 }
  }))

  // Intersection observer for enhanced animations
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  // Enhanced grid animation
  const gridVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 0.15, 
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background">
      <div className="absolute inset-0 w-full h-full">
        <Meteors number={40} />
      </div>
      
      <div className="container relative px-4 sm:px-6 lg:px-8">
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 sm:py-32"
        >
          {/* Replace the old badge with new AnimatedShinyText */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            whileHover={{ scale: 1.05 }}
            className="mb-8 sm:mb-12 flex items-center justify-center"
          >
            <div className="group rounded-full border border-primary/10 bg-primary/5 text-base transition-all ease-in hover:cursor-pointer hover:bg-primary/10">
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1.5 text-primary transition ease-out">
                <span className="flex items-center gap-1">
                  ✨ Introducing Calibrate 1.0
                  <ArrowRightIcon className="ml-1 h-3 w-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </span>
              </AnimatedShinyText>
            </div>
          </motion.div>

          {/* Updated headline with better spacing */}
          <motion.div className="space-y-8 text-center w-full max-w-4xl mx-auto px-4">
            <motion.h1 
              ref={textRef}
              className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.15] sm:leading-[1.2]"
            >
              {/* Updated sparkles container with higher z-index and opacity */}
              <div className="absolute inset-0 z-0">
                <SparklesCore
                  id="hero-sparkles"
                  background="transparent"
                  minSize={0.4}
                  maxSize={1.2}
                  particleDensity={100}
                  className="w-full h-full"
                  particleColor="var(--primary)"
                />
              </div>

              <motion.span
                className="relative z-10 inline-block bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent pb-1 sm:pb-2"
              >
                The{" "}
                <FlipWords 
                  words={[
                    "Modern",
                    "Minimal",
                    "Magnificent",
                    "Meaningful"
                  ]}
                  className="min-w-[6ch] text-primary"
                  duration={2500}
                />{" "}
                Calendar
              </motion.span>
              <br className="hidden sm:block" />
              <motion.span
                className="inline-block bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent pb-1 sm:pb-2"
              >
                Platform
              </motion.span>
              <br />
              <motion.span
                className="inline-block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mt-2 sm:mt-4"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                for everyone
              </motion.span>
            </motion.h1>

            {/* Updated description with better spacing */}
            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-[90%] sm:max-w-[80%] text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              The most powerful calendar platform for individuals and teams.
              <br className="hidden sm:block" />
              Book meetings without the back-and-forth emails.
            </motion.p>
          </motion.div>

          {/* Updated CTA buttons with moving borders */}
          <motion.div 
            variants={itemVariants}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full px-4 sm:px-0"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <ShimmerButton className="w-full sm:w-auto text-base font-medium">
                <motion.span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </motion.span>
              </ShimmerButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <ShimmerButton 
                className="w-full sm:w-auto bg-background text-foreground hover:text-primary/90 text-base font-medium border border-primary/20"
              >
                View Demo
              </ShimmerButton>
            </motion.div>
          </motion.div>

          {/* Updated feature badges with better spacing */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.5
                }
              }
            }}
            initial="hidden"
            animate="visible"
            className="mt-14 sm:mt-16 flex flex-wrap justify-center gap-3 sm:gap-4 px-4"
          >
            {[
              'Custom Branding',
              'Team Calendar',
              'API Access',
              'Analytics',
              'Integrations'
            ].map((feature) => (
              <motion.div
                key={feature}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "var(--primary)",
                  color: "var(--background)",
                }}
                className="flex items-center gap-2 rounded-full bg-muted px-4 py-2.5 text-sm font-medium text-muted-foreground cursor-pointer transition-colors duration-200"
              >
                <CheckCircle className="h-4 w-4 text-primary" />
                {feature}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 