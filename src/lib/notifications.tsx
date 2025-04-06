import { toast } from 'sonner';
import { ConfirmNotification } from '../components/confirm-notification';

export const showSuccessNotification = (message: string) => {
  toast.success(message);
};

export const showErrorNotification = (message: string) => {
  toast.error(message);
};

export const showInfoNotification = (message: string) => {
  toast.info(message);
};

export const showWarningNotification = (message: string) => {
  toast.warning(message);
};

export const showLoadingNotification = (message: string, promise: Promise<unknown>) => {
  return toast.promise(promise, {
    loading: message,
    success: () => {
      return 'Operación completada con éxito';
    },
    error: (err) => {
      return `Error: ${err instanceof Error ? err.message : 'Desconocido'}`;
    },
  });
};

export const showConfirmNotification = (
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
) => {
  return toast.custom((id) => (
    <ConfirmNotification 
      id={id} 
      message={message} 
      onConfirm={onConfirm} 
      onCancel={onCancel}
    />
  ), {
    duration: Infinity,
    position: 'top-center',
  });
};