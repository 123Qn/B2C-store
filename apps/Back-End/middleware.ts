import { NextResponse, type NextRequest } from "next/server";

// Origins allowed to call the API from a browser.
// ALLOWED_ORIGINS (comma separated) replaces the defaults, e.g.
// "https://b2-c-store-web.vercel.app,https://my-preview.vercel.app"
const DEFAULT_ORIGINS =
  process.env.NODE_ENV === "production"
    ? ["https://b2-c-store-web.vercel.app"]
    : ["http://localhost:3001", "http://127.0.0.1:3001"];

const allowedOrigins = new Set(
  (process.env.ALLOWED_ORIGINS?.split(",") ?? DEFAULT_ORIGINS)
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean)
);

function corsHeaders(origin: string | null) {
  const headers = new Headers({ Vary: "Origin" });
  if (origin && allowedOrigins.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    headers.set("Access-Control-Max-Age", "600");
  }
  return headers;
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);

  // PREFLIGHT
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: origin && allowedOrigins.has(origin) ? 204 : 403,
      headers,
    });
  }

  const response = NextResponse.next();
  headers.forEach((value, key) => response.headers.set(key, value));
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
}

export const config = {
  matcher: "/api/:path*",
};
