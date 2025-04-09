import { TIME_BEFORE_REDIRECT } from '@/config';
import { emitClickEvent, useShotenedUrl } from '@/hooks';
import useShortenedUrlMutation from '@/hooks/use-shortened-url-mutation';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Redirect() {
  const { shortUrl } = useParams();
  const { isLoading, isError, error, shortenedUrl } = useShotenedUrl({ shortUrl });
  const registerClick = useShortenedUrlMutation({ shortUrl });

  useEffect(() => {
    if (shortenedUrl) {
      setTimeout(() => {
        registerClick.mutate(shortUrl, {
          onSuccess: () => {
            emitClickEvent({  id: shortUrl! });
            window.location.href = shortenedUrl.originalUrl;
          }
        })
      }, TIME_BEFORE_REDIRECT);
    }
  }, [shortenedUrl, registerClick, shortUrl]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-8">
        <div className="w-full max-w-md p-8 rounded-lg shadow-xl bg-slate-800 border border-slate-700 text-center animate-pulse">
          <div className="inline-block mb-4">
            <svg className="animate-spin h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-light mb-2 text-indigo-300">Cargando</h1>
          <p className="text-slate-300">Por favor, espera mientras obtenemos la URL original.</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-8">
        <div className="w-full max-w-md p-8 rounded-lg shadow-xl bg-slate-800 border border-red-800 text-center">
          <svg className="h-16 w-16 text-red-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-2xl font-light mb-2 text-red-300">¡Ups! Algo salió mal</h1>
          <p className="text-slate-300 mb-6">{error?.message || 'No se pudo encontrar la URL original'}</p>
          <a 
            href="/"
            className="inline-block px-6 py-2.5 bg-indigo-800 hover:bg-indigo-700 text-indigo-200 font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-8">
      <div className="w-full max-w-md p-8 rounded-lg shadow-xl bg-slate-800 border border-slate-700 text-center">
        <svg className="h-16 w-16 text-emerald-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-2xl font-light mb-4 text-indigo-300">
          Redireccionando
        </h1>
        <div className="mb-6">
          <p className="text-slate-300 mb-1">Te estamos llevando a:</p>
          <p className="text-emerald-300 font-medium break-all">{shortenedUrl ? shortenedUrl.originalUrl : 'cargando...'}</p>
        </div>
        <div className="h-2 w-full bg-slate-700 rounded-full mb-6">
          <div className="h-2 bg-indigo-600 rounded-full animate-[pulse_2s_ease-in-out_infinite]"></div>
        </div>
        <p className="text-slate-400 text-sm">Si no eres redirigido automáticamente, haz clic en el enlace:</p>
        <a 
          href={shortenedUrl ? shortenedUrl.originalUrl : '#'} 
          className="mt-4 inline-block px-6 py-2.5 bg-indigo-800 hover:bg-indigo-700 text-indigo-200 font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          Ir al sitio
        </a>
      </div>
    </div>
  );
}
