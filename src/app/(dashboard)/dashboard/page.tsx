import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import { Title } from "@/components/shared/title"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { HowToItem } from "./_components/how-to-item"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await getServerSession(nextAuthOptions)

  if(!session) return redirect('/')

  return (
    <section className="p-4 sm:p-6 md:p-10 lg:px-20 lg:py-[50px] grid gap-10">
      <div className="grid gap-2">
        <h1 className="text-4xl text-secondary500 font-semibold">Olá, {session?.user.name}</h1>
        <p className="text-xl text-secondary500 font-normal">Seja bem-vindo, ao seu painel da Eventfy</p>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-10">
        <div className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-8 p-5 bg-primary50 rounded-md"></div>
        <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-4">
          <Title title="Não sabe do que precisa para criar um evento?" />
          <p className="text-secondary300 text-sm my-3">Siga os passos abaixo para criar seu primeiro e inesquecível evento.</p>
          <div className="flex flex-col gap-3">
            <HowToItem>
              <div className="flex items-center gap-1 font-medium">
                Crie seu 
                <Link href="/" className="text-primary500 font-medium underline hover:text-primary700">
                  perfil de organizador
                </Link>
              </div>
            </HowToItem>
            <HowToItem>
              <div className="flex items-center gap-1 font-medium">
                Crie um evento 
              </div>
            </HowToItem>
            <HowToItem>
              <div className="flex items-center gap-1 font-medium">
                Configure seus ingressos 
              </div>
            </HowToItem>
            <HowToItem>
              <div className="flex items-center gap-1 font-medium">
                Cadastre uma conta para recebimento
              </div>
            </HowToItem>
          </div>
        </div>
      </div>
    </section>
  )
}