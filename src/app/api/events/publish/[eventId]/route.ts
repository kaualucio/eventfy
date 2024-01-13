import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { nextAuthOptions } from "../../../auth/[...nextauth]/route"
import { db } from "@/lib/db"


export async function PATCH(req: Request, { params }: { params: { eventId: string } } ) {
  try {
    const session = await getServerSession(nextAuthOptions)

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

    const publishedEvent = await db.event.update({
      where: {
        id: params.eventId,
        userId: userExists.id
      },
      data: {
        is_published: true,
        status: 'IN_PROGRESS',
      }
    })

    return NextResponse.json(publishedEvent)

  } catch (error) {
    console.log('[UPDATE_EVENT]', error)
    return new NextResponse('Algo deu errado, tente novamente.', { status: 400 })
  }
}