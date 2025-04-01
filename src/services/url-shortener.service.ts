import { CreateUrlShortenedResponse, UrlShortenerResponse, UrlsShortenerResponse } from '@/types/url-shortener.types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getOriginalUrl(shortUrl: string | undefined): Promise<UrlShortenerResponse> {
  if (!shortUrl) throw new Error('Short URL is required');

  const response = await fetch(`${BASE_URL}/${shortUrl}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch the original URL');
  }

  const data: UrlShortenerResponse = await response.json();
  return data;
}

export async function registerClick(shortUrl: string | undefined): Promise<void> {
  if (!shortUrl) throw new Error('Short URL is required');

  const response = await fetch(`${BASE_URL}/clicks/${shortUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to register click');
  }
}

export async function createShortUrl(originalUrl: string): Promise<CreateUrlShortenedResponse> {
  if (!originalUrl) throw new Error('Original URL is required');

  const response = await fetch(`${BASE_URL}/shorten`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ originalUrl }),
  });

  if (!response.ok) {
    throw new Error('Failed to create short URL');
  }

  const data: CreateUrlShortenedResponse = await response.json();

  return data;
}

export async function getAllUrls(): Promise<UrlsShortenerResponse> {
  const response = await fetch(`${BASE_URL}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch all URLs');
  }

  const data: UrlsShortenerResponse = await response.json();
  return data;
}

export async function deleteUrl(shortUrl: string | undefined): Promise<void> {
  if (!shortUrl) throw new Error('Short URL is required');

  const response = await fetch(`${BASE_URL}/clicks/${shortUrl}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete click');
  }
}