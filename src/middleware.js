import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {
  return null;
}, {
  callbacks: {
    authorized: async ({ token }) => !!token,
  },
  pages: {
    signIn: "/login",
  },
});

export const config = { matcher: ["/home"] };