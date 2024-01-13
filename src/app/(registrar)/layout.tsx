import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Crie sua conta - ${process.env.NEXT_TITLE_SITE}`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    {children}
    </>
  )
}
