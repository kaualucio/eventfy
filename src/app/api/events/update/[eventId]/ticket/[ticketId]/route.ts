import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"


export async function PATCH(req: Request, { params }: { params: { ticketId: string, eventId: string } }) {
  try {

    const session = await getServerSession(nextAuthOptions)
    const { 
      name,
      remark,
      price,
      quantity,
      min_quantity,
      max_quantity,
      start_sell,
      end_sell,
      is_half_price,
    } = await req.json()

    if(!name || !quantity || !min_quantity || !max_quantity || !start_sell || !end_sell) {
      return new NextResponse('Preencha os campos obrigatórios para continuar.', { status: 400 })
    }
    
    if(!session) return new NextResponse('Algo deu errado, tente novamente.', { status: 400 })
    
    const userExists = await db.user.findUnique({
      where: {
        id: session.user.id
      }
    })

    if(!userExists) return new NextResponse('Usuário inválido.', { status: 404 })

    const eventExists = await db.event.findUnique({
      where: {
        id: params.eventId,
        userId: userExists.id
      }
    })

    if(!eventExists) return new NextResponse('Evento não encontrado', { status: 404 })

    const updatedTicket = await db.ticket.update({
      where: {
        id: params.ticketId,
        eventId: params.eventId,
      },
      data: {
        name,
        remark,
        price,
        quantity,
        min_quantity,
        max_quantity,
        start_sell,
        end_sell,
        is_half_price,
        userId: userExists.id
      }
    })

    return NextResponse.json(updatedTicket)
    
  } catch (error) {
    console.log('[ADD_SCHEDULE_DAY]', error)
    return new NextResponse('Algo deu errado ao um cronograma, tente novamente', { status: 400 })
  }
}