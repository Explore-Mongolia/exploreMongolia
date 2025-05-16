import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;
  const { userId, sessionClaims } = await auth();

  const publicPaths = ["/", "/sign-in", "/sign-up"];
  const isPublic = publicPaths.includes(pathname) || pathname.startsWith("/_next");

  if (!userId && !isPublic) {
    const signInUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }

  
 if (pathname.startsWith("/admin")) {
  const adminUserId = "user_2wWac41EdIBMCqg3SjGyluiTcxD"; 

  if (userId !== adminUserId) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}


  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
