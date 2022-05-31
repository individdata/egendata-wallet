import {
  getDatetime,
  getSolidDataset, getStringNoLocale, getThing, Thing,
} from '@inrupt/solid-client';
import {
  fetch,
} from '@inrupt/solid-client-authn-browser';
import { egendataPrefixTurtle, egendataSchema, subjectRequestsPath } from '../../util/oak/egendata';
import { storeTurtle } from '../../util/oak/templates';
import {
  containerContent,
  ContainerPath,
  ContentFunction,
  createContainerSlice,
  createContainerThunks,
  FetchFunction,
  NamedResource,
  ResourcePath,
  CreateFunction,
  NamedOptionalResource,
} from '../../util/thunkCreator';

export type ConsumerConsent = {
  created: Date, // iso8601 timestamp
  requestId: string,
  sharedData: string,
  consumerWebId: string,
  consentDocument: string,
};

const requestBody = ((request: ConsumerConsent) => `
${egendataPrefixTurtle}
<> a egendata:InboundDataResponse ;
  <http://purl.org/dc/terms/created> "${request.created}" ;
  egendata:requestId "${request.requestId}" ;
  egendata:sharedData "${request.sharedData}" ;
  egendata:consumerWebId "${request.consumerWebId}" ;
  egendata:consentDocument "${request.consentDocument}" .`);

async function fetchResource(resourceUrl: string): Promise<NamedResource<ConsumerConsent>> {
  const ds = await getSolidDataset(resourceUrl, { fetch });
  const thing = getThing(ds, resourceUrl) as Thing;
  const created = getDatetime(thing, 'http://purl.org/dc/terms/created') ?? new Date(); // TODO: how to handle non existent timestamps?
  const requestId = getStringNoLocale(thing, `${egendataSchema}requestId`) ?? '';
  const sharedData = getStringNoLocale(thing, `${egendataSchema}sharedData`) ?? '';
  const consumerWebId = getStringNoLocale(thing, `${egendataSchema}consumerWebId`) ?? '';
  const consentDocument = getStringNoLocale(thing, `${egendataSchema}consentDocument`) ?? '';

  return {
    resourceUrl,
    resource: {
      created,
      requestId,
      sharedData,
      consumerWebId,
      consentDocument,
    },
  };
}

const createRequest: CreateFunction<ConsumerConsent> = async (namedResource: NamedOptionalResource<ConsumerConsent>) => {
  await Promise.all([
    storeTurtle(namedResource.resourceUrl, namedResource.resource ? requestBody(namedResource.resource) : ''),
  ]);
};

const fetchRequest: FetchFunction<ConsumerConsent> = async (resourceUrl: ResourcePath) => (await fetchResource(resourceUrl)).resource;

const contentRequest: ContentFunction<ConsumerConsent> = async (
  containereUrl: ContainerPath,
) => containerContent<ConsumerConsent>(containereUrl, fetchResource);

export const consumerConsentThunks = createContainerThunks<ConsumerConsent>(subjectRequestsPath, {
  create: createRequest,
  fetch: fetchRequest,
  getContent: contentRequest,
});

const slice = createContainerSlice<ConsumerConsent>({ containerURL: subjectRequestsPath, thunks: consumerConsentThunks });

const { reducer } = slice;
export default reducer;
