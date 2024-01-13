import { getOrganizerProfile } from "@/actions/get-organizer-profile"
import { db } from "@/lib/db"
import { Profile } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"

interface OrganizerProfileProps {
  profileId: string | null,
  profileExists: boolean,
  profileIsCompleted: boolean,
}

export const useOrganizerProfile = (userId: string) => {
  const [profile, setProfile] = useState<OrganizerProfileProps | null>(null)
  useEffect(() => {
    const getProfile = async () => {
      const organizerProfile = await getOrganizerProfile(userId) 

      if(organizerProfile && organizerProfile.bio && organizerProfile.company && organizerProfile.email) {
        setProfile({ profileExists: true, profileId: organizerProfile.id, profileIsCompleted: true })
      }

    }
    getProfile()
  }, [userId])

  return {
    ...profile
  }
}