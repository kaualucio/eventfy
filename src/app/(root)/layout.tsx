import { Footer } from "@/components/shared/footer"
import { Header } from "@/components/shared/header"
import { Metadata } from "next"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="">
        {children}
      </main>
      <Footer />
    </>
  )
}
