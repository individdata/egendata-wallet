/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import {
  getDatetime,
  getSolidDataset, getStringNoLocale, getThing, getUrl, Thing,
} from '@inrupt/solid-client';
import {
  fetch,
} from '@inrupt/solid-client-authn-browser';
// eslint-disable-next-line import/no-cycle
import {
  dcPrefixTurtle,
  egendataPrefixTurtle,
  egendataSchema,
  providerConsentsPath,
  xsdPrefixTurtle,
} from '../../util/oak/egendata';
// eslint-disable-next-line import/no-cycle
import { storeTurtle } from '../../util/oak/templates';
import {
  createContainerSlice,
  createContainerThunks,
  NamedResource,
  CreateFunction,
  NamedOptionalResource,
} from '../../util/thunkCreator';

export type ProviderConsent = {
  created: string, // iso8601 timestamp
  requestId: string,
  providerRequest: string,
  providerWebId: string,
  consentDocument: string,
};

const requestBody = ((request: ProviderConsent) => `
${egendataPrefixTurtle}
${dcPrefixTurtle}
${xsdPrefixTurtle}
<> a egendata:ProviderConsent ;
dcterm:created "${request.created}"^^xsd:dateTime ;
egendata:requestId "${request.requestId}" ;
  egendata:providerRequest <${request.providerRequest}> ;
  egendata:providerWebId "${request.providerWebId}" ;
  egendata:consentDocument "${request.consentDocument}" .`);

const createFunction: CreateFunction<ProviderConsent> = async (namedResource: NamedOptionalResource<ProviderConsent>) => {
  await Promise.all([
    storeTurtle(namedResource.resourceUrl, namedResource.resource ? requestBody(namedResource.resource) : ''),
  ]);
  return namedResource;
};

async function fetchFunction(resourceUrl: string): Promise<NamedResource<ProviderConsent>> {
  const ds = await getSolidDataset(resourceUrl, { fetch });
  const thing = getThing(ds, resourceUrl) as Thing;
  const created = getDatetime(thing, 'http://purl.org/dc/terms/created') ?? new Date(); // TODO: how to handle non existent timestamps?
  const requestId = getStringNoLocale(thing, `${egendataSchema}requestId`) ?? '';
  const providerRequest = getStringNoLocale(thing, `${egendataSchema}providerRequest`) ?? '';
  const providerWebId = getUrl(thing, `${egendataSchema}providerWebId`) ?? '';
  const consentDocument = getStringNoLocale(thing, `${egendataSchema}consentDocument`) ?? '';

  return {
    resourceId: requestId,
    resourceUrl,
    resource: {
      created: created.toISOString(),
      requestId,
      providerRequest,
      providerWebId,
      consentDocument,
    },
  };
}

export const providerConsentThunks = createContainerThunks<ProviderConsent>(providerConsentsPath, {
  createFunction,
  fetchFunction,
});

const slice = createContainerSlice<ProviderConsent>(
  {
    name: 'providerConsentSlice',
    containerURL: providerConsentsPath,
    thunks: providerConsentThunks,
    reducers: {
      reset: (state) => {
        state = { status: 'idle', items: {}, lookup: {} };
      },
    },
  },
);

const { reducer } = slice;
export default reducer;
