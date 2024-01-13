import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
  try {
    const session = await getServerSession(nextAuthOptions)
    const { userId } = await req.json()
    
    if(!session) return new NextResponse('Algo deu errado, tente novamente.')

    const userExists = await db.user.findUnique({
      where: {
        id: session.user.id
      }
    })
    
    if(!userExists) return new NextResponse('Usuário inválido.', { status: 404 })

    const userAlreadyHasAProfile = await db.profile.findFirst({
      where: {
        userId,
      }
    })

    if(userAlreadyHasAProfile) return new NextResponse('Já existe um perfil criado para esse usuário.', { status: 404 })

    const profile = await db.profile.create({
      data: {
        userId,
      }
    })

    return NextResponse.json(profile)


  } catch (error) {
    console.log('[CREATE_PROFILE_ERROR]', error)
    return new NextResponse('Algo deu errado ao criar o perfil de organizador, tente novamente.')
  }
}