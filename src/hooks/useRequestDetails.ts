import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function useRequestDetails(id: string) {
  const {data, error} = useSWR(`/api/request/details/${id}`, fetcher);

  return {
    request: data,
    isLoading: !error && !data,
    isError: error,
  }
}
