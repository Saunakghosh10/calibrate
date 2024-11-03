'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Clock, Globe, Video } from 'lucide-react'
import { format, addMonths, subMonths } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SchedulingPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const daysInMonth = Array.from(
    { length: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() },
    (_, i) => i + 1
  )

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Badge variant="outline" className="mb-4">
            NEW
            <span className="ml-2 text-muted-foreground">Cal.com launches v4.6</span>
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Scheduling infrastructure
            <br />
            for <span className="text-primary">everyone.</span>
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>John Smith</CardTitle>
                    <CardDescription>30 Minute Meeting</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  <span>30 min</span>
                  <Video className="h-4 w-4 ml-4" />
                  <span>Zoom</span>
                  <Globe className="h-4 w-4 ml-4" />
                  <span>Europe/London</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Book a meeting to discuss your project requirements and how we can help.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrevMonth}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-xl font-semibold">
                    {format(currentDate, 'MMMM yyyy')}
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNextMonth}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {days.map(day => (
                    <div key={day} className="text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                    <div key={`empty-${index}`} />
                  ))}
                  {daysInMonth.map(day => {
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                    const isSelected = selectedDate?.toDateString() === date.toDateString()
                    const isToday = new Date().toDateString() === date.toDateString()

                    return (
                      <Button
                        key={day}
                        variant={isSelected ? "default" : "ghost"}
                        className={`
                          h-10 w-full rounded-md
                          ${isToday ? 'border border-primary' : ''}
                          ${isSelected ? 'bg-primary text-primary-foreground' : ''}
                        `}
                        onClick={() => setSelectedDate(date)}
                      >
                        {day}
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <AnimatePresence>
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-4"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Available Times</CardTitle>
                      <CardDescription>
                        {format(selectedDate, 'EEEE, MMMM do, yyyy')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-2">
                        {['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'].map((time) => (
                          <Button
                            key={time}
                            variant="outline"
                            className="w-full"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center"
        >
          <Button size="lg" className="bg-primary text-primary-foreground">
            Sign Up Now
            <span className="ml-2">→</span>
          </Button>
          <p className="mt-2 text-sm text-muted-foreground">30 seconds or less</p>
        </motion.div>
      </div>
    </div>
  )
}