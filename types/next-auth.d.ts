import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        webid: string,
        storage: string,
        accessToken: string,
        dpop: JWT,
    }
}