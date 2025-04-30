import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const isPublicRoute = createRouteMatcher([
  "/",         // public landing page
  "/sign-in",  // sign-in pagexw
  "/sign-up",  // sign-up page
  "/experience",
  "/trip",
  "/admin"
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth;
  const { pathname } = req.nextUrl;

  // If not signed in and accessing a protected route (not public), redirect to sign-in
  if (!userId && !isPublicRoute(req)) {
    const signInUrl = new URL("/sign-in", req.url);
    return Response.redirect(signInUrl);
  }

  // If signed in and on a public auth page (e.g. sign-in or home), redirect to /main
  if (userId && ["/", "/sign-in", "/sign-up"].includes(pathname)) {
    const mainUrl = new URL("/main", req.url);
    return Response.redirect(mainUrl);
  }

  // Otherwise allow access
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
