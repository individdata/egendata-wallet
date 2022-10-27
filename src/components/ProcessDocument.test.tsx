import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { ProcessDocument } from './ProcessDocument';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import withTheme from '../../tests/utils/withTheme';
import withIntl from '../../tests/utils/withIntl';
import withSWR from '../../tests/utils/withSWR';

const server = setupServer(
  rest.get('/api/request/82c6b876-1ae9-4c5a-9ff0-299059bc52e7', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        url: 'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/requests/subject/39b355d5-9e9d-451b-b531-3017a7f5818c',
        type: 'https://pod-test.egendata.se/schema/core/v1#InboundDataRequest',
        documentTitle: 'Unemployment certificate',
        documentType: 'http://egendata.se/schema/core/v1#UnemploymentCertificate',
        id: '39b355d5-9e9d-451b-b531-3017a7f5818c',
        providerWebId: 'https://idp-test.egendata.se/aade2aaf-d8ce-4343-9286-aa67507be966/profile/card#me',
        purpose: 'Hand over the data!',
        requestorWebId: 'https://idp-test.egendata.se/ff9ec25d-9a8b-4e3e-bc00-0c8de1763b14/profile/card#me',
        returnUrl: 'https://example.com/some/destination',
        created: '2022-10-27T09:58:29.170Z',
        state: 'received',
        related: {
          outbound: [],
          data: [],
          consents: [],
        },
      }),
    );
  }),
  rest.get('/api/request/0644bee2-1aef-40df-9f09-42e36870de7e', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        url: 'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/requests/subject/0644bee2-1aef-40df-9f09-42e36870de7e',
        type: 'https://pod-test.egendata.se/schema/core/v1#InboundDataRequest',
        documentTitle: 'Unemployment certificate',
        documentType: 'http://egendata.se/schema/core/v1#UnemploymentCertificate',
        id: '0644bee2-1aef-40df-9f09-42e36870de7e',
        providerWebId: 'https://idp-test.egendata.se/aade2aaf-d8ce-4343-9286-aa67507be966/profile/card#me',
        purpose: 'Hand over the data!',
        requestorWebId: 'https://idp-test.egendata.se/ff9ec25d-9a8b-4e3e-bc00-0c8de1763b14/profile/card#me',
        returnUrl: 'https://example.com/some/destination',
        created: '2022-10-26T09:55:05.821Z',
        state: 'available',
        related: {
          outbound: [
            {
              url: 'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/requests/provider/0644bee2-1aef-40df-9f09-42e36870de7e',
            },
          ],
          data: [
            {
              url: 'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/data/0644bee2-1aef-40df-9f09-42e36870de7e',
            },
          ],
          consents: [],
        },
      }),
    );
  }),
  // Requestor
  rest.get('/api/user/ff9ec25d-9a8b-4e3e-bc00-0c8de1763b14', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: 'Insurance Company Inc.',
        logo: 'https://example.com/some/path',
      }),
    );
  }),
  // Provider
  rest.get('/api/user/aade2aaf-d8ce-4343-9286-aa67507be966', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: 'Government Agency',
        logo: 'https://example.com/some/path',
      }),
    );
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('ProcessDocument', () => {
  test('shows document title and provider when in state `received`', async () => {
    render(
      withSWR(
        withTheme(
          withIntl(
            <ProcessDocument
              requestId="82c6b876-1ae9-4c5a-9ff0-299059bc52e7"
              onGetClick={() => {}}
              onShowConsentClick={() => {}}
            />,
          ),
        ),
      ),
    );

    await waitForElementToBeRemoved(() => screen.getByTestId('Loading'));
    await waitFor(() => screen.getByTestId('ProviderName'));

    expect(screen.getByTestId('DocumentTitle')).toHaveTextContent(/Unemployment Certificate/i);
    expect(screen.getByTestId('ProviderName')).toHaveTextContent(/Government Agency/i);
  });

  test('shows document title and provider when in state `available`', async () => {
    render(
      withSWR(
        withTheme(
          withIntl(
            <ProcessDocument
              requestId="0644bee2-1aef-40df-9f09-42e36870de7e"
              onGetClick={() => {}}
              onShowConsentClick={() => {}}
            />,
          ),
        ),
      ),
    );

    await waitForElementToBeRemoved(() => screen.getByTestId('Loading'));
    await waitFor(() => screen.getByTestId('RequestorName'));

    expect(screen.getByTestId('DocumentTitle')).toHaveTextContent(/Unemployment Certificate/i);
    expect(screen.getByTestId('RequestorName')).toHaveTextContent(/Insurance Company Inc./i);
  });
});
