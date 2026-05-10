import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const videoUrl = req.nextUrl.searchParams.get("url");

  if (!videoUrl) {
    return new Response("Missing URL", { status: 400 });
  }

  const response = await fetch(videoUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  const headers = new Headers(response.headers);

  headers.set("Access-Control-Allow-Origin", "*");

  return new Response(response.body, {
    status: response.status,
    headers,
  });
}
