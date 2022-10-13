import { egendataSchema } from './index';

export type TurtleSubjectRequestProps = {
  id: string;
  requestorWebId: string;
  providerWebId: string;
  documentType: string;
  purpose: string;
  returnUrl: string;
  date: Date;
};

export const turtleSubjectRequest = ({
  id,
  requestorWebId,
  providerWebId,
  documentType,
  purpose,
  returnUrl,
  date,
}: TurtleSubjectRequestProps) => {
  // prettier-ignore
  return `@prefix egendata: <${egendataSchema}> .\n<> a egendata:InboundDataRequest ;\n  egendata:id "${id}" ;\n  egendata:requestorWebId "${requestorWebId}" ;\n  egendata:providerWebId "${providerWebId}" ;\n  egendata:documentType "${documentType}" ;\n  egendata:purpose "${purpose}" ;\n  egendata:returnUrl "${returnUrl}" ;\n  <http://purl.org/dc/terms/created> "${date.toISOString()}"^^<http://www.w3.org/2001/XMLSchema#dateTime> .`;
};

export type TurtleProviderRequestProps = {
  id: string;
  dataSubjectIdentifier: string;
  dataLocation: string;
  notificationInbox: string;
  documentType: string;
  date: Date;
};

export const turtleProviderRequest = ({
  id,
  dataSubjectIdentifier,
  dataLocation,
  notificationInbox,
  documentType,
  date,
}: TurtleProviderRequestProps) => {
  // prettier-ignore
  return `@prefix egendata: <${egendataSchema}> .\n<> a egendata:OutboundDataRequest ;\n  egendata:id "${id}" ;\n  egendata:documentType "${documentType}" ;\n  egendata:dataSubjectIdentifier "${dataSubjectIdentifier}" ;\n  egendata:dataLocation "${dataLocation}" ;\n  egendata:notificationInbox "${notificationInbox}" ;\n  <http://purl.org/dc/terms/created> "${date.toISOString()}"^^<http://www.w3.org/2001/XMLSchema#dateTime> .`;
};

export type TurtleProviderConsentProps = {
  consentDocument: string;
  providerRequest: string;
  providerWebId: string;
  requestId: string;
  date: Date;
};

export const turtleProviderConsent = ({
  consentDocument,
  providerRequest,
  providerWebId,
  requestId,
  date,
}: TurtleProviderConsentProps) => {
  return `@prefix egendata: <${egendataSchema}> .\n<> a egendata:ProviderConsent ;\n  egendata:consentDocument "${consentDocument}" ;\n  egendata:providerRequest "${providerRequest}" ;\n  egendata:providerWebId "${providerWebId}" ;\n  egendata:requestId "${requestId}" ;\n  <http://purl.org/dc/terms/created> "${date.toISOString()}"^^<http://www.w3.org/2001/XMLSchema#dateTime> .`;
};

export type TurtleNotificationProps = {
  providerRequest: string;
};

export const turtleNotification = ({ providerRequest }: TurtleNotificationProps) => {
  return `@prefix egendata: <${egendataSchema}> .\n<> egendata:OutBoundDataRequest <${providerRequest}>.`;
};

export type TurtleConsumerConsentProps = {
  consentDocument: string;
  consumerWebId: string;
  requestId: string;
  sharedData: string;
  date: Date;
};

export const turtleConsumerConsent = ({
  consentDocument,
  consumerWebId,
  requestId,
  sharedData,
  date,
}: TurtleConsumerConsentProps) => {
  return `
@prefix egendata: <${egendataSchema}> .
<> a egendata:InboundDataResponse ;
  egendata:consentDocument "${consentDocument}" ;
  egendata:consumerWebId "${consumerWebId}" ;
  egendata:requestId "${requestId}" ;
  egendata:sharedData "${sharedData}" ;
  <http://purl.org/dc/terms/created> "${date.toISOString()}"^^<http://www.w3.org/2001/XMLSchema#dateTime> .`;
};
