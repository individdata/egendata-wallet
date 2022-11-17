import useSWR from 'swr';
import { RequestInfo } from '../types';

const fetcher = (
  ...args: [input: URL | RequestInfo, init?: RequestInit | undefined]
): Promise<{ requests: RequestInfo[]; total: number }> => fetch(...args).then((res) => res.json());

export default function useRequest(pageIndex: number) {
  const { data, error } = useSWR(`/api/request?page=${pageIndex}`, fetcher);

  return {
    requests: data,
    isLoading: !error && !data,
    isError: error,
  };
}
