// middleware.ts
import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;

  // redirect if not signed in
  if (!req.auth && nextUrl.pathname.startsWith("/protected")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: ["/protected/login"],
};
