import { getEventBySlug } from "@/actions/get-event-by-slug";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ScheduleTabs } from "./_components/schedule";
import { ClipboardList, Clock, FileText, List, MapPin } from "lucide-react";
import { OrganizerInfo } from "./_components/organizer-info";
import { Tickets } from "./_components/tickets";


export default async function EventPage({ params }: { params: { eventSlug: string } }) {

  const event = await getEventBySlug(params.eventSlug);

  if(!event) redirect('/')

  return (
    <section className="flex items-center justify-center flex-col gap-10">
      <div className="relative w-full h-[500px] lg:h-[600px]">
        <Image 
          src={event.image!}
          alt={`Imagem de capa do evento ${event.title} na Eventfy`}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="pb-20 px-5 max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-10 md:gap-20">
        <div className="col-span-1 md:col-span-4 lg:col-span-5 flex flex-col gap-10">
          <div>
            <h1 className="text-4xl font-semibold text-secondary500">{event.title}</h1>
            {
              event.subtitle && (
                <h2 className="text-md text-secondary500">{event.subtitle}</h2>
              )
            }
          </div>
          <div className="grid gap-1">
            <h3 className="text-xl font-semibold text-secondary500 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Data e Hora
            </h3>
            <p className="text-secondary300">
              O evento iniciará no dia <span className="font-medium text-primary500">{format(new Date(event.datetime_start!), 'PPpp', { locale: ptBR })}</span> e encerrará no dia <span className="font-medium text-primary500">{format(new Date(event.datetime_end!), 'PPpp', { locale: ptBR })}</span>
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold text-secondary500 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Sobre o evento
            </h3>
            <div 
              className="text-secondary400 text-justify"
              dangerouslySetInnerHTML={{
              __html: event.description!
            }}></div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-secondary500 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Local e Endereço
            </h3>
            {
              JSON.parse(event.location!).online && (
                <div className="text-secondary300 mt-1">
                  O evento ocorrerá de forma online, o link para acesso será enviado ao seu email após a compra do ingresso.
                </div>
              )
            }
            {
              JSON.parse(event.location!).in_person && (
                <div className="grid grid-cols-2 gap-5 mt-3">
                  <div className="w-full flex flex-col gap-1">
                    <h3 className="text-md font-semibold text-secondary500">Local</h3>
                    <p className="text-secondary400 italic">{JSON.parse(event.location!).in_person.local_name}</p>
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <h3 className="text-md font-semibold text-secondary500">Rua</h3>
                    <p className="text-secondary400 italic">{JSON.parse(event.location!).in_person.address}</p>
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <h3 className="text-md font-semibold text-secondary500">Estado</h3>
                    <p className="text-secondary400 italic">{JSON.parse(event.location!).in_person.state}</p>
                  </div>
                  <div className="w-full flex flex-col gap-1">
                    <h3 className="text-md font-semibold text-secondary500">Cidade</h3>
                    <p className="text-secondary400 italic">{JSON.parse(event.location!).in_person.city}</p>
                  </div>
                </div>
              )
            }
          </div>
          {
            event.images && event.images?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-secondary500">Imagens do evento</h3>

              </div>
            )         
          }
          
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-secondary500 flex items-center gap-2 mb-3">
              <ClipboardList className="w-5 h-5" />
              Cronograma
            </h3>
            {
              event.Schedule && (
                <ScheduleTabs 
                  schedule={event.Schedule}
                />
              )
            }
          </div>

          <OrganizerInfo 
            profile={event.user?.Profile[0]!}
            image={event.user?.image!}
            last_name={event.user?.last_name!}
            name={event.user?.name!}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3 ">
          <Tickets 
            tickets={event.Ticket}
          />
        </div>
      </div>
    </section>
  )
}