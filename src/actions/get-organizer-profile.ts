'use server'
import { db } from "@/lib/db"

export const getOrganizerProfile = async (userId: string) => {
  try {
    console.log(userId)
    const user = await db.user.findUnique({
      where: {
        id: userId
      }
    })

    if(!user) return null

    const userProfile = await db.profile.findFirst({
      where: {
        userId
      }
    })

    return userProfile
    
  } catch (error) {
    return null
  }
}