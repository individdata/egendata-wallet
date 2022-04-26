/* eslint-disable @typescript-eslint/no-unused-vars */
import { putFile } from './solid';

export const schemaServer = 'https://oak-pod-provider-oak-develop.test.services.jtech.se';
export const egendataSchema = `${schemaServer}/schema/core/v1#`;
export const egendataPrefixTurtle = `@prefix egendata: <${egendataSchema}> .`;
export const classNamespace = (className: string) => `${egendataSchema}${className}`;
