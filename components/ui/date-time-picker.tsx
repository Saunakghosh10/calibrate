"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DateTimePickerProps {
  date: Date
  setDate: (date: Date) => void
  minDate?: Date
}

export function DateTimePicker({
  date,
  setDate,
  minDate,
}: DateTimePickerProps) {
  const minuteOptions = Array.from({ length: 4 }, (_, i) => i * 15)
  const hourOptions = Array.from({ length: 24 }, (_, i) => i)

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDate = new Date(selectedDate)
      newDate.setHours(date.getHours(), date.getMinutes())
      setDate(newDate)
    }
  }

  const handleTimeChange = (type: "hours" | "minutes", value: string) => {
    const newDate = new Date(date)
    if (type === "hours") {
      newDate.setHours(parseInt(value))
    } else {
      newDate.setMinutes(parseInt(value))
    }
    setDate(newDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP p") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={(date) => minDate ? date < minDate : false}
          initialFocus
        />
        <div className="border-t p-3 flex gap-2">
          <Select
            value={date.getHours().toString()}
            onValueChange={(value) => handleTimeChange("hours", value)}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Hour" />
            </SelectTrigger>
            <SelectContent position="popper">
              {hourOptions.map((hour) => (
                <SelectItem key={hour} value={hour.toString()}>
                  {hour.toString().padStart(2, "0")}:00
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={date.getMinutes().toString()}
            onValueChange={(value) => handleTimeChange("minutes", value)}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Minute" />
            </SelectTrigger>
            <SelectContent position="popper">
              {minuteOptions.map((minute) => (
                <SelectItem key={minute} value={minute.toString()}>
                  :{minute.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  )
} 