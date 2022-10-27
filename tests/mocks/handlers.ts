import { rest } from 'msw';

export const handlers = [
  rest.get(
    'http://pod.example.com/43d4b21b-e37a-460b-80e9-f8e36ba3298a/egendata/requests/subject/69ef5436-35cc-4931-92bf-e42c0838f547',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.text(`
@prefix egendata: <https://pod.example.com/schema/core/v1#> .
<> a egendata:InboundDataRequest ;
  egendata:id "69ef5436-35cc-4931-92bf-e42c0838f547" ;
  egendata:requestorWebId "http://idp.example.com/bnp/profile/card#me" ;
  egendata:providerWebId "http://idp.example.com/arbetsformedlingen/profile/card#me" ;
  egendata:documentType "http://idp.example.com/schema/core/v1#UnemploymentCertificate" ;
  egendata:purpose "To serve you a good service" ;
  egendata:returnUrl "http://other.com/return" ;
  <http://purl.org/dc/terms/created> "2022-10-26T09:37:18.901Z"^^<http://www.w3.org/2001/XMLSchema#dateTime> .`),
      );
    },
  ),
  rest.get('/testing', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ hello: 'world' }));
  }),
];
