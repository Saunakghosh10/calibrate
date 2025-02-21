"use client"

import { useState, useEffect } from "react"
import { format, addMinutes, isBefore, setHours, setMinutes } from "date-fns"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import type { Event, EventCategory } from "@/types"

interface EventDialogProps {
  isOpen: boolean
  onClose: () => void
  startTime: Date
  onCreateEvent: (eventData: {
    title: string
    description: string
    startTime: Date
    endTime: Date
    category: EventCategory
    isRecurring: boolean
    recurrence?: any
  }) => void
  editingEvent?: Event | null
}

const CATEGORIES = [
  { id: 'work', label: 'Work', color: 'bg-blue-500' },
  { id: 'personal', label: 'Personal', color: 'bg-green-500' },
  { id: 'important', label: 'Important', color: 'bg-red-500' },
  { id: 'meetings', label: 'Meetings', color: 'bg-purple-500' },
] as const

export function EventDialog({ isOpen, onClose, startTime, onCreateEvent, editingEvent }: EventDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>(startTime)
  const [duration, setDuration] = useState<"30" | "60" | "90" | "120">("60")
  const [category, setCategory] = useState<EventCategory>("work")
  const [isRecurring, setIsRecurring] = useState(false)

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title)
      setDescription(editingEvent.description || "")
      setSelectedDate(new Date(editingEvent.startTime))
      const durationMinutes = (new Date(editingEvent.endTime).getTime() - new Date(editingEvent.startTime).getTime()) / (1000 * 60)
      setDuration(durationMinutes.toString() as typeof duration)
      setCategory(editingEvent.category)
      setIsRecurring(editingEvent.isRecurring)
    } else {
      setTitle("")
      setDescription("")
      setSelectedDate(startTime)
      setDuration("60")
      setCategory("work")
      setIsRecurring(false)
    }
  }, [editingEvent, startTime])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isBefore(selectedDate, new Date())) {
      alert("Cannot create events in the past")
      return
    }

    const eventEndTime = addMinutes(selectedDate, parseInt(duration))

    onCreateEvent({
      title,
      description: description.slice(0, 300),
      startTime: selectedDate,
      endTime: eventEndTime,
      category,
      isRecurring,
      recurrence: isRecurring ? { frequency: 'weekly' } : undefined,
    })

    setTitle("")
    setDescription("")
    setSelectedDate(new Date())
    setCategory("work")
    setIsRecurring(false)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= 300) {
      setDescription(value)
    }
  }

  const filterPassedTime = (time: Date) => {
    const currentDate = new Date()
    const selectedDate = new Date(time)
    return currentDate.getTime() < selectedDate.getTime()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle>{editingEvent ? 'Edit Event' : 'Create New Event'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <RadioGroup
              value={category}
              onValueChange={(value) => setCategory(value as EventCategory)}
              className="grid grid-cols-2 gap-2"
            >
              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={cat.id}
                    id={cat.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={cat.id}
                    className={cn(
                      "flex-1 cursor-pointer rounded-md border-2 border-muted p-2 hover:bg-accent peer-data-[state=checked]:border-primary",
                      "flex items-center gap-2"
                    )}
                  >
                    <div className={cn("h-3 w-3 rounded-full", cat.color)} />
                    {cat.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Date & Time</Label>
            <div className="grid gap-2">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => date && setSelectedDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                filterTime={filterPassedTime}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                wrapperClassName="w-full"
                popperClassName="react-datepicker-popper"
                customInput={
                  <Input
                    value={format(selectedDate, "MMMM d, yyyy h:mm aa")}
                    readOnly
                  />
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Duration</Label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: "30", label: "30m" },
                { value: "60", label: "1h" },
                { value: "90", label: "1.5h" },
                { value: "120", label: "2h" },
              ].map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={duration === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDuration(option.value as typeof duration)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="recurring"
              checked={isRecurring}
              onCheckedChange={(checked) => setIsRecurring(checked as boolean)}
            />
            <Label htmlFor="recurring">Recurring event (weekly)</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description
              <span className="text-xs text-muted-foreground ml-2">
                ({description.length}/300)
              </span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Add description"
              className="resize-none"
              rows={3}
              maxLength={300}
            />
          </div>

          <DialogFooter>
            <Button type="submit">{editingEvent ? 'Update' : 'Create'} Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 