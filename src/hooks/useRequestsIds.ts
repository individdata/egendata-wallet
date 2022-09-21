import useSWR from 'swr';
import { ProcessesState } from '../store/slices/processesSlice';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function useRequestsIds() {
  const {data, error} = useSWR('/api/requests', fetcher);

  return {
    unsharedRequests: data?.unsharedRequests,
    sharedRequests: data?.sharedRequests,
    isRequestsLoading: !error && !data,
    isRequestsError: error,
  }
}
