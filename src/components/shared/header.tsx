import Link from 'next/link'
import React from 'react'
import { WebMenu } from './web-menu'
import { MobileMenu } from './mobile-menu'
import { LoggedUser } from './logged-user'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { Logo } from './logo'

export interface MainNavigationMenuProps {
  user?:  { 
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    id: string;
    last_name: string;
    hasACreatorProfile: boolean | null;
  }

}


export const Header = async () => {
  const session = await getServerSession(nextAuthOptions)

  return (
    <header className="w-full h-20 flex items-center ">
      <div className="w-full h-full container flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <WebMenu user={session?.user} />
        <MobileMenu user={session?.user}  />
      </div>
    </header>
  )
}
