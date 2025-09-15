import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/runner/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnRunner = nextUrl.pathname.startsWith('/runner');
      if (isOnRunner) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } 
      return true;
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;