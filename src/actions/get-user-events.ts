import { db } from "@/lib/db"


export const getUserEvents = async (userId: string) => {
  try {
    const userExists = await db.user.findUnique({
      where: { id: userId },
    })

    if (!userExists) throw new Error();

    const userEvents = await db.event.findMany({
      where: {
        userId
      },
      include: {
        Ticket: {
          select: {
            price: true,
          },
          orderBy: {
            price: 'asc'
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return userEvents

  } catch (error) {
    return []
  }
}