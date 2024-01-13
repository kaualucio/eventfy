import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  
  interface Profile {
    email_verified: boolean;
    given_name?: string;
    family_name?: string;
  }

  interface User {
    last_name: string | null;
    hasACreatorProfile?: boolean;
  }

  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      last_name: string;
      hasACreatorProfile:? boolean;
    }
  }
}