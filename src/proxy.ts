import { clerkMiddleware } from "@clerk/nextjs/server";

// This runs on every request. It doesn't block anyone by itself —
// it just makes sign-in state available everywhere (pages, API routes).
// Next.js 16 calls this file "proxy.ts" (it replaced the older "middleware.ts").
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
