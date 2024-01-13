import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";


export default async function CreateProfile({ params }: { params: { organizerId: string, eventSlug?: string } }) {

  const session = await getServerSession(nextAuthOptions)

  if(!session) return redirect('/')

  const profile = await db.profile.create({
    data: {
      userId: params.organizerId
    }
  })

  if(profile) {
    redirect(`/dashboard/perfil/organizador/editar/${profile.id}`)
  }else {
    redirect('/dashboard/eventos')
  }

  return (<></>)
}