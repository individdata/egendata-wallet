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

const outboundDataRequestUrl = ((userPodUrl: string, id: string) => `${userPodUrl}oak/consents/request-${id}`);
const dataLocationUrl = ((userPodUrl: string, id: string) => `${userPodUrl}oak/responses/response-${id}`);
const outboundDataRequestTurtle = ((id: string, documentType: string, dataSubjectIdentifier: string, dataLocation:string, notificationInbox: string) => `
${egendataPrefixTurtle}
<> a <egendata:OutboundDataRequest> ;
  <egendata:id> "${id}" ;
  <egendata:documentType> "${documentType}" ;
  <egendata:dataSubjectIdentifier> "${dataSubjectIdentifier}" ;
  <egendata:dataLocation> "${dataLocation}" ;
  <egendata:notificationInbox> "${notificationInbox}" .`);

export async function storeOutboundRequest(userPod: string, request: OutboundDataRequest) {
  const requestUrl = outboundDataRequestUrl(userPod, request.id);
  const locationUrl = dataLocationUrl(userPod, request.id);
  const notificationInbox = `${userPod}oak/inbox/`;
  const requestData = outboundDataRequestTurtle(request.id, request.documentType, request.dataSubjectIdentifier, locationUrl, notificationInbox);
  await putFile(
    requestUrl,
    { body: requestData },
    'text/turtle',
  );
}

const outboundDataRequestAclUrl = ((userPodUrl: string, id: string) => `${userPodUrl}oak/consents/request-${id}.acl`);
const outboundDataRequestAclTurtle = ((userPodUrl: string, id: string, userWebId: string, sourceWebId: string) => `
<#source> a <http://www.w3.org/ns/auth/acl#Authorization>;
    <http://www.w3.org/ns/auth/acl#accessTo> <${userPodUrl}oak/consents/request-${id}>;
    <http://www.w3.org/ns/auth/acl#agent> <${sourceWebId}>;
    <http://www.w3.org/ns/auth/acl#mode> <http://www.w3.org/ns/auth/acl#Read>.
<#owner> a <http://www.w3.org/ns/auth/acl#Authorization>;
    <http://www.w3.org/ns/auth/acl#accessTo> <${userPodUrl}oak/consents/request-${id}>;
    <http://www.w3.org/ns/auth/acl#agent> <mailto:sink@example.com>, <${userWebId}>;
    <http://www.w3.org/ns/auth/acl#mode> <http://www.w3.org/ns/auth/acl#Write>, <http://www.w3.org/ns/auth/acl#Read>, <http://www.w3.org/ns/auth/acl#Control>.
`);

export async function storeOutboundDataRequestAcl(id: string, userPod: string, userWebId: string, sourceWebId: string) {
  const requestAclUrl = outboundDataRequestAclUrl(userPod, id);
  const requestAclData = outboundDataRequestAclTurtle(userPod, id, userWebId, sourceWebId);
  await putFile(
    requestAclUrl,
    { body: requestAclData },
    'text/turtle',
  );
}

const outboundDataRequestLinkUrl = ((sourcePodUrl: string, id: string) => `${sourcePodUrl}oak/inbox/request-${id}`);
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

const inboundDataResponseUrl = ((userPodUrl: string, id: string) => `${userPodUrl}oak/responses/response-${id}`);
const emptyDataResponseTurtle = (() => '');

export async function createInboundDataResponse(id: string, userPod: string) {
  const responseUrl = inboundDataResponseUrl(userPod, id);
  const responseData = emptyDataResponseTurtle();
  await putFile(
    responseUrl,
    { body: responseData },
    'text/turtle',
  );
}

