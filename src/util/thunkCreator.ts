/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import {
  AsyncThunk, createAsyncThunk, createSlice, Draft, SliceCaseReducers, ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';
import { fetchContainerContent } from './oak/solid';

export type AccessMode = 'Control' | 'Read' | 'Write' | 'Append';
export type ACL = { label: string, webId: string, mode: AccessMode[] };

export type ResourceId = string;
export type ResourceName = string;
export type ResourcePath = string;
export type ResourceUrl = string; // including protocol e.g. https://localhost:3000/
export type ContainerPath = string;
export type NamedResource<T> = { resourceId: string, resourceUrl: ResourcePath, resource: T, acl?: ACL[] };
export type NamedOptionalResource<T> = { resourceId: string, resourceUrl: ResourcePath, resource: T | undefined, acl?: ACL[] };
export type NamedResourceArray<T> = NamedResource<T>[];
export type ContentThunkArgs = { storage: ResourceUrl, currentResources: ResourceUrl[] };
export type ContentValues<T> = { addList: NamedResourceArray<T>, deleteList: ResourceUrl[] };
export type FetchFunction<T> = (resourceUrl: ResourceUrl) => Promise<NamedResource<T>>;
export type CreateFunction<T> = (resource: NamedOptionalResource<T>) => Promise<NamedOptionalResource<T>>;
export type NamedFetchFunction<T> = (resourceUrl: ResourcePath) => Promise<NamedResource<T>>;
export type ContentFunction<T> = (containerUrl: ContainerPath, fetchFunction: FetchFunction<T>, currentResources: ResourceUrl[]) => Promise<ContentValues<T>>;

export type ContainerFunctions<T> = {
  createFunction: CreateFunction<T>,
  fetchFunction: NamedFetchFunction<T>,
};

type ContainerThunkFunctions<T> = {
  create: AsyncThunk<NamedOptionalResource<T>, NamedOptionalResource<T>, Record<ResourceId, unknown>>,
  fetch: AsyncThunk<NamedResource<T>, ResourceUrl, Record<ResourceId, unknown>>,
  getContent: AsyncThunk<ContentValues<T>, ContentThunkArgs, Record<ResourceId, unknown>>,
};

// const setDifference = (a: Set<string>, b: Set<string>) => new Set(Array.from(a).filter((x) => !b.has(x)));

const difference = (a: string[], b: string[]): string[] => Array.from(new Set(Array.from(new Set(a)).filter((x) => !new Set(b).has(x))));

async function contentFunction<T>(
  containerUrl: ContainerPath,
  fetchFunction: NamedFetchFunction<T>,
  currentResources: ResourceUrl[],
): Promise<ContentValues<T>> {
  console.log(`currentResources: ${currentResources}`);
  const content = await fetchContainerContent(containerUrl);
  console.log(`container: ${containerUrl}`);
  console.log({ content });
  const fetchList = difference(content, currentResources);
  console.log(`resources to fetch: ${fetchList}`);
  const deleteList = difference(currentResources, content);
  console.log(`resources to delete: ${deleteList}`);
  const addList = await Promise.all(
    fetchList.map(
      async (url) => fetchFunction(url),
    ),
  );
  return { addList, deleteList };
}

export function createContainerThunks<T>(containerUrl: ContainerPath, containerFunctions: ContainerFunctions<T>) {
  return {
    create: createAsyncThunk<NamedOptionalResource<T>, NamedOptionalResource<T>>(
      `${containerUrl}store`,
      async (resource): Promise<NamedOptionalResource<T>> => containerFunctions.createFunction(resource),
    ),
    fetch: createAsyncThunk<NamedResource<T>, ResourceUrl>(
      `${containerUrl}fetch`,
      async (resourceUrl): Promise<NamedResource<T>> => containerFunctions.fetchFunction(resourceUrl),
    ),
    getContent: createAsyncThunk<ContentValues<T>, ContentThunkArgs>(
      `${containerUrl}getContent`,
      async (arg: ContentThunkArgs): Promise<ContentValues<T>> => contentFunction(
        arg.storage + containerUrl,
        containerFunctions.fetchFunction,
        arg.currentResources,
      ),
    ),
  };
}

type State<T> = {
  status: 'idle' | 'storing' | 'fetching',
  items: Record<ResourceId, T>,
  lookup: Record<ResourceUrl, ResourceId>,
  // error: Record<ResourcePath, string>,
};

export function createContainerSlice<T>(
  arg: { name: string,
    containerURL: ContainerPath,
    thunks: ContainerThunkFunctions<T>,
    reducers?: ValidateSliceCaseReducers<State<T>, SliceCaseReducers<State<T>>> },
) {
  return createSlice({
    name: arg.name,
    initialState: { status: 'idle', items: {}, lookup: {} } as State<T>,
    reducers: arg.reducers ?? {},
    extraReducers: (builder) => {
      builder.addCase(arg.thunks.fetch.pending, (state) => {
        state.status = 'fetching';
      });

      builder.addCase(arg.thunks.fetch.fulfilled, (state, action) => {
        const resourceUrl = action.meta.arg;
        const { resourceId, resource } = action.payload;
        state.status = 'idle';
        state.items[resourceId] = resource as Draft<T>;
        state.lookup[resourceUrl] = resourceId;
      });

      builder.addCase(arg.thunks.fetch.rejected, (state, action) => {
        const { error } = action;
        const resource = action.meta.arg;
        const msg = error.message ?? `error fetching resource: ${resource}`;
        console.log(`fetch error: ${msg}`);
      });

      builder.addCase(arg.thunks.create.pending, (state) => {
        state.status = 'storing';
      });

      builder.addCase(arg.thunks.create.fulfilled, (state, action) => {
        const { resource, resourceId, resourceUrl } = action.meta.arg;
        state.status = 'idle';
        state.items[resourceId] = resource as Draft<T>;
        state.lookup[resourceUrl] = resourceId;
      });

      builder.addCase(arg.thunks.create.rejected, (state, action) => {
        const { error } = action;
        const resource = action.meta.arg;
        const msg = error.message ?? `error storing resource: ${resource}`;
        console.log(`create error: ${msg}`);
      });

      builder.addCase(arg.thunks.getContent.pending, (state) => {
        state.status = 'fetching';
      });

      builder.addCase(arg.thunks.getContent.fulfilled, (state, action) => {
        action.payload.addList.forEach((item) => {
          const { resource, resourceId, resourceUrl } = item;
          state.items[resourceId] = resource as Draft<T>;
          state.lookup[resourceUrl] = resourceId;
        });
        action.payload.deleteList.forEach((resourceUrl) => {
          const resourceId = state.lookup[resourceUrl];
          console.log(`delete item with reourceId: ${resourceId}`);
          delete state.items[resourceId];
          console.log(`delete lookup for resourceUrl: ${resourceUrl}`);
          delete state.lookup[resourceUrl];
        });
      });
    },
  });
}
