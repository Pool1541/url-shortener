import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerClick } from '@/services/url-shortener.service';

interface UseShortenedUrlMutationProps {
  shortUrl: string | undefined;
}

export default function useShortenedUrlMutation({ shortUrl }: UseShortenedUrlMutationProps) {
  const queryClient = useQueryClient();

  const {
    mutate,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: registerClick,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['url-info', shortUrl],
        exact: true,
      });
    },
  });

  return {
    mutate,
    isSuccess,
    isPending,
    isError,
    error,
  };
}
