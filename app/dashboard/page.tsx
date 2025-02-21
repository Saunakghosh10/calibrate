import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Calendar } from "@/components/dashboard/calendar";
import { prisma } from "@/lib/db";
import type { Calendar as CalendarType } from "@/types";

async function getOrCreateUser(userId: string) {
  try {
    // Get the current user from Clerk
    const clerkUser = await currentUser();
    if (!clerkUser) {
      throw new Error("No user found in Clerk");
    }

    // Try to find the user first
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // If user doesn't exist, create them
    if (!user) {
      const primaryEmail = clerkUser.emailAddresses[0]?.emailAddress;
      if (!primaryEmail) {
        throw new Error("No email address found for user");
      }

      user = await prisma.user.create({
        data: {
          id: userId,
          email: primaryEmail,
          firstName: clerkUser.firstName || null,
          lastName: clerkUser.lastName || null,
        },
      });
    }

    return user;
  } catch (error) {
    console.error("Error in getOrCreateUser:", error);
    return null;
  }
}

async function getCalendars(userId: string): Promise<CalendarType[]> {
  const calendars = await prisma.calendar.findMany({
    where: {
      userId,
    },
    include: {
      events: true,
    },
  });

  // Transform events to include category from metadata
  return calendars.map(calendar => ({
    ...calendar,
    events: calendar.events.map(event => ({
      ...event,
      category: (event.metadata as any)?.category || 'work',
    })),
  }));
}

export default async function DashboardPage() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  try {
    // Ensure user exists in our database
    const dbUser = await getOrCreateUser(userId);
    if (!dbUser) {
      throw new Error("Failed to create or retrieve user");
    }

    // Get or create default calendar
    let calendars = await getCalendars(userId);
    
    if (calendars.length === 0) {
      // Create default calendar if none exists
      const defaultCalendar = await prisma.calendar.create({
        data: {
          name: "My Calendar",
          userId,
        },
        include: {
          events: true,
        },
      });

      // Transform the default calendar to match the expected type
      calendars = [{
        ...defaultCalendar,
        events: defaultCalendar.events.map(event => ({
          ...event,
          category: 'work' as const,
        })),
      }];
    }

    return (
      <div className="h-[calc(100vh-4rem)]">
        <Calendar calendars={calendars} />
      </div>
    );
  } catch (error) {
    console.error("Error in DashboardPage:", error);
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground">Please try refreshing the page</p>
        </div>
      </div>
    );
  }
} 