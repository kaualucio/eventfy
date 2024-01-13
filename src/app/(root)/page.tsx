import Image from 'next/image'
import Link from 'next/link'
import { HomeSearch } from './_components/home-search'
import { CategoryButton } from './_components/category-button'
import { Mic2 } from 'lucide-react'
import { Title } from '@/components/shared/title'
import { SearchFilter } from './_components/search-filter'
import { EventCard } from '@/components/shared/event-card'
import { ListItem } from './_components/list-item'
import { CTABanner } from '@/components/shared/cta-banner'
import { getPublishedEvents } from '@/actions/get-published-events'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'

export default async function Home() {
  const session  = await getServerSession(nextAuthOptions)
  const events = await getPublishedEvents(session)

  return (
    <>
      <section className={`w-full px-7 flex items-center`}>
        <div className="w-full py-20 container grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 items-center gap-20 md:gap-8">
          <div className="col-span-1 md:col-span-3 lg:col-span-7 text-center md:text-start align-self-center flex flex-col items-center md:items-start gap-y-8">
            <h1 className="sm:text-6xl text-5xl leading-normal font-bold text-secondary500">Quer que seu evento seja um <span className="text-primary500">sucesso</span>?</h1>
            <p className="sm:text-md text-md text-secondary500">Aqui você pode conseguir isso. Cadastre-se em nossa plataforma e com apenas alguns cliques, você pode criar um evento personalizado e compartilha-lo para uma audiência global.</p>
            <HomeSearch />
          </div>
          <div className="col-span-1 md:col-span-3 lg:col-span-5 relative w-full h-[600px]">
            <Image 
              src="/assets/images/hero.png"
              alt=""
              fill
              // className="object-cover"
            />
          </div>
        </div>
      </section>
      <section className="w-full bg-primary50 px-7">
        <div className="w-full container py-20 gap-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <CategoryButton icon={Mic2} label="Música & Shows" />
          <CategoryButton icon={Mic2} label="Música & Shows" />
          <CategoryButton icon={Mic2} label="Música & Shows" />
          <CategoryButton icon={Mic2} label="Música & Shows" />
          <CategoryButton icon={Mic2} label="Música & Shows" />
          <CategoryButton icon={Mic2} label="Música & Shows" />
          <CategoryButton icon={Mic2} label="Música & Shows" />
          <CategoryButton icon={Mic2} label="Música & Shows" />
        </div>
      </section>
      <section className="w-full px-7">
        <div className="w-full container pt-20 pb-10 flex flex-col gap-6">
          <Title title="Filtrar eventos por:" />
          <SearchFilter />
        </div>
      </section>
      <section className="w-full px-7">
        <div className="w-full container py-10 flex flex-col gap-6">
          <Title title="Eventos populares" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
              events.map(event => (
                <EventCard 
                  key={event.id}
                  event={event}
                />
              ))
            }

          </div>
        </div>
      </section>
      <section className="w-full px-7">
        <div className="w-full container py-10 flex flex-col gap-6">
          <Title title="Mais Eventos" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* <EventCard />
            <EventCard />
            <EventCard />
            <EventCard /> */}
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center py-20">
        <Link 
          href="/procurar-eventos"
          className="w-fit px-7 py-5 rounded-md font-medium border border-primary700 bg-primary50 text-primary700 hover:bg-primary100 transition"
        >
          Mais Eventos
        </Link>
      </div>
      <section className="w-full bg-primary50 px-7">
        <div className="w-full container py-10 grid grid-cols-1 sm:grid-cols-6 md:grid-cols-12 gap-6">
          <div className="col-span-1 sm:col-span-3 md:col-span-6 relative h-[643px]">
            <Image 
              src="/assets/images/about.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <div className="col-span-1 sm:col-span-3 md:col-span-6 flex flex-col gap-5">
            <Title 
              title="Lorem ipsum dolor sit amet consectetur venenatis sed"
            />
            <p className="text-md leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Venenatis sed cursus ac hac dignissim cursus. Tellus et eu mollis sit. Metus auctor nibh ipsum elementum ut massa pellentesque. Id rhoncus id condimentum in interdum vel justo at purus. Tortor adipiscing id ac nunc semper ultrices ut est. Volutpat tempor mi nisl velit at massa dui. Tempus nisl posuere quis sed faucibus.
            </p>
            <div className="grid gap-5">
              <ListItem 
                numberItem={1}
                value="Lorem ipsum dolor sit amet consectetur. Venenatis sed cursus ac hac dignissim cursus."
              />
              <ListItem 
                numberItem={2}
                value="Lorem ipsum dolor sit amet consectetur. Venenatis sed cursus ac hac dignissim cursus."
              />
              <ListItem 
                numberItem={3}
                value="Lorem ipsum dolor sit amet consectetur. Venenatis sed cursus ac hac dignissim cursus."
              />
              <ListItem 
                numberItem={4}
                value="Lorem ipsum dolor sit amet consectetur. Venenatis sed cursus ac hac dignissim cursus."
              />
              <ListItem 
                numberItem={5}
                value="Lorem ipsum dolor sit amet consectetur. Venenatis sed cursus ac hac dignissim cursus."
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full px-7">
        <div className="w-full container py-20">
          <CTABanner />
        </div>
      </section>
    </>
  )
}
