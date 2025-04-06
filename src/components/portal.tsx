import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = ({ children }) => {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    // Crear el elemento contenedor del portal
    const portalDiv = document.createElement('div');
    portalDiv.setAttribute('data-portal-root', '');
    document.body.appendChild(portalDiv);
    
    // Guardar referencia al contenedor
    setPortalContainer(portalDiv);

    // Limpiar al desmontar
    return () => {
      document.body.removeChild(portalDiv);
    };
  }, []);

  // No renderizar nada hasta que el container esté disponible
  if (!portalContainer) return null;

  // Renderizar children en el portal
  return createPortal(children, portalContainer);
};