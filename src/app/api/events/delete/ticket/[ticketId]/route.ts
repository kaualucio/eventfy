import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { nextAuthOptions } from "../../../../auth/[...nextauth]/route"
import { db } from "@/lib/db"

export async function DELETE(req: Request, { params }: { params: { ticketId: string } } ) {
  try {
    const session = await getServerSession(nextAuthOptions)

    if(!session) return new NextResponse('Algo deu errado, tente novamente.', { status: 400 })

    const userExists = await db.user.findUnique({
      where: {
        id: session.user.id
      }
    })

    if(!userExists) return new NextResponse('Usuário inválido.', { status: 404 })

    const ticketExists = await db.ticket.findUnique({
     where: {
      id: params.ticketId,
      userId: userExists.id
     }
    })

    if(!ticketExists) return new NextResponse('Ingresso não encontrado', { status: 404 })

    const getAllTicketFromEvent = await db.ticket.findMany({
      where: {
        eventId: ticketExists.eventId
      }
    })
    let deletedTicket;
    
    if(getAllTicketFromEvent.length > 1) {
       deletedTicket = await db.ticket.delete({
        where: {
          id: params.ticketId,
        },
      })     
    } else {
       deletedTicket = await db.ticket.delete({
        where: {
          id: params.ticketId,
        },
      })
      await db.event.update({
        where: {
          id: getAllTicketFromEvent[0].id
        },
        data: {
          is_published: false,
        }
      })     
    }


    return NextResponse.json(deletedTicket)

  } catch (error) {
    console.log('[DELETE_TICKET]', error)
    return new NextResponse('Algo deu errado, tente novamente.', { status: 400 })
  }
}