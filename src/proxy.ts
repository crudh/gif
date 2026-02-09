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
  if (!uid?.value) {
    response.cookies.set("cid", randomUUID(), {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      secure: true,
    });
  }

  return response;
};

export default proxy;
