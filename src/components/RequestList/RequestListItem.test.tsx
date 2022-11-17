import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import RequestListItem from './RequestListItem';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { RequestState } from '../../types';

const logo =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgdmVyc2lvbj0iMS4xInhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI-DQogICA8cmVjdCBzdHlsZT0iZmlsbDojMDAwMDVhO3N0cm9rZS13aWR0aDoxIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHg9IjIiIHk9IjIiIHJ4PSIxIiByeT0iMSIgLz4NCjwvc3ZnPg0K';

const server = setupServer(
  rest.get('https://idp-test.egendata.se/:id/profile/card', (req, res, ctx) => {
    const id = req.params.id;
    return res(
      ctx.status(200),
      ctx.text(
        `@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n@prefix solid: <http://www.w3.org/ns/solid/terms#>.\n@prefix space: <http://www.w3.org/ns/pim/space#>.\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.\n@prefix schema: <http://schema.org/>.\n\n<>\n    a foaf:PersonalProfileDocument;\n    foaf:maker <https://idp-test.egendata.se/${id}j/profile/card#me>;\n    foaf:primaryTopic <https://idp-test.egendata.se/${id}/profile/card#me>.\n\n<https://idp-test.egendata.se/${id}/profile/card#me>\n    a foaf:Person;\n    foaf:name "ACME Inc.";\n\n    foaf:logo <./logo>;\n    solid:oidcIssuer <https://idp-test.egendata.se/>;\n    space:storage <https://pod-test.egendata.se/${id}/>;\n    rdfs:seeAlso <./private>.`,
      ),
    );
  }),
  rest.get('https://idp-test.egendata.se/ff9ec25d-9a8b-4e3e-bc00-0c8de1763b14/profile/logo', (req, res, ctx) => {
    return res(ctx.status(200), ctx.text(logo));
  }),
  rest.get('/api/user/:webid', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: 'ACME Inc.',
        logo: 'https://idp-test.egendata.se/ff9ec25d-9a8b-4e3e-bc00-0c8de1763b14/profile/logo',
      }),
    );
  }),
  rest.get('http://localhost/api/request/0fc742f9-7115-4ef1-a036-2bb88506a47d', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: '0fc742f9-7115-4ef1-a036-2bb88506a47d',
        url: new URL(
          'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/requests/0fc742f9-7115-4ef1-a036-2bb88506a47d',
        ),
        state: 'received',
        type: 'https://pod-test.egendata.se/schema/core/v1#InboundDataRequest',
        documentTitle: 'Unemployment certificate',
        documentType: 'http://pod-test.egendata.se/schema/core/v1#UnemploymentCertificate',
        providerWebId: new URL(
          'https://pod-test.egendata.se/ebd60585-ce26-4f31-a764-b268b1ec4316/egendata/requests/0fc742f9-7115-4ef1-a036-2bb88506a47d',
        ),
        purpose: 'Hand over the data!',
        requestorWebId: new URL('https://idp-test.egendata.se/eed75ca2-9d63-4926-a038-2527d02b935f/profile/card#me'),
        returnUrl: new URL('https://acme.inc/some/path'),
        created: new Date('2022-11-15T15:17:55.000Z'),
      }),
    );
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('RequestListItem', () => {
  it('renders with request data', async () => {
    const request = {
      id: '0fc742f9-7115-4ef1-a036-2bb88506a47d',
      url: new URL(
        'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/requests/0fc742f9-7115-4ef1-a036-2bb88506a47d',
      ),
      state: 'received' as RequestState,
    };

    render(<RequestListItem request={request} onClick={() => {}} />);

    await waitForElementToBeRemoved(() => screen.getByTestId('RequestItemSkeleton'));

    expect(screen.getByTestId('requestor')).toHaveTextContent(/ACME Inc./i);
    expect(screen.getByTestId('purpose')).toHaveTextContent(/Hand over the data!/i);
    expect(screen.getByTestId('createdDate')).toHaveTextContent(/2022-11-15/);

    await waitForElementToBeRemoved(() => screen.getByTestId('PersonIcon'));

    expect(screen.getByTestId('avatar').children[0].getAttribute('src')).toBe(logo);
  });
});
