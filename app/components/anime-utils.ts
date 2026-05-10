"use client";

export type AnimeMeta = {
  title: string;
  slug: string;
  year: string;
  rating: string;
  episodes: number;
  genres: string[];
};

const genrePool = [
  "Action",
  "Fantasy",
  "Sci-Fi",
  "Drama",
  "Mystery",
  "Shounen",
  "Romance",
  "Adventure",
  "Cyberpunk",
  "Comedy",
  "Thriller",
];

export function getYearFromTitle(title: string): string {
  const matches = title.match(/(19|20)\d{2}/g);
  return matches?.[matches.length - 1] ?? "TBA";
}

export function toSlug(title: string): string {
  return encodeURIComponent(title);
}

export function placeholder_poster(title: string): string {
  const letters = title.substring(0, 2).toUpperCase();
  const hue = title.length * 37 % 360;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="hsl(${hue}, 80%, 30%)" /><stop offset="100%" stop-color="hsl(${(hue + 60) % 360}, 80%, 20%)" /></linearGradient></defs><rect width="600" height="900" fill="url(#g)" /><text x="50%" y="50%" font-family="sans-serif" font-size="160" font-weight="bold" fill="rgba(255,255,255,0.7)" text-anchor="middle" dominant-baseline="middle">${letters}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const imageCache: Record<string, string> = {};
const pendingRequests: Record<string, Promise<string>> = {};

export async function fetchAnimePoster(title: string): Promise<string> {
  const key = title.toLowerCase().trim();
  if (imageCache[key]) return imageCache[key];
  if (pendingRequests[key]) return pendingRequests[key];

  pendingRequests[key] = (async () => {
    try {
      const res = await fetch(`/api/poster?name=${encodeURIComponent(title)}`);
      if (!res.ok) throw new Error("API Error");
      const data = await res.json();
      const url = data.url;
      if (url) {
        imageCache[key] = url;
        return url;
      }
      throw new Error("No image found");
    } catch (e) {
      const fallback = placeholder_poster(title);
      imageCache[key] = fallback;
      return fallback;
    } finally {
      delete pendingRequests[key];
    }
  })();
  
  return pendingRequests[key];
}

// Keep posterFor for synchronous fallback rendering where needed (like SSR)
export function posterFor(title: string, width = 600, height = 900): string {
  const key = title.toLowerCase().trim();
  if (imageCache[key]) return imageCache[key];
  return placeholder_poster(title);
}

export function pickGenres(title: string): string[] {
  const start = title.length % genrePool.length;
  return [
    genrePool[start],
    genrePool[(start + 3) % genrePool.length],
    genrePool[(start + 7) % genrePool.length],
  ];
}

export function scoreFromTitle(title: string): string {
  const value = 7 + ((title.length * 37) % 30) / 10;
  return value.toFixed(1);
}

export function buildMeta(
  title: string,
  episodeCount = Math.max(12, (title.length % 24) + 8),
): AnimeMeta {
  return {
    title,
    slug: toSlug(title),
    year: getYearFromTitle(title),
    rating: scoreFromTitle(title),
    episodes: episodeCount,
    genres: pickGenres(title),
  };
}
