import { getSolidDataset, getStringNoLocale, getThing, getUrl, Thing } from '@inrupt/solid-client';
import useSWR from 'swr';

//const fetcher = (...args) => fetch(...args).then(res => res.json());

const fetcher = (url: string, ...args) => getSolidDataset(url, ...args)
  .then((ds) => getThing(ds, url) as Thing)
  .then(
  (thing) => {
    return {
      url: thing.url,
      type: getUrl(thing, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      name: getStringNoLocale(thing, 'http://xmlns.com/foaf/0.1/name'),
      logo: getUrl(thing, 'http://xmlns.com/foaf/0.1/logo'),
      oidcIssuer: getUrl(thing, 'http://www.w3.org/ns/solid/terms#oidcIssuer'),
      storage: getUrl(thing, 'http://www.w3.org/ns/pim/space#storage'),
      seeAlso: getUrl(thing, 'http://www.w3.org/2000/01/rdf-schema#seeAlso'),
    }
  }
);

export default function useRequestorInfo(url: string) {
  const {data, error} = useSWR(url, fetcher);

  return {
    requestor: data,
    isLoading: !error && !data,
    isError: error,
  }
}
