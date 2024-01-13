import { Metadata } from "next"
import { Sidebar } from "./_components/sidebar"
import { Navbar } from "./_components/navbar"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { EdgeStoreProvider } from "@/lib/edgestore"

export const metadata: Metadata = {
  title: `Dashboard - ${process.env.NEXT_TITLE_SITE}`,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(nextAuthOptions)

  if(!session) return redirect('/')

  return (
    <EdgeStoreProvider>
      <div className="h-full">
        <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
          <Navbar />
        </div>
        <div className="hidden md:flex  h-full w-56 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        <main className="md:pl-56 pt-[80px] h-full">
          {children}
        </main>
      </div>
    </EdgeStoreProvider>
  )
}
