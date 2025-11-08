import { SessionProvider, useSession } from 'next-auth/react';
import Nav from '../ui/runner/nav';
import MainSection from '../ui/runner/mainsection';
import { auth } from '@/auth';
import { getUserByEmail } from '../lib/users';
import { UserProvider } from '../context/UserContext';

export const experimental_ppr = true;
export default async function Layout({ children }: { children: React.ReactNode }) { 
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email ?? "");
  return (
    <SessionProvider>
      <UserProvider user={user}>
        <div className="flex flex-col">
          <Nav user={user} />
          <div className='m-12 bg-accent rounded p-4'>
            <MainSection className='container max-h-full'>{children}</MainSection>
          </div>
        </div>
      </UserProvider>
    </SessionProvider>
  );
}