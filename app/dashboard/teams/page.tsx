import { Users } from "lucide-react"

export default function TeamsPage() {
  return (
    <div className="flex-1 flex items-center justify-center flex-col gap-4 p-8 min-h-[calc(100vh-4rem)]">
      <Users className="h-16 w-16 text-muted-foreground" />
      <h2 className="text-2xl font-semibold">Team Management</h2>
      <p className="text-muted-foreground text-center max-w-md">
        Manage your teams, invite members, and set up team calendars.
        This feature is coming soon!
      </p>
    </div>
  )
} 