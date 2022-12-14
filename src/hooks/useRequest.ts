import useSWR from 'swr';

const fetcher = (...args: [input: RequestInfo | URL, init?: RequestInit | undefined]) =>
  fetch(...args).then((res) => res.json());

export default function useRequest(id: string) {
  const { data, error } = useSWR(id !== '' ? `/api/request/${id}` : null, fetcher);

  return {
    request: data,
    isLoading: !error && !data,
    isError: error,
  };
}
