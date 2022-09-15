import useSWR from 'swr';
import { ProcessesState } from '../store/slices/processesSlice';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function useRequests() {
  const {data, error} = useSWR('/api/consents', fetcher);

  return {
    consents: data,
    isConsentsLoading: !error && !data,
    isConsentsError: error,
  }
}
