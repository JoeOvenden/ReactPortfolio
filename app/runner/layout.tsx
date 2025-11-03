import { SessionProvider, useSession } from 'next-auth/react';
import Nav from '../ui/runner/nav';
import MainSection from '../ui/runner/mainsection';

export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) { 
  return (
    <SessionProvider>
      <div className="flex flex-col">
        <Nav />
        <div className='m-12 bg-accent rounded-sm p-4'>
          <MainSection className='container max-h-full'>{children}</MainSection>
        </div>
      </div>
    </SessionProvider>
  );
}