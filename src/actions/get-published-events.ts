import { db } from "@/lib/db"
import { Session } from "next-auth"

export const getPublishedEvents = async (session?: Session | null) => {
  try {

    if(session) {
      const events = await db.event.findMany({
        where: {
          is_published: true,
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
              userId: session.user.id,
            },
            select: {
              id: true,
              eventId: true
            }
          }
        }
      })

      return events
    }

    const events = await db.event.findMany({
      where: {
        is_published: true,
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
      }
    })

    return events
  } catch (error) {
    return []
  }
}