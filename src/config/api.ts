// API configuration for backend calls.
// Set API_BASE_URL to your deployed backend, e.g.:
// export const API_BASE_URL = 'https://api.lexxi.app/v1';

export const API_BASE_URL = '';

export function hasBackend(): boolean {
  return API_BASE_URL.length > 0;
}