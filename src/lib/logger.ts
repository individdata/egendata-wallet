import pino from 'pino';
import config from '../logging.config';

export const logger = pino(config);

export default logger;
