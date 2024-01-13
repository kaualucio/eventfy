import { db } from "@/lib/db"
import { hash } from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    
    const {name, lastName, email, password, confirmPassword} = await req.json()

    if(!name || !lastName || !email || !password || !confirmPassword) {
      return new NextResponse('Por favor, preencha todos os campos para continuar.', { status: 400 })
    }

    if(password !== confirmPassword) {
      return new NextResponse('Senhas incorretas. Certifique-se de que as senhas sejam iguais.', { status: 400 })
    }

    const userAlreadyExists = await db.user.findUnique({
      where: { email }
    })

    if(userAlreadyExists) {
      return new NextResponse('Já existe um usuário cadastrado com esse e-mail.', { status: 400 })
    }

    const hashedPassword = await hash(password, 10)

    const newUser = await db.user.create({
      data: {
        name,
        last_name: lastName,
        email,
        password: hashedPassword,
      }
    })
    
    return NextResponse.json(newUser)

  } catch (error) {
    console.log('REGISTER_ERROR', error)
    return new NextResponse('Algo deu errado, tente novamente!', { status: 400 })
  }
}