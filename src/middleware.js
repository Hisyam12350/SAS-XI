import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  const token = req.nextauth.token;
  const path = req.nextUrl.pathname;
  
  // Jika user adalah sekretaris dan mencoba akses /home, redirect ke /sekertaris
  if (path.startsWith("/home") && token?.role === "sekertaris") {
    return NextResponse.redirect(new URL("/sekertaris", req.url));
  }
  
  // Jika user biasa mencoba akses /sekertaris, redirect ke /home
  if (path.startsWith("/sekertaris") && token?.role !== "sekertaris") {
    return NextResponse.redirect(new URL("/home", req.url));
  }
  
  return null;
}, {
  callbacks: {
    authorized: async ({ token }) => !!token,
  },
  pages: {
    signIn: "/login",
  },
});

export const config = { 
  matcher: [
    "/home/:path*",
    "/sekertaris/:path*",
    "/pinjam/:path*",
    "/profile/:path*",
    "/detailAlat/:path*",
    "/kategori/:path*"
  ] 
};