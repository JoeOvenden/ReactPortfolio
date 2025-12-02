import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/runner/login',
    signOut: '/runner/logout'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnRunner = nextUrl.pathname.startsWith('/runner') && !nextUrl.pathname.startsWith('/runner/register');
      if (isOnRunner) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } 
      return true;
    },
    session({ session, token, user }) {
      session.user.id = token.sub ?? "";
      return session;
    }
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;