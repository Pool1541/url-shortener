import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createShortUrl } from '@/services/url-shortener.service';
import { showSuccessNotification, showErrorNotification } from '@/lib/notifications';

export default function useCreateShortUrlMutation() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: createShortUrl,
    onSuccess: () => {
      showSuccessNotification('URL acortada creada correctamente');
      
      queryClient.invalidateQueries({
        queryKey: ['urls'],
        exact: true,
      });

      queryClient.refetchQueries({
        queryKey: ['urls'],
        exact: true,
      });
    },
    onError: (error) => {
      showErrorNotification(`Error al crear la URL acortada: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  });

  return {
    mutate,
    isSuccess,
    isPending,
    isError,
    error,
  };
}
