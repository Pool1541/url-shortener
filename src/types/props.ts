import { UrlsShortenerResponse } from "./url-shortener.types";

export type UrlListProps = {
  shortenedUrls: UrlsShortenerResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}