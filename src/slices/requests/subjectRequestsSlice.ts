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

export type SubjectRequest = {
  id: string,
  created: string, // iso8601 timestamp
  requestorWebId: string,
  providerWebId: string,
  documentType: string,
  purpose: string,
  returnUrl: string,
};

const requestBody = ((request: SubjectRequest | undefined) => (request ? `
${egendataPrefixTurtle}
<> a egendata:InboundDataRequest ;
  egendata:id "${request.id}" ;
  egendata:requestorWebId "${request.requestorWebId}" ;
  egendata:providerWebId "${request.providerWebId}" ;
  egendata:documentType "${request.documentType}" ;
  egendata:purpose "${request.purpose}" ;
  egendata:returnUrl "${request.returnUrl}" .`
  : '')
);

async function fetchResource(resourceUrl: string): Promise<NamedResource<SubjectRequest>> {
  const ds = await getSolidDataset(resourceUrl, { fetch });
  const thing = getThing(ds, resourceUrl) as Thing;
  const id = getStringNoLocale(thing, `${egendataSchema}id`) ?? '';
  const now = getDatetime(thing, 'http://purl.org/dc/terms/created') ?? new Date(); // TODO: how to handle non existent timestamps?
  const requestorWebId = getStringNoLocale(thing, `${egendataSchema}requestorWebId`) ?? '';
  const providerWebId = getStringNoLocale(thing, `${egendataSchema}providerWebId`) ?? '';
  const documentType = getStringNoLocale(thing, `${egendataSchema}documentType`) ?? '';
  const purpose = getStringNoLocale(thing, `${egendataSchema}purpose`) ?? '';
  const returnUrl = getStringNoLocale(thing, `${egendataSchema}returnUrl`) ?? '';

  return {
    resourceUrl,
    resource: {
      id,
      created: now.toISOString(),
      requestorWebId,
      providerWebId,
      documentType,
      purpose,
      returnUrl,
    },
  };
}

const createRequest: CreateFunction<SubjectRequest> = async (namedResource: NamedOptionalResource<SubjectRequest>) => {
  console.log(`createRequest: ${namedResource.resourceUrl}`);
  storeTurtle(namedResource.resourceUrl, requestBody(namedResource.resource));
};

const fetchRequest: FetchFunction<SubjectRequest> = async (resourceUrl: ResourcePath) => (await fetchResource(resourceUrl)).resource;

const contentRequest: ContentFunction<SubjectRequest> = async (containereUrl: ContainerPath) => containerContent<SubjectRequest>(containereUrl, fetchResource);

export const subjectRequestThunks = createContainerThunks<SubjectRequest>(subjectRequestsPath, {
  create: createRequest,
  fetch: fetchRequest,
  getContent: contentRequest,
});

const slice = createContainerSlice<SubjectRequest>({ containerURL: subjectRequestsPath, thunks: subjectRequestThunks });

const { reducer } = slice;
export default reducer;
