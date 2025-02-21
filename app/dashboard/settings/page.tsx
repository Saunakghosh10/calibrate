import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex-1 flex items-center justify-center flex-col gap-4 p-8 min-h-[calc(100vh-4rem)]">
      <Settings className="h-16 w-16 text-muted-foreground" />
      <h2 className="text-2xl font-semibold">Settings</h2>
      <p className="text-muted-foreground text-center max-w-md">
        Customize your calendar preferences, manage notifications, and configure integrations.
        This feature is coming soon!
      </p>
    </div>
  )
} 