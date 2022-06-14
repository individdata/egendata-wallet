import {
  getSolidDataset, getStringNoLocale, getThing, Thing,
} from '@inrupt/solid-client';
import {
  fetch,
} from '@inrupt/solid-client-authn-browser';
import {
  dcPrefixTurtle, egendataPrefixTurtle, egendataSchema, providerRequestsPath,
} from '../../util/oak/egendata';
import {
  aclTurtle, storeTurtle,
} from '../../util/oak/templates';
import {
  createContainerSlice,
  createContainerThunks,
  NamedResource,
  CreateFunction,
  NamedOptionalResource,
} from '../../util/thunkCreator';

export type ProviderRequest = {
  id: string,
  created: string, // iso8601 timestamp
  documentType: string,
  dataSubjectIdentifier: string,
  dataLocation: string,
  notificationInbox: string,
};

const requestBody = ((request: ProviderRequest) => `
${egendataPrefixTurtle}
${dcPrefixTurtle}
<> a egendata:OutboundDataRequest ;
  dcterm:created "${(new Date()).toISOString()}";
  egendata:id "${request.id}" ;
  egendata:documentType "${request.documentType}" ;
  egendata:dataSubjectIdentifier "${request.dataSubjectIdentifier}" ;
  egendata:dataLocation "${request.dataLocation}" ;
  egendata:notificationInbox "${request.notificationInbox}" .`);

const createFunction: CreateFunction<ProviderRequest> = async (namedResource: NamedOptionalResource<ProviderRequest>) => {
  await Promise.all([
    storeTurtle(namedResource.resourceUrl, namedResource.resource ? requestBody(namedResource.resource) : ''),
    (namedResource.acl) ? storeTurtle(`${namedResource.resourceUrl}.acl`, aclTurtle(namedResource.resourceUrl, namedResource.acl)) : undefined,
  ]);
  return namedResource;
};

async function fetchFunction(resourceUrl: string): Promise<NamedResource<ProviderRequest>> {
  const ds = await getSolidDataset(resourceUrl, { fetch });
  const thing = getThing(ds, resourceUrl) as Thing;
  const id = getStringNoLocale(thing, `${egendataSchema}id`) ?? '';
  const created = getStringNoLocale(thing, 'http://purl.org/dc/terms/created') ?? (new Date()).toISOString(); // TODO: how to handle non existent timestamps?
  const documentType = getStringNoLocale(thing, `${egendataSchema}documentType`) ?? '';
  const dataSubjectIdentifier = getStringNoLocale(thing, `${egendataSchema}purpose`) ?? '';
  const dataLocation = getStringNoLocale(thing, `${egendataSchema}returnUrl`) ?? '';
  const notificationInbox = getStringNoLocale(thing, `${egendataSchema}purpose`) ?? '';

  return {
    resourceId: id,
    resourceUrl,
    resource: {
      id,
      created,
      documentType,
      dataSubjectIdentifier,
      dataLocation,
      notificationInbox,
    },
  };
}

export const providerRequestThunks = createContainerThunks<ProviderRequest>(providerRequestsPath, {
  createFunction,
  fetchFunction,
});

const slice = createContainerSlice<ProviderRequest>({ name: 'providerRequestSlice', containerURL: providerRequestsPath, thunks: providerRequestThunks });

const { reducer } = slice;
export default reducer;
