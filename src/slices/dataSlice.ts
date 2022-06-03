import {
  getDatetime,
  getSolidDataset, getStringNoLocale, getThing, Thing,
} from '@inrupt/solid-client';
import {
  fetch,
} from '@inrupt/solid-client-authn-browser';
import { egendataPrefixTurtle, egendataSchema, subjectRequestsPath } from '../util/oak/egendata';
import { aclTurtle, storeTurtle } from '../util/oak/templates';
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
} from '../util/thunkCreator';

export type Data = {
  created: Date, // iso8601 timestamp
  requestId: string,
  providerWebId: string,
  document: string,
};

const requestBody = ((request: Data) => `
${egendataPrefixTurtle}
<> a egendata:InboundDataResponse ;
  <http://purl.org/dc/terms/created> "${request.created}" ;
  egendata:requestId "${request.requestId}" ;
  egendata:providerWebId "${request.providerWebId}" ;
  egendata:document "${request.document}" .`
);

async function fetchResource(resourceUrl: string): Promise<NamedResource<Data>> {
  const ds = await getSolidDataset(resourceUrl, { fetch });
  const thing = getThing(ds, resourceUrl) as Thing;
  const created = getDatetime(thing, 'http://purl.org/dc/terms/created') ?? new Date(); // TODO: how to handle non existent timestamps?
  const requestId = getStringNoLocale(thing, `${egendataSchema}requestId`) ?? '';
  const providerWebId = getStringNoLocale(thing, `${egendataSchema}providerWebId`) ?? '';
  const document = getStringNoLocale(thing, `${egendataSchema}document`) ?? '';

  return {
    resourceUrl,
    resource: {
      created,
      requestId,
      providerWebId,
      document,
    },
  };
}

const createRequest: CreateFunction<Data> = async (namedResource: NamedOptionalResource<Data>) => {
  await Promise.all([
    storeTurtle(namedResource.resourceUrl, namedResource.resource ? requestBody(namedResource.resource) : ''),
    (namedResource.acl) ? storeTurtle(`${namedResource.resourceUrl}.acl`, aclTurtle(namedResource.resourceUrl, namedResource.acl)) : undefined,
  ]);
  return namedResource;
};

const fetchRequest: FetchFunction<Data> = async (resourceUrl: ResourcePath) => (await fetchResource(resourceUrl)).resource;

const contentRequest: ContentFunction<Data> = async (containereUrl: ContainerPath) => containerContent<Data>(containereUrl, fetchResource);

export const dataThunks = createContainerThunks<Data>(subjectRequestsPath, {
  create: createRequest,
  fetch: fetchRequest,
  getContent: contentRequest,
});

const slice = createContainerSlice<Data>({ containerURL: subjectRequestsPath, thunks: dataThunks });

const { reducer } = slice;
export default reducer;
