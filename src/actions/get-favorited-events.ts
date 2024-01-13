import { db } from "@/lib/db"
import { Session } from "next-auth"

export const getFavoritedEvents = async (session?: Session | null) => {
  try {
    const events = await db.event.findMany({
      where: {
        is_published: true,
        FavoriteEvent: {
          some: {
            userId: session!.user.id
          }
        }
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        Ticket: {
          select: {
            price: true
          }
        },
        FavoriteEvent: {
          where: {
            userId: session!.user.id,
          },
          select: {
            id: true,
            eventId: true
          }
        }
      }
    })

    return events
  } catch (error) {
    return []
  }
}