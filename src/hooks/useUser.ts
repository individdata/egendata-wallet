import useSWR from 'swr';

const fetcher = (...args: [input: RequestInfo | URL, init?: RequestInit | undefined]) => fetch(...args).then(res => res.json());

export default function useUser() {
  const {data, error} = useSWR(`/api/hello`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}
