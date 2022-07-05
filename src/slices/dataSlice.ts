import {
  getDatetime,
  getSolidDataset, getStringNoLocale, getThing, Thing,
} from '@inrupt/solid-client';
import {
  fetch,
} from '@inrupt/solid-client-authn-browser';
// eslint-disable-next-line import/no-cycle
import {
  egendataPrefixTurtle,
  egendataSchema,
  dataPath,
} from '../util/oak/egendata';
// eslint-disable-next-line import/no-cycle
import { aclTurtle, storeTurtle } from '../util/oak/templates';
import {
  createContainerSlice,
  createContainerThunks,
  NamedResource,
  CreateFunction,
  NamedOptionalResource,
} from '../util/thunkCreator';

export type Data = {
  created: string, // iso8601 timestamp
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

const createFunction: CreateFunction<Data> = async (namedResource: NamedOptionalResource<Data>) => {
  await Promise.all([
    storeTurtle(namedResource.resourceUrl, namedResource.resource ? requestBody(namedResource.resource) : ''),
    (namedResource.acl) ? storeTurtle(`${namedResource.resourceUrl}.acl`, aclTurtle(namedResource.resourceUrl, namedResource.acl)) : undefined,
  ]);
  return namedResource;
};

async function fetchFunction(resourceUrl: string): Promise<NamedResource<Data>> {
  const ds = await getSolidDataset(resourceUrl, { fetch });
  const thing = getThing(ds, resourceUrl) as Thing;
  const created = getDatetime(thing, 'http://purl.org/dc/terms/created') ?? new Date(); // TODO: how to handle non existent timestamps?
  const requestId = getStringNoLocale(thing, `${egendataSchema}requestId`) ?? '';
  const providerWebId = getStringNoLocale(thing, `${egendataSchema}providerWebId`) ?? '';
  const document = getStringNoLocale(thing, `${egendataSchema}document`) ?? '';

  return {
    resourceId: requestId,
    resourceUrl,
    resource: {
      created: created.toISOString(),
      requestId,
      providerWebId,
      document,
    },
  };
}

export const dataThunks = createContainerThunks<Data>(dataPath, {
  createFunction,
  fetchFunction,
});

const slice = createContainerSlice<Data>({ name: 'dataSlice', containerURL: dataPath, thunks: dataThunks });

const { reducer } = slice;
export default reducer;
