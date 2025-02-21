"use client"

import { useState } from "react"
import { format } from "date-fns"
import { MoreVertical, Trash, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { Event } from "@/types"

const CATEGORY_COLORS = {
  work: 'bg-blue-500',
  personal: 'bg-green-500',
  important: 'bg-red-500',
  meetings: 'bg-purple-500',
} as const

interface EventCardProps {
  event: Event
  onDelete: (eventId: string) => Promise<void>
  onEdit?: (event: Event) => void
}

export function EventCard({ event, onDelete, onEdit }: EventCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      setIsDeleting(true)
      await onDelete(event.id)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onEdit) {
      onEdit(event)
    }
  }

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Clicking the card also triggers edit
    if (onEdit) {
      onEdit(event)
    }
  }

  return (
    <div 
      className="group relative flex-1 min-w-[150px] bg-card rounded-md border p-2 hover:shadow-sm transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className={cn("w-2 h-2 rounded-full", CATEGORY_COLORS[event.category])} />
            <h4 className="font-medium truncate">{event.title}</h4>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {format(new Date(event.startTime), "h:mm a")} -{" "}
            {format(new Date(event.endTime), "h:mm a")}
          </div>
          {event.isRecurring && (
            <div className="text-xs text-muted-foreground mt-1">
              ↻ Recurring
            </div>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>
              <Edit2 className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
} 