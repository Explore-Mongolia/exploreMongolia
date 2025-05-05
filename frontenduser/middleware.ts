import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;
  const { userId } = await auth();

  // If the user is not logged in, and the current path is not '/sign-in'
  if (!userId && pathname !== '/sign-in') {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set('redirect', pathname); 
    signInUrl.searchParams.set('message', 'Please log in to access this page.');

    // Redirect to the sign-in page
    return NextResponse.redirect(signInUrl);
  }

  // If the user is logged in or already on the sign-in page, proceed with the request
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
