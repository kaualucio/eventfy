import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(req: Request, { params }: { params: { eventId: string, favoriteId: string } }) {
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


    const favoriteExists = await db.favoriteEvent.findUnique({
     where: {
      id: params.favoriteId
     }
    })

    if(!favoriteExists) return new NextResponse('Evento não encontrado', { status: 404 })

    
    const unfavorite = await db.favoriteEvent.delete({
      where: {
        id: params.favoriteId
      }
    })

    return NextResponse.json(unfavorite)

  } catch (error) {
    console.log('[UNFAVORITE_EVENT]', error)
    return new NextResponse('Algo deu errado, tente novamente.', { status: 400 })
  }
}