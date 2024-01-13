import { db } from "@/lib/db"

export const getEventBySlug = async (eventSlug: string) => {
  try {
    const event = await db.event.findUnique({
      where: {
        slug: eventSlug,
      },
      include: {
        Ticket: true,
        category: true,
        Schedule: {
          orderBy: {
            day: 'asc'
          }
        },
        user: {
          select: {
            image: true,
            name: true,
            last_name: true,
            Profile: true,
          }
        }
      }
    })

    if(!event) return null

    return event
  } catch (error) {
    return null
  }
}