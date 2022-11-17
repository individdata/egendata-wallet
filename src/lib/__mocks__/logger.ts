import { Logger } from 'pino';

export const logger = {
  trace: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  fatal: jest.fn(),
  child: jest.fn(),
} as unknown as jest.Mocked<Logger>;

logger.child.mockImplementation(() => logger);

export default logger;
