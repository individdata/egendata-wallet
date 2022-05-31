import {
  getDatetime, getSolidDataset, getStringNoLocale, getThing, Thing,
} from '@inrupt/solid-client';
import {
  dcPrefixTurtle, egendataPrefixTurtle, egendataSchema, providerRequestsPath,
} from '../../util/oak/egendata';
import {
  aclTurtle, storeTurtle,
} from '../../util/oak/templates';
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

export type ProviderRequest = {
  id: string,
  created: Date, // iso8601 timestamp
  documentType: string,
  dataSubjectIdentifier: string,
  dataLocation: string,
  notificationInbox: string,
};

const requestBody = ((request: ProviderRequest) => `
${egendataPrefixTurtle}
${dcPrefixTurtle}
<> a egendata:OutboundDataRequest ;
  dcterm:created "${new Date().toISOString}";
  egendata:id "${request.id}" ;
  egendata:documentType "${request.documentType}" ;
  egendata:dataSubjectIdentifier "${request.dataSubjectIdentifier}" ;
  egendata:dataLocation "${request.dataLocation}" ;
  egendata:notificationInbox "${request.notificationInbox}" .`);

async function fetchResource(resourceUrl: string): Promise<NamedResource<ProviderRequest>> {
  const ds = await getSolidDataset(resourceUrl, { fetch });
  const thing = getThing(ds, resourceUrl) as Thing;
  const id = getStringNoLocale(thing, `${egendataSchema}id`) ?? '';
  const created = getDatetime(thing, 'http://purl.org/dc/terms/created') ?? new Date(); // TODO: how to handle non existent timestamps?
  const documentType = getStringNoLocale(thing, `${egendataSchema}documentType`) ?? '';
  const dataSubjectIdentifier = getStringNoLocale(thing, `${egendataSchema}purpose`) ?? '';
  const dataLocation = getStringNoLocale(thing, `${egendataSchema}returnUrl`) ?? '';
  const notificationInbox = getStringNoLocale(thing, `${egendataSchema}purpose`) ?? '';

  return {
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

const createRequest: CreateFunction<ProviderRequest> = async (namedResource: NamedOptionalResource<ProviderRequest>) => {
  await Promise.all([
    storeTurtle(namedResource.resourceUrl, namedResource.resource ? requestBody(namedResource.resource) : ''),
    (namedResource.acl) ? storeTurtle(`${namedResource.resourceUrl}.acl`, aclTurtle(namedResource.resourceUrl, namedResource.acl)) : undefined,
  //    storeOutboundRequestLink(id, userPod, providerPodStorage),
  ]);
};

const fetchRequest: FetchFunction<ProviderRequest> = async (resourceUrl: ResourcePath) => (await fetchResource(resourceUrl)).resource;

const contentRequest: ContentFunction<ProviderRequest> = async (containereUrl: ContainerPath) => containerContent<ProviderRequest>(
  containereUrl,
  fetchResource,
);

export const providerRequestThunks = createContainerThunks<ProviderRequest>(providerRequestsPath, {
  create: createRequest,
  fetch: fetchRequest,
  getContent: contentRequest,
});

const slice = createContainerSlice<ProviderRequest>({ containerURL: providerRequestsPath, thunks: providerRequestThunks });

const { reducer } = slice;
export default reducer;
