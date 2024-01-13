import { db } from "@/lib/db"


export const getUserOrderedTickets = async (userId: string) => {
  try {

    const userExists = await db.user.findUnique({
      where: {
        id: userId,
      }
    })

    if(!userExists) throw new Error('Usuário inválido')
    
    const userOrders = await db.order.findMany({
      where: {
        userId
      }
    })

    return userOrders

  } catch (error) {
    console.log('GET_ORDERED_TICKETS', error)
    return []
  }
}