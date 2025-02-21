"use client"

import { useUser } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface CalendarHeaderProps {
  onNewEvent?: () => void
}

export function CalendarHeader({ onNewEvent }: CalendarHeaderProps) {
  const { user } = useUser()

  return (
    <div className="flex items-center justify-between border-b px-6 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
          <p className="text-sm text-muted-foreground">
            Manage your schedule and meetings
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={onNewEvent} size="sm" className="h-8">
          <Plus className="mr-2 h-4 w-4" />
          New Event
        </Button>
        {user?.imageUrl && (
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.imageUrl} alt={user.fullName || ''} />
            <AvatarFallback>{user.firstName?.[0]}</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  )
} 