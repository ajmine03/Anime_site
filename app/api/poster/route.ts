import { NextRequest, NextResponse } from "next/server";
import https from "https";

const posterCache: Record<string, string | null> = {};

function fetchPoster(animeName: string): Promise<string | null> {
  return new Promise((resolve) => {
    if (posterCache[animeName] !== undefined) return resolve(posterCache[animeName]);

    // Clean the name: remove year, brackets, special chars for better search
    const cleanName = animeName
      .replace(/[-_]/g, " ")
      .replace(/\(.*?\)/g, "")
      .replace(/\d{4}/g, "")
      .trim();

    const query = encodeURIComponent(cleanName);
    const url = `https://api.jikan.moe/v4/anime?q=${query}&limit=1`;

    https
      .get(url, { headers: { "User-Agent": "AniStream/1.0" } }, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            const imageUrl = json?.data?.[0]?.images?.jpg?.large_image_url || null;
            posterCache[animeName] = imageUrl;
            resolve(imageUrl);
          } catch {
            resolve(null);
          }
        });
      })
      .on("error", () => resolve(null));
  });
}

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  if (!name) return NextResponse.json({ url: null });
  const url = await fetchPoster(name);
  return NextResponse.json({ url });
}
