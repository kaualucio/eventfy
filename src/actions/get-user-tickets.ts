import { db } from "@/lib/db"


export const getUserTickets = async (userId: string) => {
  try {
    const userExists = await db.user.findUnique({
      where: { id: userId },
    })

    if (!userExists) throw new Error();

    const userEvents = await db.ticket.findMany({
      where: {
        userId
      },
      include: {
        event: {
          select: {
            title: true,
            slug: true,
          },
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