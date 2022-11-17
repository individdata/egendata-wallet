import pino from 'pino';

jest.mock('pino', () => {
  return jest.fn();
});

describe('logger', () => {
  it('setups Pino', () => {
    const logger = require('./logger');

    expect(pino).toBeCalledTimes(1);
    expect(pino).toBeCalledWith({ enabled: false, level: 'debug', base: { env: 'test' } });
  });
});
