import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;
  const { userId } = await auth();

  const publicRoutes = [
    "/",
    "/sign-in",
    "/trip",
    "/admin",
    "/admin/createDestination",
    "/admin/createCompany",
    "/test",
  ];

  // Check if the current path is public
  const isPublic =
    publicRoutes.includes(pathname) || pathname.startsWith("/experiences");

  // Redirect unauthenticated users from private routes
  if (!userId && !isPublic) {
    const signInUrl = new URL("/sign-in", req.url);
    return Response.redirect(signInUrl);
  }

  // Redirect authenticated users from public auth routes (sign-in, sign-up) to homepage
  if (userId && ["/sign-in", "/sign-up"].includes(pathname)) {
    const mainUrl = new URL("/", req.url);  // Redirect authenticated users to home
    return Response.redirect(mainUrl);
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
