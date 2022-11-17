/** @type {import('pino').LoggerOptions} */

const config = {
  enabled: !!process.env.TESTING,
  level: process.env.LOG_LEVEL || 'info',
  base: {
    env: process.env.NODE_ENV,
  },
};

module.exports = config;
