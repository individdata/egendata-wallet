import useSWR from 'swr';

const fetcher = (...args: [input: RequestInfo | URL, init?: RequestInit | undefined]) =>
  fetch(...args).then((res) => res.json());

export default function useRequests() {
  const { data, error } = useSWR('/api/consents', fetcher);

  return {
    consents: data,
    isConsentsLoading: !error && !data,
    isConsentsError: error,
  };
}
