import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

export const config = {
  matcher: [
    // Exclude static files from proxy
    "/((?!_next/static|_next/image|.*\\.png|.*\\.svg$).*)",
  ],
};

const proxy = (request: NextRequest) => {
  const response = NextResponse.next();

  const uid = request.cookies.get("cid");
  const value = uid?.value ?? randomUUID();

  response.cookies.set("cid", value, {
    maxAge: 60 * 60 * 24 * 365, // reset 1-year expiry on each visit
    path: "/",
    sameSite: "strict",
    httpOnly: true,
    secure: true,
  });

  return response;
};

export default proxy;
