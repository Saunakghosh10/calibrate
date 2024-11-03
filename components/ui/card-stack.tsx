"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export const CardStack = ({ items, offset = 2, scaleFactor = 0.06 }: any) => {
  const [cards, setCards] = useState(items)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCards((prevCards: any) => {
        const newArray = [...prevCards]
        const firstItem = newArray.shift()
        if (firstItem) newArray.push(firstItem)
        return newArray
      })
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="relative h-60 w-full max-w-md">
      <AnimatePresence mode="popLayout">
        {cards.map((card: any, index: number) => {
          const stackCards = index < offset
          const offset_y = stackCards ? index * 4 : 0
          const scale_factor = stackCards ? 1 - index * scaleFactor : 1 - offset * scaleFactor
          const card_body_y = stackCards ? index * 4 : 0

          return (
            <motion.div
              key={card.id}
              className={cn(
                "absolute inset-0 bg-background dark:bg-neutral-800/90 rounded-2xl p-4 border border-border/50",
                "backdrop-blur shadow-lg dark:shadow-neutral-700/30",
                index === 0 ? "cursor-grab active:cursor-grabbing" : "cursor-default pointer-events-none"
              )}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: offset_y,
                scale: scale_factor,
                zIndex: cards.length - index,
              }}
              exit={{ opacity: 0, y: -50 }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
              }}
              drag={index === 0 ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.y < -100) {
                  setCards((prevCards: any) => {
                    const newArray = [...prevCards]
                    const firstItem = newArray.shift()
                    if (firstItem) newArray.push(firstItem)
                    return newArray
                  })
                }
              }}
            >
              <motion.div
                className="relative z-10"
                animate={{ y: card_body_y }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-foreground" />
                  <div>
                    <h3 className="font-semibold text-foreground">{card.name}</h3>
                    <p className="text-sm text-muted-foreground">{card.designation}</p>
                  </div>
                </div>
                <div className="mt-4 text-muted-foreground">{card.content}</div>
              </motion.div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
} 