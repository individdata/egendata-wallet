import type { NextApiRequest, NextApiResponse } from 'next';
import { setupServer } from 'msw/node';
import { matchRequestUrl, MockedRequest, rest } from 'msw';
import handler from '../../src/pages/api/request/index';
import * as nextAuth from 'next-auth/next';

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
  rest.get('https://pod.example.com/testuser/egendata/requests/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set('Content-Type', 'text/turtle'),
      ctx.body(`
@prefix dc: <http://purl.org/dc/terms/>.
@prefix ldp: <http://www.w3.org/ns/ldp#>.
@prefix posix: <http://www.w3.org/ns/posix/stat#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

<> a ldp:Container, ldp:BasicContainer, ldp:Resource;
    dc:modified "2022-11-14T15:54:37.000Z"^^xsd:dateTime;
    posix:mtime 1668441277.`),
    );
  }),
  rest.put('https://pod.example.com/testuser/egendata/requests/:id/subject', (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.put('https://pod.example.com/testuser/egendata/requests/:id/subject.acl', (req, res, ctx) => {
    return res(ctx.status(201));
  }),
);

function waitForRequest(method: string, url: string) {
  let requestId = '';

  return new Promise<MockedRequest>((resolve, reject) => {
    server.events.on('request:start', (req) => {
      const matchesMethod = req.method.toLowerCase() === method.toLowerCase();

      const matchesUrl = matchRequestUrl(req.url, url).matches;

      if (matchesMethod && matchesUrl) {
        requestId = req.id;
      }
    });

    server.events.on('request:match', (req) => {
      if (req.id === requestId) {
        resolve(req);
      }
    });

    server.events.on('request:unhandled', (req) => {
      if (req.id === requestId) {
        reject(new Error(`The ${req.method} ${req.url.href} request was unhandled.`));
      }
    });
  });
}

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('/api/request/ API endpoint', () => {
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
      // res._write = JSON.stringify(json);
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

  it('should return empty list on GET when no requests exist in container', async () => {
    const { req, res } = mockRequestResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
  });

  it('should return list of requests on GET when requests exist in container', async () => {
    server.use(
      rest.get('https://pod.example.com/testuser/egendata/requests/', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.set('Content-Type', 'text/turtle'),
          ctx.body(`
@prefix dc: <http://purl.org/dc/terms/>.
@prefix ldp: <http://www.w3.org/ns/ldp#>.
@prefix posix: <http://www.w3.org/ns/posix/stat#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

<> a ldp:Container, ldp:BasicContainer, ldp:Resource;
  dc:modified "2022-11-15T15:17:55.000Z"^^xsd:dateTime.
<9829364d-686e-4d0c-93b0-ed5203f569fe/> a ldp:Container, ldp:BasicContainer, ldp:Resource;
  dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<8634a5d0-d18a-47b4-9fa4-5fc46d09b4bc/> a ldp:Container, ldp:BasicContainer, ldp:Resource;
  dc:modified "2022-11-15T15:17:55.000Z"^^xsd:dateTime.
<> posix:mtime 1668525475;
  ldp:contains <9829364d-686e-4d0c-93b0-ed5203f569fe/>, <8634a5d0-d18a-47b4-9fa4-5fc46d09b4bc/>.
<9829364d-686e-4d0c-93b0-ed5203f569fe/> posix:mtime 1668441466.
<8634a5d0-d18a-47b4-9fa4-5fc46d09b4bc/> posix:mtime 1668525475.`),
        );
      }),
      rest.get(
        'https://pod.example.com/testuser/egendata/requests/9829364d-686e-4d0c-93b0-ed5203f569fe/',
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.set('Content-Type', 'text/turtle'),
            ctx.body(`
@prefix dc: <http://purl.org/dc/terms/>.
@prefix ldp: <http://www.w3.org/ns/ldp#>.
@prefix posix: <http://www.w3.org/ns/posix/stat#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

<> a ldp:Container, ldp:BasicContainer, ldp:Resource;
  dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<subject> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
  dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<> posix:mtime 1668441466;
  ldp:contains <subject>.
<subject> posix:mtime 1668441466;
  posix:size 664.`),
          );
        },
      ),
      rest.get(
        'https://pod.example.com/testuser/egendata/requests/8634a5d0-d18a-47b4-9fa4-5fc46d09b4bc/',
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.set('Content-Type', 'text/turtle'),
            ctx.body(`
@prefix dc: <http://purl.org/dc/terms/>.
@prefix ldp: <http://www.w3.org/ns/ldp#>.
@prefix posix: <http://www.w3.org/ns/posix/stat#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

<> a ldp:Container, ldp:BasicContainer, ldp:Resource;
  dc:modified "2022-11-15T15:17:55.000Z"^^xsd:dateTime.
<subject> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
  dc:modified "2022-11-15T15:17:55.000Z"^^xsd:dateTime.
<> posix:mtime 1668525475;
  ldp:contains <subject>.
<subject> posix:mtime 1668525475;
  posix:size 664.`),
          );
        },
      ),
      rest.get(
        'https://pod.example.com/testuser/egendata/requests/9829364d-686e-4d0c-93b0-ed5203f569fe/subject',
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.body(`
@prefix egendata: <http://pod-test.egendata.se/schema/core/v1#> .
<> a egendata:InboundDataRequest ;
  egendata:id "9829364d-686e-4d0c-93b0-ed5203f569fe" ;
  egendata:requestorWebId "http://localhost:3002/6ba4e50f-66d6-46e0-ae3e-5b124369cd55/profile/card#me" ;
  egendata:providerWebId "http://localhost:3002/2dfad0c6-0a97-40c2-9483-9d8016ffb332/profile/card#me" ;
  egendata:documentType "http://egendata.se/schema/core/v1#UnemploymentCertificate" ;
  egendata:purpose "Testing purposes." ;
  egendata:returnUrl "https://example.com/some/destination" ;
  <http://purl.org/dc/terms/created> "2022-11-14T15:57:46.112Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .`),
          );
        },
      ),
      rest.get(
        'https://pod.example.com/testuser/egendata/requests/8634a5d0-d18a-47b4-9fa4-5fc46d09b4bc/subject',
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.body(`
@prefix egendata: <http://pod-test.egendata.se/schema/core/v1#> .
<> a egendata:InboundDataRequest ;
  egendata:id "8634a5d0-d18a-47b4-9fa4-5fc46d09b4bc" ;
  egendata:requestorWebId "http://localhost:3002/6ba4e50f-66d6-46e0-ae3e-5b124369cd55/profile/card#me" ;
  egendata:providerWebId "http://localhost:3002/2dfad0c6-0a97-40c2-9483-9d8016ffb332/profile/card#me" ;
  egendata:documentType "http://egendata.se/schema/core/v1#UnemploymentCertificate" ;
  egendata:purpose "Testing purposes." ;
  egendata:returnUrl "https://example.com/some/destination" ;
  <http://purl.org/dc/terms/created> "2022-11-15T15:17:55.000Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .`),
          );
        },
      ),
    );
    const { req, res } = mockRequestResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.json).toBeCalledWith({
      requests: [
        expect.objectContaining({ id: '9829364d-686e-4d0c-93b0-ed5203f569fe' }),
        expect.objectContaining({ id: '8634a5d0-d18a-47b4-9fa4-5fc46d09b4bc' }),
      ],
      total: 2,
    });
  });

  it('should return empty list on GET when no requests container exists', async () => {
    server.use(
      rest.get('https://pod.example.com/testuser/egendata/requests/', (req, res, ctx) => {
        return res(ctx.status(404));
      }),
    );
    const { req, res } = mockRequestResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
  });

  it.skip('should throw when server receives status code other than 404', async () => {
    server.use(
      rest.get('https://pod.example.com/testuser/egendata/requests/', (req, res, ctx) => {
        return res(ctx.status(401));
      }),
    );
    const { req, res } = mockRequestResponse();

    expect(async () => await handler(req, res)).toThrow();
  });

  it('should create resource and .acl on PUT', async () => {
    const requestorWebId = 'http://idp.example.com/requestor/profile/card#me';
    const providerWebId = 'http://idp.example.com/provider/profile/card#me';
    const documentType = 'http://pod-test.egendata.se/schema/code/v1#InboundDataRequest';
    const purpose = 'Some purpose.';
    const returnUrl = 'http://acme.inc/some/path';

    const pendingRequest = waitForRequest('PUT', 'https://pod.example.com/testuser/egendata/requests/:id/subject');

    const { req, res } = mockRequestResponse();
    req.method = 'POST';
    req.headers = { 'Content-Type': 'application/json' };
    req.body = { requestorWebId, providerWebId, documentType, purpose, returnUrl };

    await handler(req, res);

    const request = await pendingRequest;

    expect(res.statusCode).toBe(200);
    expect(request.headers.get('content-type')).toBe('text/turtle');
    expect(request.body).toContain('egendata:InboundDataRequest');
    expect(request.body).toContain('egendata:id');
    expect(request.body).toContain(requestorWebId);
    expect(request.body).toContain(providerWebId);
    expect(request.body).toContain(documentType);
    expect(request.body).toContain(purpose);
    expect(request.body).toContain(returnUrl);
    expect(request.body).toContain('<http://purl.org/dc/terms/created>');
  });

  it('should create resource and .acl on PUT', async () => {
    const requestorWebId = 'http://idp.example.com/requestor/profile/card#me';
    const providerWebId = 'http://idp.example.com/provider/profile/card#me';
    const documentType = 'http://pod-test.egendata.se/schema/code/v1#InboundDataRequest';
    const purpose = 'Some purpose.';
    const returnUrl = 'http://acme.inc/some/path';

    const pendingRequest = waitForRequest('PUT', 'https://pod.example.com/testuser/egendata/requests/:id/subject.acl');

    const { req, res } = mockRequestResponse();
    req.method = 'POST';
    req.headers = { 'Content-Type': 'application/json' };
    req.body = { requestorWebId, providerWebId, documentType, purpose, returnUrl };

    await handler(req, res);

    const request = await pendingRequest;

    expect(res.statusCode).toBe(200);
    expect(request.headers.get('content-type')).toBe('text/turtle');
    expect(request.body).toContain('<#owner> a acl:Authorization');
    expect(request.body).toContain('acl:accessTo');
    expect(request.body).toContain('acl:agent <https://idp.example.com/testuser/profile/card#me>');
    expect(request.body).toContain('acl:mode acl:Control, acl:Write, acl:Append, acl:Read');
  });

  it.skip('should return 405 on POST when authenticated', async () => {
    const { req, res } = mockRequestResponse();

    req.method = 'POST';
    req.headers = { 'Content-Type': 'application/json' };
    req.body = {};

    await handler(req, res);

    expect(res.statusCode).toBe(405);
  });
});
