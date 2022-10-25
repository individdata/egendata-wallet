import NextAuth from 'next-auth';
import { JWK } from 'jose';

declare module 'next-auth' {
  interface Session {
    webid: string;
    storage: string;
    seeAlso: string;
    dpopToken: string;
    keys: {
      privateKey: JWK;
      publicKey: JWK;
    };
  }

  interface Token {
    dpopToken: string;
    dpopTokenExpiresAt: number;
    keys: {
      privateKey: JWK;
      publicKey: JWK;
    };
  }

  interface User extends DefaultUser {
    webid: string;
  }
}
