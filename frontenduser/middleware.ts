import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;
  const { userId } = await auth();

  
  const publicPaths = ["/", "/sign-in", "/sign-up"];

  if (!userId && !publicPaths.includes(pathname)) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect", pathname);
    signInUrl.searchParams.set("message", "Please log in to access this page.");
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});


export const config = {
  matcher: [
    "/((?!_next|.*\\.(?:.*)|sign-in(?:/.*)?|sign-up(?:/.*)?|api/auth|favicon.ico).*)",
    "/(api|trpc)(.*)",
  ],
};

