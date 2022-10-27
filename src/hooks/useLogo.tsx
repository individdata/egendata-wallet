import useSWR from 'swr';

const fetcher = (...args: [input: RequestInfo | URL, init?: RequestInit | undefined]) =>
  fetch(...args).then((res) => res.text());

export default function useLogo(url: string) {
  const { data, error } = useSWR(url, fetcher);

  return {
    logo: data,
    isLogoLoading: !error && !data,
    isLogoError: error,
  };
}
