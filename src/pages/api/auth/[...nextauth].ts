import NextAuth, { NextAuthOptions } from "next-auth"
import SolidProvider from "../../../lib/SolidProvider"
import { fetchPrivateData, fetchProfileData } from "../../../util/oak/solid";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    SolidProvider(),
  ],
  callbacks: {
    async jwt({ token, account }) {
      token.webid = token.sub
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      console.log("JWT:", token);
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.

      if (token.sub) {
        session.webid = token.sub
        session.accessToken = token.accessToken
        
        const { storage, seeAlso } = await fetchProfileData(session.webid);        
        session.storage = storage

        //const { ssn, fullname, uuid } = await fetchPrivateData(seeAlso);
        //session.ssn = ssn
        //session.fullname = fullname
        //session.uuid = uuid

      } else {
        console.warn("Missing webid in token.")
      }

      console.log(session)
      return session;
    },
  },
}

export default NextAuth(authOptions)
