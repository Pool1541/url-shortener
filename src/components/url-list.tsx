import UrlItem from './url-item';
import UrlsContainer from './urls-container';

export default function UrlList() {
  return (
    <UrlsContainer>
      {({ isError, isLoading, shortenedUrls, refetch }) => (
        <div className='w-full max-w-4xl mt-8 px-4 max-h-[500px] overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-indigo'>
          {isLoading && (
            <div className='p-6 rounded-lg shadow-md bg-slate-800 border border-slate-700 text-center animate-pulse'>
              <div className='inline-block mb-2'>
                <svg className='animate-spin h-6 w-6 text-indigo-400' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
              </div>
              <p className='text-slate-300 font-medium'>Cargando URLs...</p>
            </div>
          )}
          
          {isError && (
            <div className='p-6 rounded-lg shadow-md bg-red-900/30 border border-red-800 text-center'>
              <svg className='h-10 w-10 text-red-400 mx-auto mb-3' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              <h3 className='text-red-200 text-lg font-medium mb-2'>Error al cargar las URLs</h3>
              <p className='text-red-300'>No se pudieron cargar los datos. Inténtalo de nuevo más tarde.</p>
              <button 
                onClick={() => refetch()} 
                className='mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 text-red-100 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800'
              >
                Reintentar
              </button>
            </div>
          )}
          
          {shortenedUrls && shortenedUrls.urls.length === 0 && (
            <div className='p-6 rounded-lg shadow-md bg-slate-800 border border-slate-700 text-center'>
              <svg className='h-10 w-10 text-slate-400 mx-auto mb-3' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              <p className='text-slate-300'>No hay URLs acortadas todavía</p>
              <p className='text-slate-400 text-sm mt-1'>Crea una nueva para comenzar</p>
            </div>
          )}
          
          {shortenedUrls && shortenedUrls.urls.length > 0 && shortenedUrls.urls.map((url) => (
            <UrlItem key={url.shortUrl} url={url} refetch={refetch} />
          ))}
        </div>
      )}
    </UrlsContainer>
  );
}
