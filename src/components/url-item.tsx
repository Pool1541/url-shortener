import { SELF_DOMAIN } from '@/config';
import { useDeleteShortUrlMutation } from '@/hooks';
import { showConfirmNotification } from '@/lib/notifications';
import { UrlShortenerResponseWithShortUrl } from '@/types/url-shortener.types';
import { useState, useRef } from 'react';

interface UrlListProps {
  url: UrlShortenerResponseWithShortUrl;
  refetch: () => void;
}

export default function UrlItem({ url, refetch }: UrlListProps) {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const { mutate: deleteShortUrl, isPending: isDeleting } = useDeleteShortUrlMutation();

  const handleCopy = (shortUrl: string) => {
    const fullUrl = `${SELF_DOMAIN}/${shortUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(shortUrl);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDelete = (shortUrl: string) => {
    showConfirmNotification(
      '¿Estás seguro de que quieres eliminar esta URL acortada?',
      () => {
        setIsRemoving(true);
        // Esperar a que termine la animación antes de ejecutar la eliminación real
        setTimeout(() => {
          deleteShortUrl(shortUrl);
        }, 500); // Este tiempo debe coincidir con la duración de la animación
      }
    );
  };

  function requestDataAgain() {
    console.log('refetching...')
    refetch();
  }

  return (
    <div
      ref={itemRef}
      key={url.shortUrl}
      className={`url-item ${isRemoving ? 'url-item-removing' : ''}`}>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-2'>
        <div className='truncate max-w-xs'>
          <span className='text-slate-300'>{url.originalUrl}</span>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <a
            target='_blank'
            onClick={() => setTimeout(() => requestDataAgain(), 4000)}
            href={`${SELF_DOMAIN}/${url.shortUrl}`}
            className='text-indigo-300 hover:text-indigo-200 font-medium truncate max-w-[200px]'>
            {`${SELF_DOMAIN}/${url.shortUrl}`}
          </a>
          <span className='px-2 py-1 bg-slate-700 rounded text-slate-300 text-xs'>
            {url.clicks.clicks} clicks
          </span>
          <button
            onClick={() => handleCopy(url.shortUrl)}
            className={`px-3 py-1.5 rounded-md transition-all duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-800
            ${
              copiedUrl === url.shortUrl
                ? 'bg-emerald-700 text-emerald-100'
                : 'bg-indigo-700 hover:bg-indigo-600 text-indigo-100'
            }`}>
            {copiedUrl === url.shortUrl ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={() => handleDelete(url.shortUrl)}
            disabled={isDeleting || isRemoving}
            className='px-3 py-1.5 rounded-md transition-all duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-slate-800 bg-red-700 hover:bg-red-600 text-red-100 disabled:opacity-50'>
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}
