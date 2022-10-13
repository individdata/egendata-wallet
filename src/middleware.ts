import { url } from 'inspector';
import { withAuth } from 'next-auth/middleware';

export default withAuth((req) => {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (token) {
        return true;
      }

      if (req.nextUrl.pathname.startsWith('/request')) {
        const url = new URL(req.url);
        return url.searchParams.has('payload');
      }

      return false;
    },
  },
});

export const config = { matcher: ['/home', '/request', '/consent', '/mydata'] };
