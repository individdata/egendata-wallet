/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import {
  getSolidDataset, getThing, getUrlAll, Thing,
} from '@inrupt/solid-client';
import {
  fetch,
} from '@inrupt/solid-client-authn-browser';
import {
  AsyncThunk, createAsyncThunk, createSlice, Draft, SliceCaseReducers, ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';

export type AccessMode = 'Control' | 'Read' | 'Write' | 'Append';
export type ACL = { label: string, webId: string, mode: AccessMode[] };

export type ResourceName = string;
export type ResourcePath = string;
export type ResourceUrl = string; // including protocol e.g. https://localhost:3000/
export type ContainerPath = string;
export type NamedResource<T> = { resourceUrl: ResourcePath, resource: T, acl?: ACL[] };
export type NamedOptionalResource<T> = { resourceUrl: ResourcePath, resource: T | undefined, acl?: ACL[] };
export type NamedResourceArray<T> = NamedResource<T>[];
export type FetchFunction<T> = (resourceUrl: ResourcePath) => Promise<T>;
export type CreateFunction<T> = (resource: NamedOptionalResource<T>) => Promise<void>;
export type NamedFetchFunction<T> = (resourceUrl: ResourcePath) => Promise<NamedResource<T>>;
export type ContentFunction<T> = (containerUrl: ContainerPath, fetchFunction: FetchFunction<T>) => Promise<NamedResourceArray<T>>;

export type ContainerFunctions<T> = {
  create: CreateFunction<T>,
  fetch: FetchFunction<T>,
  getContent: ContentFunction<T>,
};

type ContainerThunkFunctions<T> = {
  create: AsyncThunk<void, NamedOptionalResource<T>, Record<ResourcePath, unknown>>,
  fetch: AsyncThunk<T, { resourceName: ResourceName }, Record<ResourcePath, unknown>>,
  getContent: AsyncThunk<NamedResourceArray<T>, ResourceUrl, Record<ResourcePath, unknown>>,
};

export async function containerContent<T>(
  containerUrl: ContainerPath,
  fetchFunction: NamedFetchFunction<T>,
): Promise<NamedResourceArray<T>> {
  const ds = await getSolidDataset(containerUrl, { fetch });
  const request = getThing(ds, containerUrl) as Thing;
  const content: Array<string> = getUrlAll(request, 'http://www.w3.org/ns/ldp#contains');
  const list = await Promise.all(
    content.map(
      async (url) => fetchFunction(url),
    ),
  );
  return list;
}

export function createContainerThunks<T>(containerUrl: ContainerPath, containerFunctions: ContainerFunctions<T>) {
  return {
    create: createAsyncThunk<void, NamedOptionalResource<T>>(
      `${containerUrl}store`,
      async (resource): Promise<void> => containerFunctions.create(resource),
    ),
    fetch: createAsyncThunk<T, { resourceName: string }>(
      `${containerUrl}fetch`,
      async (resourceName): Promise<T> => containerFunctions.fetch(containerUrl + resourceName),
    ),
    getContent: createAsyncThunk<NamedResourceArray<T>, ResourceUrl>(
      `${containerUrl}getContent`,
      async (storage: ResourceUrl): Promise<NamedResourceArray<T>> => containerFunctions.getContent(storage + containerUrl, containerFunctions.fetch),
    ),
  };
}

type State<T> = {
  status: 'idle' | 'storing' | 'fetching',
  items: Record<ResourcePath, T>,
  error: Record<ResourcePath, string>,
};

export function createContainerSlice<T>(
  arg: { containerURL: ContainerPath, thunks: ContainerThunkFunctions<T>, reducers?: ValidateSliceCaseReducers<State<T>, SliceCaseReducers<State<T>>> },
) {
  return createSlice({
    name: arg.containerURL,
    initialState: { status: 'idle', items: {}, error: {} } as State<T>,
    reducers: arg.reducers ?? {},
    extraReducers: (builder) => {
      builder.addCase(arg.thunks.fetch.pending, (state) => {
        state.status = 'fetching';
      });

      builder.addCase(arg.thunks.fetch.fulfilled, (state, action) => {
        const resourceKey = arg.containerURL + action.meta.arg.resourceName;
        const resource = action.payload;
        state.status = 'idle';
        state.items[resourceKey] = resource as Draft<T>;
      });

      builder.addCase(arg.thunks.fetch.rejected, (state, action) => {
        const resourceKey = arg.containerURL + action.meta.arg.resourceName;
        const { error } = action;
        state.error[resourceKey] = error.message ?? `error fetching resource: ${resourceKey}`;
      });

      builder.addCase(arg.thunks.create.pending, (state) => {
        state.status = 'storing';
      });

      builder.addCase(arg.thunks.create.fulfilled, (state, action) => {
        const resourceKey = action.meta.arg.resourceUrl;
        const { resource } = action.meta.arg;
        state.status = 'idle';
        state.items[resourceKey] = resource as Draft<T>;
      });

      builder.addCase(arg.thunks.create.rejected, (state, action) => {
        const resourceKey = action.meta.arg.resourceUrl;
        const { error } = action;
        state.error[resourceKey] = error.message ?? `error storing resource: ${resourceKey}`;
      });

      builder.addCase(arg.thunks.getContent.pending, (state) => {
        state.status = 'fetching';
      });

      builder.addCase(arg.thunks.getContent.fulfilled, (state, action) => {
        action.payload.forEach((item) => {
          const resourceKey = item.resourceUrl;
          const { resource } = item;
          state.items[resourceKey] = resource as Draft<T>;
        });
      });
    },
  });
}
