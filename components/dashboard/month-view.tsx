"use client"

import { useState } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, setHours, setMinutes } from "date-fns"
import type { Event } from "@/types"
import { cn } from "@/lib/utils"

interface EventCardProps {
  event: Event
  onDelete: (eventId: string) => Promise<void>
  onEdit?: (event: Event) => void
}

interface MonthViewProps {
  date: Date
  events: Event[]
  onTimeSelect: (start: Date) => void
  onDeleteEvent: (eventId: string) => Promise<void>
  onEditEvent?: (event: Event) => void
  EventComponent: React.ComponentType<EventCardProps>
}

export function MonthView({ date, events, onTimeSelect, onDeleteEvent, onEditEvent, EventComponent }: MonthViewProps) {
  const monthDays = eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  })

  const handleDayClick = (day: Date) => {
    // Get current time
    const now = new Date()
    // Set the selected day with current time
    const selectedDateTime = new Date(day.setHours(now.getHours(), now.getMinutes()))
    onTimeSelect(selectedDateTime)
  }

  return (
    <div className="grid grid-cols-7 gap-px">
      {monthDays.map((day) => {
        const dayEvents = events
          .filter(event => 
            format(new Date(event.startTime), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
          )
          .sort((a, b) => {
            const aTime = new Date(a.startTime).getTime()
            const bTime = new Date(b.startTime).getTime()
            return aTime - bTime
          })

        return (
          <div
            key={day.toString()}
            className="min-h-[120px] p-2 border-b border-r cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => handleDayClick(day)}
          >
            <div className={cn(
              "text-sm font-medium",
              format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                ? "text-primary"
                : ""
            )}>
              {format(day, 'd')}
            </div>
            <div className="mt-1 space-y-1">
              {dayEvents.map((event) => (
                <EventComponent
                  key={event.id}
                  event={event}
                  onDelete={onDeleteEvent}
                  onEdit={onEditEvent}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
} 