import { useShotenedUrl } from '@/hooks';
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
            window.location.href = shortenedUrl.originalUrl;
          }
        })
      }, 2000);
    }
  }, [shortenedUrl, registerClick, shortUrl]);

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
        <p>Please wait while we fetch the original URL.</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1>Oops! Something went wrong.</h1>
        <p>{error?.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>
        Redirecting to {shortenedUrl ? shortenedUrl.originalUrl : 'loading...'}...
      </h1>
      <p>If you are not redirected automatically, please click the link below:</p>
      <a href={shortenedUrl ? shortenedUrl.originalUrl : '#'}>Go to App</a>
    </div>
  );
}
