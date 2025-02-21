import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { prisma } from "@/lib/db"
import type { EventCategory } from "@/types"

export async function PUT(
  req: Request,
  { params }: { params: { eventId: string } }
) {
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
      isRecurring,
      recurrence,
    } = await req.json()

    if (!title || !startTime || !endTime || !category) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Validate category
    const validCategories: EventCategory[] = ['work', 'personal', 'important', 'meetings']
    if (!validCategories.includes(category)) {
      return new NextResponse("Invalid category", { status: 400 })
    }

    // Check if event exists and belongs to user
    const existingEvent = await prisma.event.findUnique({
      where: {
        id: params.eventId,
        userId,
      },
    })

    if (!existingEvent) {
      return new NextResponse("Event not found", { status: 404 })
    }

    // Update event
    const event = await prisma.event.update({
      where: {
        id: params.eventId,
      },
      data: {
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        isRecurring: isRecurring || false,
        recurrence: recurrence || null,
        metadata: {
          category,
        },
      },
    })

    // Return event with category in the expected format
    return NextResponse.json({
      ...event,
      category: (event.metadata as any)?.category || 'work',
    })
  } catch (error) {
    console.error("[EVENT_PUT]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const event = await prisma.event.findUnique({
      where: {
        id: params.eventId,
        userId,
      },
    })

    if (!event) {
      return new NextResponse("Event not found", { status: 404 })
    }

    await prisma.event.delete({
      where: {
        id: params.eventId,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[EVENT_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 