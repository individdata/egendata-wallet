import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function useUser() {
  const {data, error} = useSWR(`/api/hello`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}
