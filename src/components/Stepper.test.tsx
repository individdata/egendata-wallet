// import { describe, expect, test } from '@jest/globals';
import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Stepper } from './Stepper';
import withTheme from '../../tests/utils/withTheme';
import withIntl from '../../tests/utils/withIntl';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import withSWR from '../../tests/utils/withSWR';

const server = setupServer(
  rest.get('/api/request/39b355d5-9e9d-451b-b531-3017a7f5818c', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        url: 'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/requests/subject/39b355d5-9e9d-451b-b531-3017a7f5818c',
        type: 'https://pod-test.egendata.se/schema/core/v1#InboundDataRequest',
        documentTitle: '',
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
  rest.get('/api/request/69ef5436-35cc-4931-92bf-e42c0838f547', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        url: 'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/requests/subject/69ef5436-35cc-4931-92bf-e42c0838f547',
        type: 'https://pod-test.egendata.se/schema/core/v1#InboundDataRequest',
        documentTitle: '',
        documentType: 'http://egendata.se/schema/core/v1#UnemploymentCertificate',
        id: '69ef5436-35cc-4931-92bf-e42c0838f547',
        providerWebId: 'https://idp-test.egendata.se/aade2aaf-d8ce-4343-9286-aa67507be966/profile/card#me',
        purpose: 'Hand over the data!',
        requestorWebId: 'https://idp-test.egendata.se/ff9ec25d-9a8b-4e3e-bc00-0c8de1763b14/profile/card#me',
        returnUrl: 'https://example.com/some/destination',
        created: '2022-10-26T09:55:05.821Z',
        state: 'fetching',
        related: {
          outbound: [
            {
              url: 'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/requests/provider/69ef5436-35cc-4931-92bf-e42c0838f547',
            },
          ],
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
        documentTitle: '',
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
  rest.get('/api/request/c91b1d4e-1c39-4c89-9369-f0dca2270f89', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        url: 'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/requests/subject/c91b1d4e-1c39-4c89-9369-f0dca2270f89',
        type: 'https://pod-test.egendata.se/schema/core/v1#InboundDataRequest',
        documentTitle: '',
        documentType: 'http://egendata.se/schema/core/v1#UnemploymentCertificate',
        id: 'c91b1d4e-1c39-4c89-9369-f0dca2270f89',
        providerWebId: 'https://idp-test.egendata.se/aade2aaf-d8ce-4343-9286-aa67507be966/profile/card#me',
        purpose: 'Hand over the data!',
        requestorWebId: 'https://idp-test.egendata.se/ff9ec25d-9a8b-4e3e-bc00-0c8de1763b14/profile/card#me',
        returnUrl: 'https://example.com/some/destination',
        created: '2022-10-26T09:55:05.821Z',
        state: 'sharing',
        related: {
          outbound: [
            {
              url: 'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/requests/provider/c91b1d4e-1c39-4c89-9369-f0dca2270f89',
            },
          ],
          data: [
            {
              url: 'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/data/0644bee2-1aef-40df-9f09-42e36870de7e',
            },
          ],
          consents: [
            {
              url: 'https://pod-test.egendata.se/2921133a-1f01-4586-8dac-41eaf0e6ae46/egendata/consents/consumer/0644bee2-1aef-40df-9f09-42e36870de7e',
            },
          ],
        },
      }),
    );
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Stepper component in landing mode', () => {
  test('shows egendata brand name', () => {
    render(withTheme(withIntl(<Stepper requestId="" landing />)));

    expect(screen.getByTestId('egendataBrandName')).toHaveTextContent('Egendata');
  });

  test('shows correct icons', () => {
    render(withTheme(withIntl(<Stepper requestId="" landing />)));

    expect(screen.getByTestId('StepOneIcon')).toContainElement(screen.getByTestId('OneIcon'));
    expect(screen.getByTestId('StepTwoIcon')).toContainElement(screen.getByTestId('TwoIcon'));
  });
});

describe('Stepper component _not_ in landing mode', () => {
  test('does not show egendata brand name', async () => {
    render(withSWR(withTheme(withIntl(<Stepper requestId="39b355d5-9e9d-451b-b531-3017a7f5818c" />))));

    await waitForElementToBeRemoved(() => screen.getByTestId('StepperSkeleton'));

    expect(screen.queryByTestId('egendataBrandName')).not.toBeInTheDocument();
  });

  test('shows correct icons in state `received`', async () => {
    render(withSWR(withTheme(withIntl(<Stepper requestId="39b355d5-9e9d-451b-b531-3017a7f5818c" />))));

    await waitForElementToBeRemoved(() => screen.getByTestId('StepperSkeleton'));

    expect(screen.getByTestId('StepOneIcon')).toContainElement(screen.getByTestId('OneActiveIcon'));
    expect(screen.getByTestId('StepTwoIcon')).toContainElement(screen.getByTestId('TwoIcon'));
  });

  test('shows correct icons in state `fetching`', async () => {
    render(withSWR(withTheme(withIntl(<Stepper requestId="69ef5436-35cc-4931-92bf-e42c0838f547" />))));

    await waitForElementToBeRemoved(() => screen.getByTestId('StepperSkeleton'));

    expect(screen.getByTestId('StepOneIcon')).toContainElement(screen.getByTestId('CheckmarkIcon'));
    expect(screen.getByTestId('StepTwoIcon')).toContainElement(screen.getByTestId('TwoIcon'));
  });

  test('shows correct icons in state `available`', async () => {
    render(withSWR(withTheme(withIntl(<Stepper requestId="0644bee2-1aef-40df-9f09-42e36870de7e" />))));

    await waitForElementToBeRemoved(() => screen.getByTestId('StepperSkeleton'));

    expect(screen.getByTestId('StepOneIcon')).toContainElement(screen.getByTestId('CheckmarkIcon'));
    expect(screen.getByTestId('StepTwoIcon')).toContainElement(screen.getByTestId('TwoActiveIcon'));
  });

  test('shows correct icons in state `sharing`', async () => {
    render(withSWR(withTheme(withIntl(<Stepper requestId="c91b1d4e-1c39-4c89-9369-f0dca2270f89" />))));

    await waitForElementToBeRemoved(() => screen.getByTestId('StepperSkeleton'));

    expect(screen.getAllByTestId('CheckmarkIcon')).toHaveLength(2);
  });
});
