import { LoggedUser } from "@/components/shared/logged-user"
import { MobileSidebar } from "./mobile-sidebar"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import Link from "next/link"

export const Navbar = async () => {
  const session = await getServerSession(nextAuthOptions)
  return (
    <div className="p-4 border-b h-full flex items-center justify-between md:justify-end bg-white shadow-sm">
      <MobileSidebar />
      <div className="flex items-center gap-5">
        <Link href="/" className="px-4 py-2 rounded-md hover:bg-accent">Página inicial</Link>
        <LoggedUser name={session?.user.name!} image={session?.user.image!} />
      </div>
    </div>
  )
}