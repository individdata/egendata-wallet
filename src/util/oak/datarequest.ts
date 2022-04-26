import { egendataPrefixTurtle } from './egendata';

export type InboundDataRequest = {
  id: string,
  requestorWebId: string,
  providerWebId: string,
  documentType: string,
  purpose: string,
  returnUrl: string,
};
export const inboundDataRequestUrl = ((userPodUrl: string, id: string) => `${userPodUrl}oak/requests/request-${id}`);
export const inboundDataRequestTurtle = ((
  id: string,
  requestorWebId: string,
  providerWebId: string,
  documentType: string,
  purpose: string,
  returnUrl: string,
) => `
${egendataPrefixTurtle}
<> a <egendata:InboundDataRequest> ;
  <egendata:id> "${id}" ;
  <egendata:requestorWebId> "${requestorWebId}" ;
  <egendata:providerWebId> "${providerWebId}" ;
  <egendata:documentType> "${documentType}" ;
  <egendata:purpose> "${purpose}" ;
  <egendata:returnUrl> "${returnUrl}" .`);

export const outboundDataRequestUrl = ((userPodUrl: string, id: string) => `${userPodUrl}/oak/fetch-requests/fetch-request-${id}`);
export const outboundDataRequestTurtle = ((userPodUrl: string, responseUuid: string, pnr: string, documentTypeUrl: string) => `
${egendataPrefixTurtle}
<> a <egendata:OutboundDataRequest> ;
  <egendata:documentType> ${documentTypeUrl} ;
  <egendata:dataSubjectIdentifier> ${pnr} ;
  <egendata:dataLocation> ${userPodUrl}/oak/responses/response-${responseUuid}.ttl .
`);

export const outboundDataRequestLinkUrl = ((sourcePodUrl: string, id: string) => `${sourcePodUrl}/oak/inbox/request-${id}`);
export const outboundDataRequestLinkTurtle = ((userPodUrl: string, id: string) => `
${egendataPrefixTurtle}
<> <egendata:OutboundDataRequest> <${userPodUrl}/oak/fetch-requests/fetch-request-${id}>.
`);

export const inboundDataResponseUrl = ((userPodUrl: string, id: string) => `${userPodUrl}/oak/feetch-responses/fetch-response-${id}`);
export const inboundDataResponseTurtle = (() => '');

export const inboundDataResponseAclUrl = ((userPodUrl: string, id: string) => `${userPodUrl}/oak/responses/response-${id}`);
export const inboundDataResponseAclTurtle = ((userPodUrl: string, id: string, userWebId: string, sourceWebId: string) => `
<#user> a <http://www.w3.org/ns/auth/acl#Authorization>;
    <http://www.w3.org/ns/auth/acl#accessTo> <${userPodUrl}/oak/requests/request-${id}>;
    <http://www.w3.org/ns/auth/acl#agent> <mailto:user@example.com>, <${sourceWebId}>;
    <http://www.w3.org/ns/auth/acl#mode> <http://www.w3.org/ns/auth/acl#Write>, <http://www.w3.org/ns/auth/acl#Append>.
<#owner> a <http://www.w3.org/ns/auth/acl#Authorization>;
    <http://www.w3.org/ns/auth/acl#accessTo> <${userPodUrl}/oak/requests/request-${id}>;
    <http://www.w3.org/ns/auth/acl#agent> <mailto:sink@example.com>, <${userWebId}/sink/profile/card#me>;
    <http://www.w3.org/ns/auth/acl#mode> <http://www.w3.org/ns/auth/acl#Write>, <http://www.w3.org/ns/auth/acl#Read>, <http://www.w3.org/ns/auth/acl#Control>.
`);
