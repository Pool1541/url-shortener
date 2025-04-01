import { deleteUrl } from '@/services/url-shortener.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDeleteShortUrlMutation() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: deleteUrl,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['urls'],
        exact: true,
      });

      queryClient.refetchQueries({
        queryKey: ['urls'],
        exact: true,
      });
    }
  });
  return {
    mutate,
    isPending,
    isError,
    error,
    isSuccess,
  };
}
