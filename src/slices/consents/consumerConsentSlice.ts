import {
  getDatetime,
  getSolidDataset, getStringNoLocale, getThing, Thing,
} from '@inrupt/solid-client';
import {
  fetch,
} from '@inrupt/solid-client-authn-browser';
// eslint-disable-next-line import/no-cycle
import {
  dcPrefixTurtle,
  egendataPrefixTurtle,
  egendataSchema,
  consumerConsentsPath,
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

export type ConsumerConsent = {
  created: string, // iso8601 timestamp
  requestId: string,
  sharedData: string,
  consumerWebId: string,
  consentDocument: string,
};

const requestBody = ((request: ConsumerConsent) => `
${egendataPrefixTurtle}
${dcPrefixTurtle}
${xsdPrefixTurtle}
<> a egendata:InboundDataResponse ;
  dcterm:created "${request.created}"^^xsd:dateTime ;
  egendata:requestId "${request.requestId}" ;
  egendata:sharedData "${request.sharedData}" ;
  egendata:consumerWebId "${request.consumerWebId}" ;
  egendata:consentDocument "${request.consentDocument}" .`);

const createFunction: CreateFunction<ConsumerConsent> = async (namedResource: NamedOptionalResource<ConsumerConsent>) => {
  await Promise.all([
    storeTurtle(namedResource.resourceUrl, namedResource.resource ? requestBody(namedResource.resource) : ''),
  ]);
  return namedResource;
};

async function fetchFunction(resourceUrl: string): Promise<NamedResource<ConsumerConsent>> {
  const ds = await getSolidDataset(resourceUrl, { fetch });
  const thing = getThing(ds, resourceUrl) as Thing;
  const created = getDatetime(thing, 'http://purl.org/dc/terms/created') ?? new Date(); // TODO: how to handle non existent timestamps?
  const requestId = getStringNoLocale(thing, `${egendataSchema}requestId`) ?? '';
  const sharedData = getStringNoLocale(thing, `${egendataSchema}sharedData`) ?? '';
  const consumerWebId = getStringNoLocale(thing, `${egendataSchema}consumerWebId`) ?? '';
  const consentDocument = getStringNoLocale(thing, `${egendataSchema}consentDocument`) ?? '';

  return {
    resourceId: requestId,
    resourceUrl,
    resource: {
      created: created.toISOString(),
      requestId,
      sharedData,
      consumerWebId,
      consentDocument,
    },
  };
}

export const consumerConsentThunks = createContainerThunks<ConsumerConsent>(consumerConsentsPath, {
  createFunction,
  fetchFunction,
});

const slice = createContainerSlice<ConsumerConsent>({ name: 'consumerConsentSlice', containerURL: consumerConsentsPath, thunks: consumerConsentThunks });

const { reducer } = slice;
export default reducer;
