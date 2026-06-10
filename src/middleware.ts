import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request:NextRequest) {
    console.log("cookies:", request.cookies.getAll())
    const token = request.cookies.get("accessToken")?.value;

    const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");
    
    if(isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher:["/dashboard/:path*"],
};