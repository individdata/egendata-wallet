import useSWR from 'swr';

const fetcher = (...args: [input: RequestInfo | URL, init?: RequestInit | undefined]) =>
  fetch(...args).then((res) => res.json());

export default function useProfile(webId: string) {
  const { data, error } = useSWR(webId !== null ? `/api/user/${encodeURIComponent(webId)}` : null, fetcher);

  if (error) {
    throw error;
  }

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error,
  };
}
