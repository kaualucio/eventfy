import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { CalendarDays, LayoutDashboard, List, MapPin, Tags, Ticket } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { IconBadge } from "@/components/shared/icon-badge";
import { Title } from "@/components/shared/title";
import { TitleForm } from "../_components/title-form";
import { SubtitleForm } from "../_components/subtitle-form";
import { DescriptionForm } from "../_components/description-form";
import { ImageForm } from "../_components/image-form";
import { CategoryForm } from "../_components/category-form";
import { TypeEventForm } from "../_components/type-event-form";
import { LocationForm } from "../_components/location-form";
import { DatetimeStartForm } from "../_components/datetime-start-form";
import { DatetimeEndForm } from "../_components/datetime-end-form";
import { ScheduleForm } from "../_components/schedule-form";
import { TicketForm } from "../_components/ticket-form";
import { Actions } from "./_components/actions";

import { db } from "@/lib/db";
import { getOrganizerProfile } from "@/actions/get-organizer-profile";
import toast from "react-hot-toast";


export default async function EditEvent({ params }: { params: { eventSlug: string } }) {

  const session = await getServerSession(nextAuthOptions)

  if(!session) return redirect('/')

  const userHasOrganizerProfile = await getOrganizerProfile(session.user.id)

  if(!userHasOrganizerProfile) {
    redirect(`/dashboard/perfil/organizador/criar/${session.user.id}&eventSlug=${params.eventSlug}`)
  }

  const event = await db.event.findUnique({
    where: {
      userId: session?.user.id,
      slug: params.eventSlug
    },
    include: {
      Schedule: {
        orderBy: {
          day: 'asc'
        }
      },
      Ticket: {
        orderBy: {
          created_at: "asc"
        }
      },
    }
  })


  const categories = await db.category.findMany({
    orderBy: { created_at: 'asc'},
  })

  const types = await db.type.findMany({
    orderBy: { created_at: 'asc'},
  })

  if(!event) return redirect('/')

  const requiredFields = [
    event.title,
    event.description,
    event.image,
    event.categoryId,
    event.typeId,
    event.location,
    event.datetime_start,
    event.datetime_end,
    event.Ticket
  ]

  let totalFields = requiredFields.length
  let completedFields = requiredFields.filter(Boolean).length
  let completetionText = `(${completedFields}/${totalFields})`

  const isCompleted = requiredFields.every(Boolean)
  return (
    <section className="p-4 sm:p-6 md:p-10 lg:px-20 lg:py-[50px] grid gap-10">
      <div className="flex items-center justify-between gap-5">
        <div className="flex flex-col gap-y-2">
          <Title title="Edição do evento" />
          <p className="text-secondary300 text-sm">Preencha todos os campos obrigatórios {completetionText}</p>
        </div>
        <Actions 
          eventId={event.id}
          isDisabled={!isCompleted}
          isPublished={event.is_published}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard}  />
            <h2 className="text-xl font-medium">Informações básicas</h2>
          </div>
          <TitleForm initialData={event} />
          <SubtitleForm initialData={event} />
          <DescriptionForm initialData={event} />
          <ImageForm initialData={event} />
          <div className="flex items-center gap-x-2 mt-6">
            <IconBadge icon={Tags}  />
            <h2 className="text-xl font-medium">Tipo e Categoria</h2>
          </div>
          <TypeEventForm 
            initialData={event}
            options={types.map(type => ({ 
              value: type.id, 
              label: type.name 
            }))}
          />
           <CategoryForm 
            initialData={event}
            options={categories.map(category => ({ 
              value: category.id, 
              label: category.name 
            }))}
          />
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={MapPin}  />
            <h2 className="text-xl font-medium">Localização</h2>
          </div>
          <LocationForm initialData={event} />
          <div className="flex items-center gap-x-2">
            <IconBadge icon={CalendarDays}  />
            <h2 className="text-xl font-medium">Data e Hora</h2>
          </div>
          <DatetimeStartForm 
            initialData={event}
          />
          <DatetimeEndForm 
            initialData={event}
          />
          <div className="flex items-center gap-x-2">
            <IconBadge icon={List}  />
            <h2 className="text-xl font-medium">Cronograma do evento</h2>
          </div>
          <ScheduleForm initialData={event} />
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Ticket}  />
            <h2 className="text-xl font-medium">Ingresso</h2>
          </div>
          <TicketForm 
            initialData={event}
          />
        </div>
      </div>
    </section>
  )
}