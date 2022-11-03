import pino from 'pino';

jest.mock('pino', () => {
  return jest.fn();
});

describe('logger', () => {
  test('setups Pino', () => {
    const logger = require('./logger');

    expect(pino).toBeCalledTimes(1);
    expect(pino).toBeCalledWith({ level: 'debug', base: { env: 'test' } });
  });
});
