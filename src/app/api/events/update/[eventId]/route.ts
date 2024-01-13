import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { nextAuthOptions } from "../../../auth/[...nextauth]/route"
import { db } from "@/lib/db"
import { slugify } from "@/utils/slugfy"


export async function PATCH(req: Request, { params }: { params: { eventId: string } } ) {
  try {
    const session = await getServerSession(nextAuthOptions)
    let values = await req.json()

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

    if(values.online || values.in_person) {
      values = {
        location: JSON.stringify(values)
      }
    }

    const updatedEvent = await db.event.update({
      where: {
        id: params.eventId,
        userId: userExists.id
      },
      data: {
        ...values
      }
    })

    return NextResponse.json(updatedEvent)

  } catch (error) {
    console.log('[UPDATE_EVENT]', error)
    return new NextResponse('Algo deu errado, tente novamente.', { status: 400 })
  }
}