import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"


export async function PATCH(req: Request, { params }: { params: { profileId: string } } ) {
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

    const profileExists = await db.profile.findUnique({
     where: {
      id: params.profileId,
      userId: userExists.id
     }
    })

    if(!profileExists) return new NextResponse('Perfil inválido', { status: 404 })


    const updatedProfile = await db.profile.update({
      where: {
        id: params.profileId,
        userId: userExists.id
      },
      data: {
        ...values
      }
    })

    return NextResponse.json(updatedProfile)

  } catch (error) {
    console.log('[UPDATE_PROFILE]', error)
    return new NextResponse('Algo deu errado, tente novamente.', { status: 400 })
  }
}