const outboundDataResponseLinkUrl = ((sinkPod: string, id: string) => `${sinkPod}oak/inbox/response-link-${id}`);
const outboundDataResponseLinkTurtle = ((responseUrl: string) => `
${egendataPrefixTurtle}
<> <egendata:OutboundDataResponse> <${responseUrl}>.
`);
export async function storeOutboundResponseLink(id: string, userPod: string, sinkPod: string) {
  const responseUrl = inboundDataResponseUrl(userPod, id);
  const responseLinkUrl = outboundDataResponseLinkUrl(sinkPod, id);
  const responseLinkData = outboundDataResponseLinkTurtle(responseUrl);
  await putFile(
    responseLinkUrl,
    { body: responseLinkData },
    'text/turtle',
  );
}

const inboundDataResponseAclUrl = ((userPodUrl: string, id: string) => `${userPodUrl}oak/responses/response-${id}.acl`);
const inboundDataResponseAclTurtle = ((userPodUrl: string, id: string, userWebId: string, sourceWebId: string) => `
<#source> a <http://www.w3.org/ns/auth/acl#Authorization>;
    <http://www.w3.org/ns/auth/acl#accessTo> <${userPodUrl}oak/responses/response-${id}>;
    <http://www.w3.org/ns/auth/acl#agent> <${sourceWebId}>;
    <http://www.w3.org/ns/auth/acl#mode> <http://www.w3.org/ns/auth/acl#Write>, <http://www.w3.org/ns/auth/acl#Append>.
<#owner> a <http://www.w3.org/ns/auth/acl#Authorization>;
    <http://www.w3.org/ns/auth/acl#accessTo> <${userPodUrl}oak/responses/response-${id}>;
    <http://www.w3.org/ns/auth/acl#agent> <mailto:sink@example.com>, <${userWebId}>;
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

const outboundDataResponseAclTurtle = ((userPod: string, id: string, userWebId: string, sinkWebId: string) => `
# ACL resource for the oak inbox
@prefix acl: <http://www.w3.org/ns/auth/acl#>.

# The inbox can be written to by the public, but not read.
<#sink>
    a acl:Authorization;
    acl:accessTo <${userPod}oak/responses/response-${id}>;
    acl:agent <${sinkWebId}>;
    acl:mode acl:Read.

# The owner has full access to the inbox
<#owner>
    a acl:Authorization;
    acl:agent <${userWebId}>;
    acl:accessTo <${userPod}oak/responses/response-${id}>;
    acl:mode acl:Read, acl:Write, acl:Control.
`);

export async function storeOutboundResponseAcl(id: string, userPod: string, userWebId: string, sinkWebId: string) {
  const responseAclUrl = inboundDataResponseAclUrl(userPod, id);
  const responseAclData = outboundDataResponseAclTurtle(userPod, id, userWebId, sinkWebId);
  await putFile(
    responseAclUrl,
    { body: responseAclData },
    'text/turtle',
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inboxAclTurtle = ((userWebId: string, userPod: string) => `
# ACL resource for the oak inbox
@prefix acl: <http://www.w3.org/ns/auth/acl#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.

# The inbox can be written to by the public, but not read.
<#public>
    a acl:Authorization;
    acl:agentClass foaf:Agent;
    acl:accessTo <${userPod}oak/inbox/>;
    acl:default <${userPod}oak/inbox/>;
    acl:mode acl:Write, acl:Append.

# The owner has full access to the inbox
<#owner>
    a acl:Authorization;
    acl:agent <${userWebId}>;
    acl:accessTo <${userPod}oak/inbox/>;
    acl:default <${userPod}oak/inbox/>;
    acl:mode acl:Read, acl:Write, acl:Control.
`);

export async function createOakContainers(userWebId: string, userPod: string) {
  const resources = [
    { url: `${userPod}oak/requests/`, body: '' },
    { url: `${userPod}oak/consents/`, body: '' },
    { url: `${userPod}oak/responses/`, body: '' },
    { url: `${userPod}oak/inbox/`, body: '' },
    { url: `${userPod}oak/inbox/.acl`, body: inboxAclTurtle(userWebId, userPod) },
  ];
  const promises = resources.map(async (resource) => {
    await putFile(
      resource.url,
      { body: resource.body },
      'text/turtle',
    );
  });
  return Promise.all(promises);
}
