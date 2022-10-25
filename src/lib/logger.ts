import pino from 'pino';

export const logger = pino({
  level: 'debug',
  base: {
    env: process.env.NODE_ENV,
  },
});

export default logger;
