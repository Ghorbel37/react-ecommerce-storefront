// Set VITE_API_URL (e.g. http://localhost:3001) to use the json-server API.
// Without it, requests are answered in the browser from the bundled api/db.json,
// so the shop runs as a static site (GitHub Pages demo, tests).
const API_URL = import.meta.env.VITE_API_URL as string | undefined;

export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  if (API_URL) {
    return fetch(`${API_URL}${path}`, init);
  }
  const { mockFetch } = await import("./mockApi");
  return mockFetch(path, init);
}

// Public asset URL that respects the deploy base path (e.g. /react-ecommerce-storefront/).
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

export function productImageUrl(categoryName: string, imageName: string): string {
  return assetUrl(`products-img/${categoryName}/${imageName}`);
}
