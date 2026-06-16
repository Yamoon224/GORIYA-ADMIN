import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const token = request.cookies.get("goriya_token")?.value
    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/analytics/:path*",
        "/utilisateurs/:path*",
        "/entreprises/:path*",
        "/offres/:path*",
        "/candidatures/:path*",
        "/comptabilite/:path*",
        "/parametres/:path*",
        "/messages/:path*",
    ],
}
