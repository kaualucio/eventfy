import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { nextAuthOptions } from "../../auth/[...nextauth]/route"
import { db } from "@/lib/db"
import { slugify } from "@/utils/slugfy"


export async function POST(req: Request) {
  try {
    const session = await getServerSession(nextAuthOptions)
    const { title } = await req.json()

    if(!session) return new NextResponse('Algo deu errado, tente novamente.', { status: 400 })

    const userExists = await db.user.findUnique({
      where: {
        id: session.user.id
      }
    })

    if(!userExists)  return new NextResponse('Usuário inválido.', { status: 404 })

    const event = await db.event.create({
      data: {
        title,
        slug: slugify(title),
        userId: session.user.id
      }
    })

    return NextResponse.json(event)

  } catch (error) {
    console.log('[CREATE_EVENT]', error)
    return new NextResponse('Algo deu errado, tente novamente.', { status: 400 })
  }
}