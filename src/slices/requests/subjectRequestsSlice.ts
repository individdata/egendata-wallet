/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import {
  getDatetime,
  getSolidDataset, getStringNoLocale, getThing, Thing,
} from '@inrupt/solid-client';
import {
  fetch,
} from '@inrupt/solid-client-authn-browser';
import { PayloadAction } from '@reduxjs/toolkit';
import { egendataPrefixTurtle, egendataSchema, subjectRequestsPath } from '../../util/oak/egendata';
import { aclTurtle, InboundDataRequest, storeTurtle } from '../../util/oak/templates';
import {
  createContainerSlice,
  createContainerThunks,
  NamedResource,
  CreateFunction,
  NamedOptionalResource,
  ResourceUrl,
} from '../../util/thunkCreator';

export type SubjectRequest = {
  id: string,
  created: string, // iso8601 timestamp
  requestorWebId: string,
  providerWebId: string,
  documentType: string,
  documentTitle: string,
  purpose: string,
  returnUrl: string,
};

export const subjectRequest = (userPod: string, userWebId: string, request: InboundDataRequest): NamedResource<SubjectRequest> => {
  const resourceUrl = userPod + subjectRequestsPath + request.id;
  return {
    resourceId: request.id,
    resourceUrl,
    resource: {
      id: request.id,
      created: new Date().toISOString(),
      documentType: request.documentType,
      documentTitle: request.documentTitle,
      requestorWebId: request.requestorWebId,
      providerWebId: request.providerWebId,
      purpose: request.purpose,
      returnUrl: request.returnUrl,
    },
    acl: [
      { label: 'owner', webId: userWebId, mode: ['Read', 'Write', 'Append', 'Control'] },
    ],
  };
};

const requestBody = ((request: SubjectRequest | undefined) => (request ? `
${egendataPrefixTurtle}
<> a egendata:InboundDataRequest ;
  egendata:id "${request.id}" ;
  egendata:requestorWebId "${request.requestorWebId}" ;
  egendata:providerWebId "${request.providerWebId}" ;
  egendata:documentType "${request.documentType}" ;
  egendata:documentTitle "${request.documentTitle}" ;
  egendata:purpose "${request.purpose}" ;
  egendata:returnUrl "${request.returnUrl}" .`
  : '')
);

const createFunction: CreateFunction<SubjectRequest> = async (namedResource: NamedOptionalResource<SubjectRequest>) => {
  console.log(`createFunction: ${namedResource.resourceUrl}`);
  Promise.all([
    storeTurtle(namedResource.resourceUrl, requestBody(namedResource.resource)),
    (namedResource.acl) ? storeTurtle(`${namedResource.resourceUrl}.acl`, aclTurtle(namedResource.resourceUrl, namedResource.acl)) : undefined,
  ]);
  return namedResource;
};

async function fetchFunction(resourceUrl: string): Promise<NamedResource<SubjectRequest>> {
  const ds = await getSolidDataset(resourceUrl, { fetch });
  const thing = getThing(ds, resourceUrl) as Thing;
  const id = getStringNoLocale(thing, `${egendataSchema}id`) ?? '';
  const created = getDatetime(thing, 'http://purl.org/dc/terms/created') ?? new Date(); // TODO: how to handle non existent timestamps?
  const requestorWebId = getStringNoLocale(thing, `${egendataSchema}requestorWebId`) ?? '';
  const providerWebId = getStringNoLocale(thing, `${egendataSchema}providerWebId`) ?? '';
  const documentType = getStringNoLocale(thing, `${egendataSchema}documentType`) ?? '';
  const documentTitle = getStringNoLocale(thing, `${egendataSchema}documentTitle`) ?? '';
  const purpose = getStringNoLocale(thing, `${egendataSchema}purpose`) ?? '';
  const returnUrl = getStringNoLocale(thing, `${egendataSchema}returnUrl`) ?? '';

  return {
    resourceId: id,
    resourceUrl,
    resource: {
      id,
      created: created.toISOString(),
      requestorWebId,
      providerWebId,
      documentType,
      documentTitle,
      purpose,
      returnUrl,
    },
  };
}

export const subjectRequestThunks = createContainerThunks<SubjectRequest>(
  subjectRequestsPath,
  {
    createFunction,
    fetchFunction,
  },
);

const slice = createContainerSlice<SubjectRequest>({
  name: 'subjectRequestSlice',
  containerURL: subjectRequestsPath,
  thunks: subjectRequestThunks,
  reducers: {
    remove(state, action: PayloadAction<ResourceUrl>) {
      const resourceUrl = action.payload;
      const resourceId = state.lookup[resourceUrl];
      delete state.items[resourceId];
    },
  },
});

export const { remove } = slice.actions;
const { reducer } = slice;
export default reducer;
