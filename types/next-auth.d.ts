import NextAuth from 'next-auth';
import { JWK } from 'jose';

declare module 'next-auth' {
    interface Session {
        webid: string,
        storage: string,
        seeAlso: string,
        dpopToken: string,
        keys: {
            privateKey: JWK,
            publicKey: JWK,
        }
    }
}