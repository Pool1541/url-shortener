import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createShortUrl } from '@/services/url-shortener.service';

export default function useCreateShortUrlMutation() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: createShortUrl,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['urls'],
        exact: true,
      });

      queryClient.refetchQueries({
        queryKey: ['urls'],
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
