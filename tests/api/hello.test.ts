import type { NextApiRequest, NextApiResponse } from 'next';
import { setupServer } from 'msw/node';
import { matchRequestUrl, MockedRequest, rest } from 'msw';
import handler from '../../src/pages/api/hello';
import * as nextAuth from 'next-auth/next';
import { JWK } from 'jose';

jest.mock('next-auth/next', () => ({
  unstable_getServerSession: jest.fn(async () =>
    Promise.resolve({
      webid: 'https://idp.example.com/testuser/profile/card#me',
      storage: 'https://pod.example.com/testuser/',
    }),
  ),
}));

jest.mock('next-auth/jwt', () => ({
  getToken: jest.fn(async () => ({
    keys: {
      privateKey: {
        kty: 'EC',
        x: 'Wnohu2u10nvVK9DLVzjA59o-KQlqTuDpHAD8pivt-WY',
        y: 'Ey1yhc8dYegX5dNXBBfp56qAr4u9tQdrU18uFfS5rYU',
        crv: 'P-256',
        d: '8leggABqT77jMfI2fPQ5abGYxLg4yuMMqAw2Yb8ftrc',
      },
      publicKey: {
        kty: 'EC',
        x: 'Wnohu2u10nvVK9DLVzjA59o-KQlqTuDpHAD8pivt-WY',
        y: 'Ey1yhc8dYegX5dNXBBfp56qAr4u9tQdrU18uFfS5rYU',
        crv: 'P-256',
      },
    },
    dpopToken:
      'eyJhbGciOiJFUzI1NiIsInR5cCI6ImF0K2p3dCIsImtpZCI6ImhEOXpYYTdQNkJTaUtPaGNVWFRRM0Eya2sycjVSVEh4ajhvX0dGYnl3ZFUifQ.eyJ3ZWJpZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMi9kNWI4NWI1YS1iYmMyLTQ3MGYtOWRhNi05Nzc5Yzc0YjQ4NDcvcHJvZmlsZS9jYXJkI21lIiwianRpIjoid1dtdDRINmRYZmpYUVEwazk0aUcwIiwic3ViIjoiaHR0cDovL2xvY2FsaG9zdDozMDAyL2Q1Yjg1YjVhLWJiYzItNDcwZi05ZGE2LTk3NzljNzRiNDg0Ny9wcm9maWxlL2NhcmQjbWUiLCJpYXQiOjE2Njg1MDYyMDYsImV4cCI6MTY2ODUwOTgwNiwic2NvcGUiOiJ3ZWJpZCIsImNsaWVudF9pZCI6ImU3bERUT25FUnlzb243X3NVVVA5ciIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMi8iLCJhdWQiOiJzb2xpZCIsImNuZiI6eyJqa3QiOiJQb2drWXlMbkZINWdCbkE2OXA2VEVDNmhDdnF3cURRMHNmZTNJLWxDOEhBIn19.AuMVX0lFR4jIbuFZuinJ_ZmhrkoTQym0sTbDNCMDRT3pPoVQej6-U5gzTNYraOIs5aCe2ARbqjdmKb7WCQDiqg',
  })),
}));

const server = setupServer(
  rest.get('http://idp.example.com/testuser/profile/private', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set('Content-Type', 'text/turtle'),
      ctx.body(`@prefix foaf: <http://xmlns.com/foaf/0.1/>.
<#me>
  foaf:firstName "Frodo";
  foaf:lastName "Baggins";
  <https://pod-test.egendata.se/schema/core/v1#dataSubjectIdentifier> "199010102383";
  <https://pod-test.egendata.se/schema/core/v1#uuid> "d5b85b5a-bbc2-470f-9da6-9779c74b4847" .
    `),
    );
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('/api/hello API endpoint', () => {
  const mockRequestResponse = () => {
    const req: NextApiRequest = jest.fn() as unknown as jest.Mocked<NextApiRequest>;

    req.method = 'GET';
    req.query = { page: '' };
    req.body = '';

    const res = { status: jest.fn(), json: jest.fn(), end: jest.fn() } as unknown as jest.Mocked<NextApiResponse>;
    res.status.mockImplementation((sc: number) => {
      res.statusCode = sc;
      return res;
    });
    res.json.mockImplementation((json) => {
      return res;
    });

    return { req, res };
  };

  it('should return 401 when missing session', async () => {
    const unstable_getServerSessionSpy = jest.spyOn(nextAuth, 'unstable_getServerSession');
    unstable_getServerSessionSpy.mockResolvedValueOnce(null);

    const { req, res } = mockRequestResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(401);
  });

  it('should return user info from session', async () => {
    const unstable_getServerSessionSpy = jest.spyOn(nextAuth, 'unstable_getServerSession');
    unstable_getServerSessionSpy.mockResolvedValueOnce({
      webid: 'http://idp.example.com/testuser/profile/card#me',
      storage: 'http://pod.example.com/testuser/',
      seeAlso: 'http://idp.example.com/testuser/profile/private',
      dpopToken: 'dpoptoken',
      keys: { publicKey: null as unknown as JWK, privateKey: null as unknown as JWK },
      expires: '12123123123',
    });

    const { req, res } = mockRequestResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.json.mock.calls[0][0]).toEqual({ name: 'Frodo Baggins' });
  });
});
