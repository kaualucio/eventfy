import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"


export async function DELETE(req: Request, { params }: { params: { eventId: string, scheduleId: string } }) {
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

    const deletedScheduleDay = await db.schedule.delete({
      where: {
        id: params.scheduleId,
        eventId: params.eventId,
      },
    })

    const eventSchedule = await db.schedule.findMany({
      where: {
        eventId: params.eventId
      },
      orderBy: {
        day: 'asc'
      }
    })

    eventSchedule.map(async (scheduleDay) => {
      if(scheduleDay.day > deletedScheduleDay.day) {
        await db.schedule.update({
          where: {
            id: scheduleDay.id
          },
          data: {
            day: scheduleDay.day - 1
          }
        })
      }
    })

    return NextResponse.json(deletedScheduleDay)
    
  } catch (error) {
    console.log('[UPDATE_SCHEDULE_DESCRIPTION_DAY]', error)
    return new NextResponse('Algo deu errado ao deletar um cronograma, tente novamente', { status: 400 })
  }
}