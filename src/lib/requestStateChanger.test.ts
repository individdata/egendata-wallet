import { changeToFetching, changeToSharing } from './requestStateChanger';
import { setupServer } from 'msw/node';
import { matchRequestUrl, MockedRequest, rest } from 'msw';

const server = setupServer(
  rest.get('http://localhost:3002/d5b85b5a-bbc2-470f-9da6-9779c74b4847/profile/private', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set('Content-Type', 'text/turtle'),
      ctx.body(`@prefix foaf: <http://xmlns.com/foaf/0.1/>.
<#me>
  foaf:firstName "Inskrivning";
  foaf:lastName "Test One";
  <http://pod-test.egendata.se/schema/core/v1#dataSubjectIdentifier> "199010102383";
  <http://pod-test.egendata.se/schema/core/v1#uuid> "d5b85b5a-bbc2-470f-9da6-9779c74b4847" .`),
    );
  }),
  rest.get(
    'http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.set('Content-Type', 'text/turtle'),
        ctx.body(`@prefix dc: <http://purl.org/dc/terms/>.
@prefix ldp: <http://www.w3.org/ns/ldp#>.
@prefix posix: <http://www.w3.org/ns/posix/stat#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

<> a ldp:Container, ldp:BasicContainer, ldp:Resource;
  dc:modified "2022-11-17T09:35:59.000Z"^^xsd:dateTime.
<subject> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
  dc:modified "2022-11-17T09:35:59.000Z"^^xsd:dateTime.
<> posix:mtime 1668677759;
  ldp:contains <subject>.
<subject> posix:mtime 1668677759;
  posix:size 664.`),
      );
    },
  ),
  rest.get(
    'http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/subject',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.set('Content-Type', 'text/turtle'),
        ctx.body(`@prefix egendata: <http://pod-test.egendata.se/schema/core/v1#> .
<> a egendata:InboundDataRequest ;
  egendata:id "02a2347e-4c61-4553-8c48-5d6a24951adf" ;
  egendata:requestorWebId "http://localhost:3002/6ba4e50f-66d6-46e0-ae3e-5b124369cd55/profile/card#me" ;
  egendata:providerWebId "http://localhost:3002/2dfad0c6-0a97-40c2-9483-9d8016ffb332/profile/card#me" ;
  egendata:documentType "http://egendata.se/schema/core/v1#UnemploymentCertificate" ;
  egendata:purpose "Testing purposes." ;
  egendata:returnUrl "https://example.com/some/destination" ;
  <http://purl.org/dc/terms/created> "2022-11-17T09:35:58.975Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .`),
      );
    },
  ),
  // rest.get(
  //   'http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/data',
  //   (req, res, ctx) => {
  //     return res(ctx.status(200), ctx.set('Content-Type', 'text/turtle'));
  //   },
  // ),
  rest.get('http://localhost:3002/2dfad0c6-0a97-40c2-9483-9d8016ffb332/profile/card', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set('Content-Type', 'text/turtle'),
      ctx.body(`@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix solid: <http://www.w3.org/ns/solid/terms#>.
@prefix space: <http://www.w3.org/ns/pim/space#>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix schema: <http://schema.org/>.

<>
    a foaf:PersonalProfileDocument;
    foaf:maker <http://localhost:3002/2dfad0c6-0a97-40c2-9483-9d8016ffb332/profile/card#me>;
    foaf:primaryTopic <http://localhost:3002/2dfad0c6-0a97-40c2-9483-9d8016ffb332/profile/card#me>.

<http://localhost:3002/2dfad0c6-0a97-40c2-9483-9d8016ffb332/profile/card#me>
    a foaf:Person;
    foaf:name "Arbetsförmedlingen";
    schema:email "2dfad0c6-0a97-40c2-9483-9d8016ffb332@example.com";
    foaf:logo <./logo>;
    solid:oidcIssuer <http://localhost:3002/>;
    space:storage <http://localhost:3001/2dfad0c6-0a97-40c2-9483-9d8016ffb332/>;
    rdfs:seeAlso <./private>.`),
    );
  }),
  rest.get('http://localhost:3002/6ba4e50f-66d6-46e0-ae3e-5b124369cd55/profile/card', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set('Content-Type', 'text/turtle'),
      ctx.body(`@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix solid: <http://www.w3.org/ns/solid/terms#>.
@prefix space: <http://www.w3.org/ns/pim/space#>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix schema: <http://schema.org/>.

<>
    a foaf:PersonalProfileDocument;
    foaf:maker <http://localhost:3002/6ba4e50f-66d6-46e0-ae3e-5b124369cd55/profile/card#me>;
    foaf:primaryTopic <http://localhost:3002/6ba4e50f-66d6-46e0-ae3e-5b124369cd55/profile/card#me>.

<http://localhost:3002/6ba4e50f-66d6-46e0-ae3e-5b124369cd55/profile/card#me>
    a foaf:Person;
    foaf:name "BNP Paribas";
    schema:email "6ba4e50f-66d6-46e0-ae3e-5b124369cd55@example.com";
    foaf:logo <./logo>;
    solid:oidcIssuer <http://localhost:3002/>;
    space:storage <http://localhost:3001/6ba4e50f-66d6-46e0-ae3e-5b124369cd55/>;
    rdfs:seeAlso <./private>.`),
    );
  }),
  rest.put('http://localhost:3001/:id/egendata/requests/:requestId/fetch', (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.put('http://localhost:3001/:id/egendata/requests/:requestId/fetch.acl', (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.put('http://localhost:3001/:id/egendata/requests/:requestId/data', (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.put('http://localhost:3001/:id/egendata/requests/:requestId/data.acl', (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.put('http://localhost:3001/:id/egendata/requests/:requestId/consent', (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.put('http://localhost:3001/:id/egendata/inbox/:requestId', (req, res, ctx) => {
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

describe('changeToFetching', () => {
  it('should create correct resources', async () => {
    const webId = 'http://localhost:3002/d5b85b5a-bbc2-470f-9da6-9779c74b4847/profile/card#me';
    const seeAlso = 'http://localhost:3002/d5b85b5a-bbc2-470f-9da6-9779c74b4847/profile/private';
    const requestURL = new URL(
      'http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/',
    );

    const pendingFetchRequest = waitForRequest(
      'PUT',
      'http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/fetch',
    );
    const pendingFetchACLRequest = waitForRequest(
      'PUT',
      'http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/fetch.acl',
    );
    const pendingDataRequest = waitForRequest(
      'PUT',
      'http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/data',
    );
    const pendingDataACLRequest = waitForRequest(
      'PUT',
      'http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/data.acl',
    );
    const pendingProviderNotificationRequest = waitForRequest(
      'PUT',
      'http://localhost:3001/2dfad0c6-0a97-40c2-9483-9d8016ffb332/egendata/inbox/:id',
    );

    await changeToFetching(webId, seeAlso, requestURL, fetch);

    const fetchRequest = await pendingFetchRequest;
    const fetchACLRequest = await pendingFetchACLRequest;
    const dataRequest = await pendingDataRequest;
    const dataACLRequest = await pendingDataACLRequest;
    const providerNotificationRequest = await pendingProviderNotificationRequest;

    expect(fetchRequest.headers.get('content-type')).toBe('text/turtle');
    expect(fetchACLRequest.headers.get('content-type')).toBe('text/turtle');
    expect(dataRequest.headers.get('content-type')).toBe('text/turtle');
    expect(dataACLRequest.headers.get('content-type')).toBe('text/turtle');
    expect(providerNotificationRequest.headers.get('content-type')).toBe('text/turtle');

    const fetchACLRequestText = await fetchACLRequest.text();
    // Permissions for owner
    expect(fetchACLRequestText).toContain(
      `<#owner> a acl:Authorization ;
  acl:accessTo <http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/fetch> ;
  acl:agent <http://localhost:3002/d5b85b5a-bbc2-470f-9da6-9779c74b4847/profile/card#me> ;
  acl:mode acl:Control, acl:Write, acl:Append, acl:Read .`,
    );
    // Permissions for provider
    expect(fetchACLRequestText).toContain(
      `<#provider> a acl:Authorization ;
  acl:accessTo <http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/fetch> ;
  acl:agent <http://localhost:3002/2dfad0c6-0a97-40c2-9483-9d8016ffb332/profile/card#me> ;
  acl:mode acl:Read .`,
    );

    const dataACLRequestText = await dataACLRequest.text();
    // Permissions for owner
    expect(dataACLRequestText).toContain(`<#owner> a acl:Authorization ;
  acl:accessTo <http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/data> ;
  acl:agent <http://localhost:3002/d5b85b5a-bbc2-470f-9da6-9779c74b4847/profile/card#me> ;
  acl:mode acl:Control, acl:Write, acl:Append, acl:Read .`);
    // Permissions for provider
    expect(dataACLRequestText).toContain(`<#provider> a acl:Authorization ;
  acl:accessTo <http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/data> ;
  acl:agent <http://localhost:3002/2dfad0c6-0a97-40c2-9483-9d8016ffb332/profile/card#me> ;
  acl:mode acl:Write, acl:Append .`);

    const poviderNotificationRequestText = await providerNotificationRequest.text();

    expect(poviderNotificationRequestText).toContain(
      `@prefix egendata: <http://pod-test.egendata.se/schema/core/v1#> .
<> egendata:OutboundDataRequest <http://localhost:3001/2dfad0c6-0a97-40c2-9483-9d8016ffb332/egendata/inbox/02a2347e-4c61-4553-8c48-5d6a24951adf>.`,
    );
  });
});

describe('changeToSharing', () => {
  it('should create correct resources', async () => {
    const webId = 'http://localhost:3002/d5b85b5a-bbc2-470f-9da6-9779c74b4847/profile/card#me';
    const seeAlso = 'http://localhost:3002/d5b85b5a-bbc2-470f-9da6-9779c74b4847/profile/private';
    const requestURL = new URL(
      'http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/',
    );

    const pendingConsentRequest = waitForRequest(
      'PUT',
      'http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/consent',
    );
    const pendingFetchACLRequest = waitForRequest(
      'PUT',
      'http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/fetch.acl',
    );
    const pendingDataACLRequest = waitForRequest(
      'PUT',
      'http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/data.acl',
    );
    const pendingConsumerNotificationRequest = waitForRequest(
      'PUT',
      'http://localhost:3001/6ba4e50f-66d6-46e0-ae3e-5b124369cd55/egendata/inbox/:id',
    );

    await changeToSharing(webId, requestURL, fetch);

    const consentRequest = await pendingConsentRequest;
    const fetchACLRequest = await pendingFetchACLRequest;
    const dataACLRequest = await pendingDataACLRequest;
    const consumerNotificationRequest = await pendingConsumerNotificationRequest;

    expect(consentRequest.headers.get('content-type')).toBe('text/turtle');
    expect(fetchACLRequest.headers.get('content-type')).toBe('text/turtle');
    expect(dataACLRequest.headers.get('content-type')).toBe('text/turtle');
    expect(consumerNotificationRequest.headers.get('content-type')).toBe('text/turtle');

    const fetchACLRequestText = await fetchACLRequest.text();
    // Permissions for owner
    expect(fetchACLRequestText).toContain(
      `<#owner> a acl:Authorization ;
  acl:accessTo <http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/fetch> ;
  acl:agent <http://localhost:3002/d5b85b5a-bbc2-470f-9da6-9779c74b4847/profile/card#me> ;
  acl:mode acl:Control, acl:Write, acl:Append, acl:Read .`,
    );
    // Permissions for provider
    expect(fetchACLRequestText).not.toContain(`<#provider> a acl:Authorization ;`);

    const dataACLRequestText = await dataACLRequest.text();
    // Permissions for owner
    expect(dataACLRequestText).toContain(`<#owner> a acl:Authorization ;
  acl:accessTo <http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/data> ;
  acl:agent <http://localhost:3002/d5b85b5a-bbc2-470f-9da6-9779c74b4847/profile/card#me> ;
  acl:mode acl:Control, acl:Write, acl:Append, acl:Read .`);
    // Permissions for provider
    expect(dataACLRequestText).toContain(`<#requestor> a acl:Authorization ;
  acl:accessTo <http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/data> ;
  acl:agent <http://localhost:3002/6ba4e50f-66d6-46e0-ae3e-5b124369cd55/profile/card#me> ;
  acl:mode acl:Read .`);

    const consumerNotificationRequestText = await consumerNotificationRequest.text();

    expect(consumerNotificationRequestText).toContain(
      `@prefix egendata: <http://pod-test.egendata.se/schema/core/v1#> .
<> egendata:OutboundDataResponse <http://localhost:3001/d5b85b5a-bbc2-470f-9da6-9779c74b4847/egendata/requests/02a2347e-4c61-4553-8c48-5d6a24951adf/data>.`,
    );
  });
});
