import UrlItem from './url-item';
import UrlsContainer from './urls-container';

export default function UrlList() {
  return (
    <UrlsContainer>
      {({ isError, isLoading, shortenedUrls, refetch }) => (
        <div className='w-full max-w-4xl mt-8 px-4 max-h-[500px] overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-indigo'>
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error loading URLs</p>}
          {shortenedUrls && shortenedUrls.urls.map((url) => <UrlItem key={url.shortUrl} url={url} refetch={refetch} />)}
        </div>
      )}
    </UrlsContainer>
  );
}
