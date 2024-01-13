import { Profile } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

interface OrganizerInfoProps {
  image: string;
  name: string;
  last_name: string;
  profile: Profile;
}

export const OrganizerInfo = ({ image, name, last_name, profile }: OrganizerInfoProps) => {
  return (
    <div className="w-full rounded-md py-7 px-5 bg-primary50 flex flex-col gap-3 items-center justify-center">
      <div className="flex flex-col justify-center gap-3 items-center">
        <div className="border-2 bg-white border-primary500 w-28 h-28 rounded-full p-5 relative flex items-center justify-center overflow-hidden">
          <Image
            src={image || '/assets/images/placeholder.png'}
            alt="Foto do organizador" 
            width={40}
            height={40}
          />
        </div>
       <div className="text-center">
        <p className="text-md text-secondary500 font-medium">{name} {last_name}</p>
        <p className="text-sm text-secondary400">{profile.company}</p>
       </div>
      </div>
      <p className="text-sm text-center text-secondary500">{profile.bio}</p>
    </div>
  )
}
