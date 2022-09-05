import NextAuth from 'next-auth';
import { KeyLike, JWK } from 'jose';

declare module 'next-auth' {
    interface Session {
        webid: string,
        storage: string,
        seeAlso: string,
        accessToken: string,
        jwkPrivateKey: JWK,
        jwkPublicKey: JWK,
        dpop: JWT,
    }
}