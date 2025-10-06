import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  // If user not logged in → redirect to /sign_up
  if (!sessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign_in";
    return NextResponse.redirect(url);
  }

  // Allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sign_in|sign_up|assets).*)",
  ],
};
