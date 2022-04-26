import { postFile } from '../oak/solid';
import { v4 as uuidv4 } from 'uuid';

const pr = '192210208484';
const sourceUuid = '11111111';
const providerUuid = '22222222';

const documentType = 'http://pod.egendata.se/schemas/core/UnemploymentCertificate';
const baseUrl = `https://oak-pod-provider-oak-develop.test.services.jtech.se`;

const inboundDataRequestUrl = ((userPodUrl: string, id: string) => `${baseUrl}/${userPodUrl}/oak/requests/request-${id}`);

const inboundDataRequestTurtle = ((sourceUuid: string, providerUuid: string) => `
<> a <egendata:InboundDataRequest> ;
  <egendata:requestorWebId> "http://idp.egendata.se/${sourceUuid}/profile/card#me" ;
  <egendata:providerWebId> "http://idp.egendata.se/${providerUuid}/profile/card#me" ;
  <egendata:documentType> "http://pod.egendata.se/schemas/core/UnemploymentCertificate" ;
  <egendata:purpose> "A legal reason" ;
  <egendata:returnUrl> "http://claim.bnp.com/returnHere" .
`);

const inboundDataRequestLinkTurtle = ((userPodUrl: string, id: string) => `
<> <https://oak.se/requestedData> <${userPodUrl}/oak/inbox/request-${id}>.
`);

export async function createRequest() {
    const id = uuidv4();
    console.log('id==', id);
    const request = postFile(inboundDataRequestUrl(pr, id), {body: inboundDataRequestTurtle(sourceUuid, providerUuid)});
}
