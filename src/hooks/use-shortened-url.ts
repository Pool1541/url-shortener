import { useQuery } from '@tanstack/react-query';
import { getOriginalUrl } from '@/services/url-shortener.service';

const RETRY_COUNT = 2;

interface UseShortenedUrlProps {
  shortUrl: string | undefined;
}

export default function useShotenedUrl({ shortUrl }: UseShortenedUrlProps) {
  const {
    isLoading,
    isError,
    error,
    data: shortenedUrl,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ['url-info', shortUrl],
    queryFn: () => getOriginalUrl(shortUrl),
    retry: RETRY_COUNT,
  });

  return {
    isLoading,
    isError,
    error,
    shortenedUrl,
    isFetching,
    isSuccess,
  };
}
