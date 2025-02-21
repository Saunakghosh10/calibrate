import type { Prisma } from "@prisma/client"

export type EventCategory = 'work' | 'personal' | 'important' | 'meetings';

// Define the Event type with metadata and category
export type Event = Omit<Prisma.EventGetPayload<{}>, 'metadata'> & {
  category: EventCategory;
  metadata?: Prisma.JsonValue;
};

// Define the Calendar type with events
export type Calendar = Omit<
  Prisma.CalendarGetPayload<{
    include: { events: true };
  }>,
  'events'
> & {
  events: Event[];
}; 