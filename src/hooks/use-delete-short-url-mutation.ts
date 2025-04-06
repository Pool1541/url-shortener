import { deleteUrl } from '@/services/url-shortener.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showSuccessNotification, showErrorNotification } from '@/lib/notifications';

export default function useDeleteShortUrlMutation() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: deleteUrl,
    onSuccess: () => {
      showSuccessNotification('URL acortada eliminada correctamente');
      
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
      showErrorNotification(`Error al eliminar la URL acortada: ${error instanceof Error ? error.message : 'Error desconocido'}`);
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
