import pino from 'pino';
import config from '../logging.config';

export type { Logger } from 'pino';

export const logger = pino(config);

export default logger;
