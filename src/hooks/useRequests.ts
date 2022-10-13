import useSWR from 'swr';
import { GetResponseItem } from '../pages/api/request';

const fetcher = (...args: [input: RequestInfo | URL, init?: RequestInit | undefined]): Promise<GetResponseItem[]> =>
  fetch(...args).then((res) => res.json());

export default function useRequest() {
  const { data, error } = useSWR(`/api/request`, fetcher);

  return {
    requests: data,
    isLoading: !error && !data,
    isError: error,
  };
}
