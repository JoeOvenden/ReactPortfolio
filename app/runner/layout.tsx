import { SessionProvider, useSession } from 'next-auth/react';
import Nav from '../ui/runner/nav';

export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) { 
  return (
    <SessionProvider>
      <div className="flex flex-col">
        <Nav />
        <div className="flex">{children}</div>
      </div>
    </SessionProvider>
  );
}