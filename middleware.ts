import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("session")?.value
  const pathname = request.nextUrl.pathname

  // Allow public routes and API routes
  if (pathname === "/" || pathname === "/demo" || pathname.startsWith("/api/") || pathname.startsWith("/_next/")) {
    return NextResponse.next()
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!sessionToken) {
      console.log("Redirecting to signin - no session")
      return NextResponse.redirect(new URL("/auth/signin", request.url))
    }
  }

  // Redirect authenticated users away from auth pages
  if (pathname.startsWith("/auth")) {
    if (sessionToken) {
      console.log("Redirecting to dashboard - user already authenticated")
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
