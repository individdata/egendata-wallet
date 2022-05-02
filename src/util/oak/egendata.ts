/* eslint-disable @typescript-eslint/no-unused-vars */
import { putFile } from './solid';
import config from '../config';

export const egendataSchema = `${config.podProviderBaseUrl}schema/core/v1#`;
export const egendataPrefixTurtle = `@prefix egendata: <${egendataSchema}> .`;
export const classNamespace = (className: string) => `${egendataSchema}${className}`;
