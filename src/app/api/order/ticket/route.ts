import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { nextAuthOptions } from "../../auth/[...nextauth]/route"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(nextAuthOptions)
    const values = await req.json()

    if(!session) return new NextResponse('Algo deu errado, tente novamente.', { status: 401 })

    if(!values) return new NextResponse('Algo deu errado, tente novamente.', { status: 400 })

    const eventTicketData = await db.ticket.findFirst({
      where: {
        id: values.ticketsInCart[0].id,
      },
      include: {
        event: {
          select: {
            title: true,
            slug: true,
            id: true,
          }
        }
      }
    })
    console.log(eventTicketData)
    const formattedTickets = values.ticketsInCart.map((ticket: any) => ({
      ...ticket,
      eventId: eventTicketData?.event.id,
      eventTitle: eventTicketData?.event.title,
      eventSlug: eventTicketData?.event.slug,
    }))

    const order = await db.order.create({
      data: {
        userId: session.user.id,
        ticketsInCart: JSON.stringify(formattedTickets),
        totalPrice: values.totalPrice
      }
    })

    return NextResponse.json(order)

  } catch (error) {
    console.log('[CREATE_ORDER]', error)
    return new NextResponse('Algo deu errado, tente novamente.', { status: 400 })
  }
}