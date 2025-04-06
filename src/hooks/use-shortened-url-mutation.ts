import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerClick } from '@/services/url-shortener.service';
import { showErrorNotification } from '@/lib/notifications';

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
    onError: (error) => {
      showErrorNotification(`Error al registrar clic: ${error instanceof Error ? error.message : 'Error desconocido'}`);
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
