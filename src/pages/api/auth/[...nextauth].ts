import NextAuth, { NextAuthOptions } from "next-auth"
import SolidProvider from "../../../lib/SolidProvider"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    SolidProvider(),
  ],
  callbacks: {
    async jwt({ token }) {
      console.log("JWT:", token);
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.email = "user@example.com"

      return session;
    },
  },
}

export default NextAuth(authOptions)
