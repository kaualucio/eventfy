import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"


export async function POST(req: Request, { params }: { params: { ticketId: string, eventId: string } }) {
  try {

    const session = await getServerSession(nextAuthOptions)
    const values = await req.json()
  
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

    const newTicket = await db.ticket.create({
      data: {
        eventId: params.eventId,
        userId: userExists.id,
        name: values.name
      }
    })

    return NextResponse.json(newTicket)
    
  } catch (error) {
    console.log('[ADD_SCHEDULE_DAY]', error)
    return new NextResponse('Algo deu errado ao um cronograma, tente novamente', { status: 400 })
  }
}