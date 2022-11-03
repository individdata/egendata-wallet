import fetchFactory from './fetchFactory';
import logger from './logger';

// This more complicated mock is needed because of some module format incompatibility (?)
jest.mock('jose', () => ({
  JWT: jest.fn(),
  SignJWT: jest.fn(),
  importJWK: jest.fn(),
}));

jest.mock('./logger');

(global.fetch as jest.Mock) = jest.fn(async () => ({ ok: jest.fn() }));

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
  (logger.debug as jest.Mock).mockClear();
});

describe('fetchFactory', () => {
  test('throws when missing keyPair', () => {
    const props = { keyPair: undefined, dpopToken: 'some-token-value' };

    expect(() => fetchFactory(props)).toThrow();
  });

  test('throws when missing dpopToken', () => {
    const props = { keyPair: { privateKey: 'private-key', publicKey: 'publicKey' }, dpopToken: undefined };

    expect(() => fetchFactory(props)).toThrow();
  });

  test('returns a fetch function that sets DPoP headers', async () => {
    // (global.fetch as jest.Mock) = jest.fn(async () => ({ ok: jest.fn() }));
    const mockGenerateDPoP = jest.fn(async () => 'dpop-header-token-value');

    const fetcher = fetchFactory(
      {
        keyPair: {},
        dpopToken: 'dpop-token-value',
      },
      mockGenerateDPoP,
    );

    await fetcher('/test');

    expect(mockGenerateDPoP).toBeCalledTimes(1);

    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith('/test', {
      headers: new Headers({ authorization: 'DPoP dpop-token-value', dpop: 'dpop-header-token-value' }),
      method: 'GET',
    });
  });

  test('returns a fetch function that sets DPoP headers and preserves custom headers', async () => {
    const mockGenerateDPoP = jest.fn(async () => 'dpop-header-token-value');

    const fetcher = fetchFactory(
      {
        keyPair: {},
        dpopToken: 'dpop-token-value',
      },
      mockGenerateDPoP,
    );

    await fetcher('/test', { headers: { Accept: 'application/json' }, method: 'POST' });

    expect(mockGenerateDPoP).toBeCalledTimes(1);

    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith('/test', {
      headers: new Headers({
        accept: 'application/json',
        authorization: 'DPoP dpop-token-value',
        dpop: 'dpop-header-token-value',
      }),
      method: 'POST',
    });
  });

  test('returns a fetch function that logs when status is ok', async () => {
    const mockGenerateDPoP = jest.fn(async () => 'dpop-header-token-value');

    const fetcher = fetchFactory(
      {
        keyPair: {},
        dpopToken: 'dpop-token-value',
      },
      mockGenerateDPoP,
    );

    await fetcher('/test');

    expect(fetch).toBeCalledTimes(1);
    expect(logger.debug).toHaveBeenCalledWith(expect.stringMatching(/success/i));
  });

  test('returns a fetch function that logs when status is not ok', async () => {
    const mockGenerateDPoP = jest.fn(async () => 'dpop-header-token-value');

    (fetch as jest.Mock).mockResolvedValueOnce({ status: 500 });

    const fetcher = fetchFactory(
      {
        keyPair: {},
        dpopToken: 'dpop-token-value',
      },
      mockGenerateDPoP,
    );

    await fetcher('/test');

    expect(fetch).toBeCalledTimes(1);
    expect(logger.debug).toHaveBeenCalledWith(expect.anything(), expect.stringMatching(/fail/i));
  });
});
