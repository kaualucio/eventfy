import NextAuth, { NextAuthOptions } from 'next-auth'
import { compare } from 'bcryptjs'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from 'next-auth/providers/google'

import { db } from '@/lib/db'

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label:"E-mail",
          type: "email",
        },
        password: {
          label: "Senha",
          type: "password",
        }
      },
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials!
          if(!email || !password || password.length <= 0) throw new Error('E-mail e/ou senha inválidos')

          const userExists = await db.user.findUnique({
            where: {
              email
            }
          })

          if(!userExists) throw new Error('E-mail e/ou senha inválidos')
          const matchedPassword = await compare(password, userExists?.password!)

          if(!matchedPassword) throw new Error('E-mail e/ou senha inválidos')

          return {
            id: userExists.id,
            name: userExists.name,
            email: userExists.email,
            last_name: userExists.last_name,
            image: userExists.image,
            hasACreatorProfile: userExists.hasACreatorProfile || false
          }
        } catch (error: any) {
          console.log('SIGN_IN_ERROR', error)
          return null
        }
      },
    })
  ], 
  callbacks: {
    async jwt({ token, user }) {
      if(user) {
        return {
          ...token,
          id: user.id,
          hasACreatorProfile: user.hasACreatorProfile,
          last_name: user.last_name ,
        }
      }

      return token

    },
    async session({ token, user, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          hasACreatorProfile: token.hasACreatorProfile,
          last_name: token.last_name,
        }
      }
    }
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST}