import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { Portal } from './portal';

interface ConfirmNotificationProps {
  id: string | number;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const ConfirmNotification: React.FC<ConfirmNotificationProps> = ({
  id,
  message,
  onConfirm,
  onCancel,
}) => {

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
  
  return (
    <>
      <Portal>
        <div className="fixed inset-0 bg-black/50 z-[9998]" />
      </Portal>
      
      <div className="w-full bg-slate-800 border border-slate-700 rounded-lg shadow-md p-4 relative z-[9999]">
        <p className="text-slate-300 mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => {
              if (onCancel) onCancel();
              toast.dismiss(id);
            }}
            className="px-3 py-1.5 rounded-md transition-all duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-slate-800 bg-slate-700 hover:bg-slate-600 text-slate-200">
            Cancelar
          </button>
          <button 
            onClick={() => {
              onConfirm();
              toast.dismiss(id);
            }}
            className="px-3 py-1.5 rounded-md transition-all duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-slate-800 bg-red-700 hover:bg-red-600 text-red-100">
            Confirmar
          </button>
        </div>
      </div>
    </>
  );
};