import { useQuery } from '@tanstack/react-query';
import { getAllUrls } from '@/services/url-shortener.service';

const RETRY_COUNT = 2;

export default function useShotenedUrls() {
  const {
    isLoading,
    isError,
    error,
    data: shortenedUrls,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['urls'],
    queryFn: getAllUrls,
    retry: RETRY_COUNT,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    isLoading,
    isError,
    error,
    shortenedUrls,
    isFetching,
    isSuccess,
    refetch,
  };
}
