/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
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

export type ProviderConsent = {
  created: Date, // iso8601 timestamp
  requestId: string,
  providerRequest: string,
  providerWebId: string,
  consentDocument: string,
};

const requestBody = ((request: ProviderConsent) => `
${egendataPrefixTurtle}
<> a egendata:ProviderConsent ;
  <http://purl.org/dc/terms/created> "${request.created}" ;
  egendata:requestId "${request.requestId}" ;
  egendata:providerRequest "${request.providerRequest}" ;
  egendata:providerWebId "${request.providerWebId}" ;
  egendata:consentDocument "${request.consentDocument}" .`);

async function fetchResource(resourceUrl: string): Promise<NamedResource<ProviderConsent>> {
  const ds = await getSolidDataset(resourceUrl, { fetch });
  const thing = getThing(ds, resourceUrl) as Thing;
  const created = getDatetime(thing, 'http://purl.org/dc/terms/created') ?? new Date(); // TODO: how to handle non existent timestamps?
  const requestId = getStringNoLocale(thing, `${egendataSchema}requestId`) ?? '';
  const providerRequest = getStringNoLocale(thing, `${egendataSchema}providerRequest`) ?? '';
  const providerWebId = getStringNoLocale(thing, `${egendataSchema}providerWebId`) ?? '';
  const consentDocument = getStringNoLocale(thing, `${egendataSchema}consentDocument`) ?? '';

  return {
    resourceUrl,
    resource: {
      created,
      requestId,
      providerRequest,
      providerWebId,
      consentDocument,
    },
  };
}

const createRequest: CreateFunction<ProviderConsent> = async (namedResource: NamedOptionalResource<ProviderConsent>) => {
  await Promise.all([
    storeTurtle(namedResource.resourceUrl, namedResource.resource ? requestBody(namedResource.resource) : ''),
  ]);
  return namedResource;
};

const fetchRequest: FetchFunction<ProviderConsent> = async (resourceUrl: ResourcePath) => (await fetchResource(resourceUrl)).resource;

const contentRequest: ContentFunction<ProviderConsent> = async (
  containereUrl: ContainerPath,
) => containerContent<ProviderConsent>(containereUrl, fetchResource);

export const providerConsentThunks = createContainerThunks<ProviderConsent>(subjectRequestsPath, {
  create: createRequest,
  fetch: fetchRequest,
  getContent: contentRequest,
});

const slice = createContainerSlice<ProviderConsent>(
  {
    containerURL: subjectRequestsPath,
    thunks: providerConsentThunks,
    reducers: {
      reset: (state) => {
        state = { status: 'idle', items: {}, error: {} };
      },
    },
  },
);

const { reducer } = slice;
export default reducer;
