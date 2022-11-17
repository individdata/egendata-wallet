import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import withIntl from '../../../tests/utils/withIntl';
import RequestList from './RequestList';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import withSWR from '../../../tests/utils/withSWR';

const server = setupServer(
  rest.get('/api/request', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
  rest.get('/api/user/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: 'ACME Inc.',
        logo: 'https://idp-test.egendata.se/ff9ec25d-9a8b-4e3e-bc00-0c8de1763b14/profile/logo',
      }),
    );
  }),
  rest.get('https://idp-test.egendata.se/:id/profile/card', (req, res, ctx) => {
    const id = req.params.id;
    return res(
      ctx.status(200),
      ctx.text(
        `@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n@prefix solid: <http://www.w3.org/ns/solid/terms#>.\n@prefix space: <http://www.w3.org/ns/pim/space#>.\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.\n@prefix schema: <http://schema.org/>.\n\n<>\n    a foaf:PersonalProfileDocument;\n    foaf:maker <https://idp-test.egendata.se/${id}j/profile/card#me>;\n    foaf:primaryTopic <https://idp-test.egendata.se/${id}/profile/card#me>.\n\n<https://idp-test.egendata.se/${id}/profile/card#me>\n    a foaf:Person;\n    foaf:name "ACME Inc.";\n\n    foaf:logo <./logo>;\n    solid:oidcIssuer <https://idp-test.egendata.se/>;\n    space:storage <https://pod-test.egendata.se/${id}/>;\n    rdfs:seeAlso <./private>.`,
      ),
    );
  }),
  rest.get('https://idp-test.egendata.se/:id/profile/logo', (req, res, ctx) => {
    return res(ctx.status(200), ctx.text(`data:image/svg;base64,PHN2Zz48L3N2Zz4`));
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe.skip('RequestList', () => {
  it('renders error message when api not available', async () => {
    server.use(
      rest.get('/api/request', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    render(withSWR(withIntl(<RequestList onRequestSelect={() => {}} />)));

    await waitForElementToBeRemoved(() => screen.getByTestId('loadingMessage'));

    expect(screen.getByTestId('errorMessage')).toBeInTheDocument();
  });

  it('renders with no items', async () => {
    render(withSWR(withIntl(<RequestList onRequestSelect={() => {}} />)));

    await waitForElementToBeRemoved(() => screen.getByTestId('loadingMessage'));

    expect(screen.getByTestId('noTasks')).toBeInTheDocument();
  });

  it('renders with incomplete items', async () => {
    server.use(
      // Return two incomplete items
      rest.get('/api/request', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([
            {
              id: '0fc742f9-7115-4ef1-a036-2bb88506a47d',
              url: 'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/requests/subject/0fc742f9-7115-4ef1-a036-2bb88506a47d',
              state: 'available',
            },
            {
              id: 'df6da35b-7b21-49ad-9d98-c8b4469c5986',
              url: 'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/requests/subject/df6da35b-7b21-49ad-9d98-c8b4469c5986',
              state: 'available',
            },
          ]),
        );
      }),
    );

    render(withSWR(withIntl(<RequestList onRequestSelect={() => {}} />)));

    await waitForElementToBeRemoved(() => screen.getByTestId('loadingMessage'));

    expect(screen.getByTestId('incompleteSubheader')).toBeInTheDocument();
    expect(screen.queryByTestId('completeSubheader')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('RequestItem')).toHaveLength(2);
  });

  it('renders with complete items', async () => {
    server.use(
      // Return two complete items
      rest.get('/api/request', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([
            {
              id: '0fc742f9-7115-4ef1-a036-2bb88506a47d',
              url: 'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/requests/subject/0fc742f9-7115-4ef1-a036-2bb88506a47d',
              state: 'available',
            },
            {
              id: 'df6da35b-7b21-49ad-9d98-c8b4469c5986',
              url: 'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/requests/subject/df6da35b-7b21-49ad-9d98-c8b4469c5986',
              state: 'available',
            },
          ]),
        );
      }),
    );

    render(withSWR(withIntl(<RequestList onRequestSelect={() => {}} />)));

    await waitForElementToBeRemoved(() => screen.getByTestId('loadingMessage'));

    expect(screen.getByTestId('completeSubheader')).toBeInTheDocument();
    expect(screen.queryByTestId('incompleteSubheader')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('RequestItem')).toHaveLength(2);
  });

  it('renders with both complete and incomplete items', async () => {
    server.use(
      // Return one incomplete item and one complete item
      rest.get('/api/request', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([
            {
              id: '0fc742f9-7115-4ef1-a036-2bb88506a47d',
              url: 'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/requests/subject/0fc742f9-7115-4ef1-a036-2bb88506a47d',
              state: 'available',
            },
            {
              id: 'df6da35b-7b21-49ad-9d98-c8b4469c5986',
              url: 'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/requests/subject/df6da35b-7b21-49ad-9d98-c8b4469c5986',
              state: 'shared',
            },
          ]),
        );
      }),
    );

    render(withSWR(withIntl(<RequestList onRequestSelect={() => {}} />)));

    await waitForElementToBeRemoved(() => screen.getByTestId('loadingMessage'));

    expect(screen.getByTestId('completeSubheader')).toBeInTheDocument();
    expect(screen.getByTestId('incompleteSubheader')).toBeInTheDocument();
    expect(screen.getAllByTestId('RequestItem')).toHaveLength(2);
  });
});
