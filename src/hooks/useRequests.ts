import useSWR from 'swr';
import { ProcessesState } from '../store/slices/processesSlice';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function useRequests() {
  const {data, error} = useSWR('/api/requests', fetcher);

  return {
    requests: data,
    isRequestsLoading: !error && !data,
    isRequestsError: error,
  }
}
