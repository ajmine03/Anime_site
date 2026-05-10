import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const videoUrl = req.nextUrl.searchParams.get("url");

  if (!videoUrl) {
    return new Response("Missing URL", { status: 400 });
  }

  const range = req.headers.get("range");

  const response = await fetch(videoUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      ...(range ? { Range: range } : {}),
    },
  });

  const headers = new Headers(response.headers);

  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Accept-Ranges", "bytes");

  return new Response(response.body, {
    status: response.status,
    headers,
  });
}
