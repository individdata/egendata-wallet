import { egendataPrefixTurtle } from './egendata';
import { putFile } from './solid';

export type InboundDataRequest = {
  id: string,
  requestorWebId: string,
  providerWebId: string,
  documentType: string,
  purpose: string,
  returnUrl: string,
};
const inboundDataRequestUrl = ((userPodUrl: string, id: string) => `${userPodUrl}oak/requests/request-${id}`);
const inboundDataRequestTurtle = ((dataRequest: InboundDataRequest) => `
${egendataPrefixTurtle}
<> a <egendata:InboundDataRequest> ;
  <egendata:id> "${dataRequest.id}" ;
  <egendata:requestorWebId> "${dataRequest.requestorWebId}" ;
  <egendata:providerWebId> "${dataRequest.providerWebId}" ;
  <egendata:documentType> "${dataRequest.documentType}" ;
  <egendata:purpose> "${dataRequest.purpose}" ;
  <egendata:returnUrl> "${dataRequest.returnUrl}" .`);

export async function storeInboundRequest(userPod: string, request: InboundDataRequest) {
  const requestUrl = inboundDataRequestUrl(userPod, request.id);
  const requestData = inboundDataRequestTurtle(request);
  await putFile(
    requestUrl,
    { body: requestData },
    'text/turtle',
  );
}

export type OutboundDataRequest = {
  id: string,
  documentType: string,
  dataSubjectIdentifier: string,
};

const outboundDataRequestUrl = ((userPodUrl: string, id: string) => `${userPodUrl}/oak/fetch-requests/fetch-request-${id}`);
const dataLocationUrl = ((userPodUrl: string, id: string) => `${userPodUrl}/oak/responses/response-${id}.ttl`);
const outboundDataRequestTurtle = ((id: string, documentType: string, dataSubjectIdentifier: string, dataLocation:string) => `
${egendataPrefixTurtle}
<> a <egendata:OutboundDataRequest> ;
  <egendata:id> "${id}" ;
  <egendata:documentType> "${documentType}" ;
  <egendata:dataSubjectIdentifier> "${dataSubjectIdentifier}" ;
  <egendata:dataLocation> "${dataLocation}" .`);

export async function storeOutboundRequest(userPod: string, request: OutboundDataRequest) {
  const requestUrl = outboundDataRequestUrl(userPod, request.id);
  const locationUrl = dataLocationUrl(userPod, request.id);
  const requestData = outboundDataRequestTurtle(request.id, request.documentType, request.dataSubjectIdentifier, locationUrl);
  await putFile(
    requestUrl,
    { body: requestData },
    'text/turtle',
  );
}

const outboundDataRequestLinkUrl = ((sourcePodUrl: string, id: string) => `${sourcePodUrl}/oak/inbox/request-${id}`);
const outboundDataRequestLinkTurtle = ((requestUrl: string) => `
${egendataPrefixTurtle}
<> <egendata:OutboundDataRequest> <${requestUrl}>.
`);

export async function storeOutboundRequestLink(id: string, userPod: string, sourcePod: string) {
  const requestUrl = outboundDataRequestUrl(userPod, id);
  const requestLinkUrl = outboundDataRequestLinkUrl(sourcePod, id);
  const requestLinkData = outboundDataRequestLinkTurtle(requestUrl);
  await putFile(
    requestLinkUrl,
    { body: requestLinkData },
    'text/turtle',
  );
}

const inboundDataResponseUrl = ((userPodUrl: string, id: string) => `${userPodUrl}/oak/feetch-responses/fetch-response-${id}`);
const inboundDataResponseTurtle = (() => '');

export async function storeInboundDataResponse(id: string, userPod: string) {
  const responseUrl = inboundDataResponseUrl(userPod, id);
  const responseData = inboundDataResponseTurtle();
  await putFile(
    responseUrl,
    { body: responseData },
    'text/turtle',
  );
}

const inboundDataResponseAclUrl = ((userPodUrl: string, id: string) => `${userPodUrl}/oak/responses/response-${id}`);
const inboundDataResponseAclTurtle = ((userPodUrl: string, id: string, userWebId: string, sourceWebId: string) => `
<#user> a <http://www.w3.org/ns/auth/acl#Authorization>;
    <http://www.w3.org/ns/auth/acl#accessTo> <${userPodUrl}/oak/requests/request-${id}>;
    <http://www.w3.org/ns/auth/acl#agent> <mailto:user@example.com>, <${sourceWebId}>;
    <http://www.w3.org/ns/auth/acl#mode> <http://www.w3.org/ns/auth/acl#Write>, <http://www.w3.org/ns/auth/acl#Append>.
<#owner> a <http://www.w3.org/ns/auth/acl#Authorization>;
    <http://www.w3.org/ns/auth/acl#accessTo> <${userPodUrl}/oak/requests/request-${id}>;
    <http://www.w3.org/ns/auth/acl#agent> <mailto:sink@example.com>, <${userWebId}/sink/profile/card#me>;
    <http://www.w3.org/ns/auth/acl#mode> <http://www.w3.org/ns/auth/acl#Write>, <http://www.w3.org/ns/auth/acl#Read>, <http://www.w3.org/ns/auth/acl#Control>.
`);

export async function storeInboundDataResponseAcl(id: string, userPod: string, userWebId: string, sourceWebId: string) {
  const responseAclUrl = inboundDataResponseAclUrl(userPod, id);
  const responseAclData = inboundDataResponseAclTurtle(userPod, id, userWebId, sourceWebId);
  await putFile(
    responseAclUrl,
    { body: responseAclData },
    'text/turtle',
  );
}

export async function createOakContainers(userPod: string) {
  const urls = [`${userPod}oak/inbox/`, `${userPod}oak/requests/`, `${userPod}oak/responses/`];
  const promises = urls.map(async (url) => {
    await putFile(
      url,
      { body: '' },
      'text/turtle',
    );
  });
  return Promise.all(promises);
}
