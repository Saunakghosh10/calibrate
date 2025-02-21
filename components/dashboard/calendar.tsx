"use client"
import { useState } from "react"
import { format, subDays, addDays, startOfWeek, endOfWeek, eachDayOfInterval, setHours, setMinutes } from "date-fns"
import { Button } from "@/components/ui/button"
import { MonthView } from "./month-view"
import { EventDialog } from "./event-dialog"
import { useRouter } from "next/navigation"
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  Users,
  Settings,
  Calendar as CalendarLucide,
  Filter
} from "lucide-react"
import type { Calendar as CalendarType, EventCategory } from "@/types"
import { EventCard } from "./event-card"
import { motion, AnimatePresence } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import type { Event } from "@/types"

interface CalendarProps {
  calendars: CalendarType[]
}

const CATEGORIES = [
  { id: 'work' as const, label: 'Work', color: 'bg-blue-500' },
  { id: 'personal' as const, label: 'Personal', color: 'bg-green-500' },
  { id: 'important' as const, label: 'Important', color: 'bg-red-500' },
  { id: 'meetings' as const, label: 'Meetings', color: 'bg-purple-500' },
]

export function Calendar({ calendars }: CalendarProps) {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState<Date | null>(null)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [activeFilters, setActiveFilters] = useState<EventCategory[]>(CATEGORIES.map(c => c.id))
  const [currentView, setCurrentView] = useState<"calendar" | "team" | "settings">("calendar")

  const handleTimeSelect = (time: Date) => {
    setSelectedTime(time)
    setEditingEvent(null)
    setIsEventDialogOpen(true)
  }

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event)
    setSelectedTime(new Date(event.startTime))
    setIsEventDialogOpen(true)
  }

  const handleNewEvent = () => {
    const now = new Date()
    const defaultTime = setHours(setMinutes(now, 0), now.getHours() + 1)
    setSelectedTime(defaultTime)
    setEditingEvent(null)
    setIsEventDialogOpen(true)
  }

  const handleCreateEvent = async (eventData: {
    title: string
    description: string
    startTime: Date
    endTime: Date
    category: EventCategory
    isRecurring?: boolean
    recurrence?: any
  }) => {
    try {
      const response = await fetch(editingEvent ? `/api/events/${editingEvent.id}` : "/api/events", {
        method: editingEvent ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...eventData,
          calendarId: calendars[0]?.id,
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || `Failed to ${editingEvent ? 'update' : 'create'} event`)
      }

      const event = await response.json()
      console.log(`${editingEvent ? 'Updated' : 'Created'} event:`, event)

      router.refresh()
      setIsEventDialogOpen(false)
      setEditingEvent(null)
    } catch (error) {
      console.error(`Error ${editingEvent ? 'updating' : 'creating'} event:`, error)
      alert(error instanceof Error ? error.message : `Failed to ${editingEvent ? 'update' : 'create'} event`)
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete event")
      }

      // Reset states to prevent dialog from opening
      setSelectedTime(null)
      setIsEventDialogOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error deleting event:", error)
    }
  }

  const toggleFilter = (category: EventCategory) => {
    setActiveFilters(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const filteredEvents = calendars[0]?.events.filter((event: Event) => 
    activeFilters.includes(event.category)
  ) || []

  // Debug logging
  console.log('Calendars:', calendars)
  console.log('Filtered Events:', filteredEvents)
  console.log('Active Filters:', activeFilters)

  const upcomingEvents = filteredEvents
    .filter((event: Event) => new Date(event.startTime) >= new Date())
    .slice(0, 3)

  const weeklyEvents = filteredEvents.filter((event: Event) => {
    const eventDate = new Date(event.startTime)
    const weekStart = startOfWeek(new Date())
    const weekEnd = endOfWeek(new Date())
    return eventDate >= weekStart && eventDate <= weekEnd
  })

  const handleViewChange = (view: "calendar" | "team" | "settings") => {
    setCurrentView(view)
  }

  const sidebarItems = [
    {
      title: "My Calendar",
      icon: CalendarLucide,
      onClick: () => handleViewChange("calendar"),
      isActive: currentView === "calendar",
    },
    {
      title: "Schedule",
      icon: Clock,
      onClick: handleNewEvent,
      badge: filteredEvents.length,
    },
    {
      title: "Team Calendar",
      icon: Users,
      onClick: () => handleViewChange("team"),
      isActive: currentView === "team",
    },
    {
      title: "Settings",
      icon: Settings,
      onClick: () => handleViewChange("settings"),
      isActive: currentView === "settings",
    },
  ]

  const renderContent = () => {
    switch (currentView) {
      case "team":
        return (
          <div className="flex-1 flex items-center justify-center flex-col gap-4 p-8">
            <Users className="h-16 w-16 text-muted-foreground" />
            <h2 className="text-2xl font-semibold">Team Calendar</h2>
            <p className="text-muted-foreground text-center max-w-md">
              Collaborate with your team, manage shared calendars, and coordinate schedules. 
              This feature is coming soon!
            </p>
          </div>
        )
      case "settings":
        return (
          <div className="flex-1 flex items-center justify-center flex-col gap-4 p-8">
            <Settings className="h-16 w-16 text-muted-foreground" />
            <h2 className="text-2xl font-semibold">Settings</h2>
            <p className="text-muted-foreground text-center max-w-md">
              Customize your calendar preferences, manage notifications, and configure integrations. 
              This feature is coming soon!
            </p>
          </div>
        )
      default:
        return (
          <>
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold">Calendar</h1>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-2 border-b">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentDate(prev => subDays(prev, 30))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <motion.h2 
                  key={currentDate.toString()}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-lg font-semibold min-w-[200px] text-center"
                >
                  {format(currentDate, "MMMM yyyy")}
                </motion.h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentDate(prev => addDays(prev, 30))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key="month"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  <MonthView
                    date={currentDate}
                    events={filteredEvents}
                    onTimeSelect={handleTimeSelect}
                    onDeleteEvent={handleDeleteEvent}
                    onEditEvent={handleEditEvent}
                    EventComponent={EventCard}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )
    }
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card flex flex-col">
        <div className="p-4 border-b">
          <Button
            onClick={handleNewEvent}
            className="w-full"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </div>

        <div className="flex-1 p-4 space-y-6">
          {/* Navigation */}
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.title}
                variant={item.isActive ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={item.onClick}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span className="flex-1 text-left">{item.title}</span>
                {item.badge && (
                  <span className="ml-auto bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                    {item.badge}
                  </span>
                )}
              </Button>
            ))}
          </div>

          {/* Calendar Filters */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Calendar Filters</h3>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`filter-${cat.id}`}
                    checked={activeFilters.includes(cat.id)}
                    onCheckedChange={() => toggleFilter(cat.id)}
                  />
                  <label
                    htmlFor={`filter-${cat.id}`}
                    className="flex items-center text-sm gap-2 cursor-pointer"
                  >
                    <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                    {cat.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Upcoming Events</h3>
            <div className="space-y-2">
              {upcomingEvents.map((event: Event) => (
                <div
                  key={event.id}
                  className="p-2 bg-muted/50 rounded-lg space-y-1 cursor-pointer hover:bg-muted/70 transition-colors"
                >
                  <div className="font-medium text-sm truncate">{event.title}</div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {format(new Date(event.startTime), "MMM d, h:mm a")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Stats */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-muted/50 rounded-lg">
                <div className="text-xs text-muted-foreground">Total Events</div>
                <div className="text-lg font-semibold">{filteredEvents.length}</div>
              </div>
              <div className="p-2 bg-muted/50 rounded-lg">
                <div className="text-xs text-muted-foreground">This Week</div>
                <div className="text-lg font-semibold">
                  {weeklyEvents.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {renderContent()}
      </div>

      {selectedTime && (
        <EventDialog
          isOpen={isEventDialogOpen}
          onClose={() => {
            setIsEventDialogOpen(false)
            setEditingEvent(null)
          }}
          startTime={selectedTime}
          onCreateEvent={handleCreateEvent}
          editingEvent={editingEvent}
        />
      )}
    </div>
  )
} 