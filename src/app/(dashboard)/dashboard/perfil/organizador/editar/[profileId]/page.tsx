import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { ArrowLeft, CalendarDays, LayoutDashboard, List, MapPin, Tags, Ticket } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { IconBadge } from "@/components/shared/icon-badge";
import { Title } from "@/components/shared/title";


import { db } from "@/lib/db";
import { BioForm } from "../_components/bio-form";
import { EmailForm } from "../_components/email-form";
import { PhoneNumberForm } from "../_components/phone-number-form";
import { CompanyForm } from "../_components/company-form";
import Link from "next/link";


export default async function EditProfile({ params }: { params: { profileId: string } }) {

  const session = await getServerSession(nextAuthOptions)

  if(!session) return redirect('/')

  const profile = await db.profile.findFirst({
    where: {
      id: params.profileId
    }
  })

  const requiredFields = [
    profile?.email,
    profile?.bio,
    profile?.company
  ] 

  let totalFields = requiredFields.length
  let completedFields = requiredFields.filter(Boolean).length
  let completetionText = `(${completedFields}/${totalFields})`

  return (
    <section className="p-4 sm:p-6 md:p-10 lg:px-20 lg:py-[50px] grid gap-10">
      <div className="flex items-center justify-between gap-5">
        <div className="flex flex-col gap-y-2">
          <Title title="Perfil de organizador" />
          <p className="text-secondary300 text-sm">Preencha todos os campos obrigatórios {completetionText}</p>
        </div>
        <Link 
          href="/dashboard/eventos"
          className="w-fit h-10 px-5 flex items-center gap-1 rounded-md text-sm font-medium bg-primary500 transition hover:bg-primary600 text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
       <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard}  />
            <h2 className="text-xl font-medium">Informações básicas</h2>
          </div>
          <BioForm initialData={profile} />
          <EmailForm initialData={profile} />
          <PhoneNumberForm initialData={profile} />
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard}  />
            <h2 className="text-xl font-medium">Empresa</h2>
          </div>
          <CompanyForm initialData={profile} />
          {/* <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard}  />
            <h2 className="text-xl font-medium">Redes sociais</h2>
          </div>
          <CompanyForm initialData={profile} /> */}
        </div>
        
      </div>
    </section>
  )
}