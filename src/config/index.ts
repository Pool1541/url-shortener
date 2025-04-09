const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173/';
export const SELF_DOMAIN = BASE_URL + 'redirect';

export const TIME_BEFORE_REDIRECT: number = 2000;