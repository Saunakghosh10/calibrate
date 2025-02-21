import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import type { EventCategory } from "@/types"

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const {
      title,
      description,
      startTime,
      endTime,
      category,
      calendarId,
    } = await req.json()

    if (!title || !startTime || !endTime || !calendarId || !category) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Validate category
    const validCategories: EventCategory[] = ['work', 'personal', 'important', 'meetings']
    if (!validCategories.includes(category)) {
      return new NextResponse("Invalid category", { status: 400 })
    }

    // Create event with metadata
    const event = await prisma.event.create({
      data: {
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        metadata: {
          category,
        },
        calendarId,
        userId,
      },
    })

    // Return event with category in the expected format
    return NextResponse.json({
      ...event,
      category: (event.metadata as any)?.category || 'work',
    })
  } catch (error) {
    console.error("[EVENTS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get user's calendars with their events
    const calendars = await prisma.calendar.findMany({
      where: {
        userId,
      },
      include: {
        events: {
          orderBy: {
            startTime: "asc",
          },
        },
      },
    })

    // Transform events to include category from metadata
    const transformedCalendars = calendars.map(calendar => ({
      ...calendar,
      events: calendar.events.map(event => ({
        ...event,
        category: (event.metadata as any)?.category || 'work',
      })),
    }))

    return NextResponse.json(transformedCalendars)
  } catch (error) {
    console.error("[EVENTS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 