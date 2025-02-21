import { Clock } from "lucide-react"

export default function SchedulePage() {
  return (
    <div className="flex-1 flex items-center justify-center flex-col gap-4 p-8 min-h-[calc(100vh-4rem)]">
      <Clock className="h-16 w-16 text-muted-foreground" />
      <h2 className="text-2xl font-semibold">Schedule Management</h2>
      <p className="text-muted-foreground text-center max-w-md">
        Advanced scheduling features, recurring events, and availability management.
        This feature is coming soon!
      </p>
    </div>
  )
} 