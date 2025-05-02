import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in",
  "/experience",
  "/trip",
  "/admin",
  "/admin/createDestination",
  "/admin/createCompany",
  "/test"
]);

export default clerkMiddleware((auth, req) => {
  const { userId }: any = auth;
  const { pathname } = req.nextUrl;

  if (!userId && !isPublicRoute(req)) {
    const signInUrl = new URL("/sign-in", req.url);
    return Response.redirect(signInUrl);
  }

  if (userId && ["/", "/sign-in", "/sign-up"].includes(pathname)) {
    const mainUrl = new URL("/main", req.url);
    return Response.redirect(mainUrl);
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
