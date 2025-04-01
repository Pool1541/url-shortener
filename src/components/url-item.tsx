import { SELF_DOMAIN } from '@/config';
import { UrlShortenerResponseWithShortUrl } from '@/types/url-shortener.types';
import { useState } from 'react';

interface UrlListProps {
  url: UrlShortenerResponseWithShortUrl;
  refetch: () => void;
}

export default function UrlItem({ url, refetch }: UrlListProps) {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCopy = (shortUrl: string) => {
    const fullUrl = `${SELF_DOMAIN}/${shortUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(shortUrl);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  function requestDataAgain() {
    console.log('refetching...')
    refetch();
  }

  return (
    <div
      key={url.shortUrl}
      className='mb-4 p-4 border border-slate-700 rounded-lg shadow-md bg-slate-800'>
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
        </div>
      </div>
    </div>
  );
}
