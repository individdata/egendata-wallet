import useSWR from 'swr';

const fetcher = (...args: [input: RequestInfo | URL, init?: RequestInit | undefined]) =>
  fetch(...args).then((res) => res.json());

export default function useProfile(webId: string) {
  const re = /\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\//; // uuid
  const match = webId !== null && webId.match(re);

  const { data, error } = useSWR(match ? `/api/user/${match[1]}` : null, fetcher);

  if (error) {
    throw error;
  }

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error,
  };
}
