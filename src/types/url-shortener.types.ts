export interface UrlsShortenerResponse {
  urls: UrlShortenerResponseWithShortUrl[];
}

export interface UrlShortenerResponseWithShortUrl extends UrlShortenerResponse {
  shortUrl: string;
}

export interface UrlShortenerResponse {
  originalUrl: string;
  createdAt: string;
  clicks: {
    clicks: string;
    createdAt: string;
    updatedAt: string;
  };
};

export interface CreateUrlShortenedResponse {
  originalUrl: string,
  shortUrl: string,
};