import { SessionProvider, useSession } from 'next-auth/react';
import Nav from '../ui/runner/nav';
import MainSection from '../ui/runner/mainsection';
import { auth } from '@/auth';
import { getAvatarComponentsInfo, getUserByEmail } from '../lib/users';
import { GlobalProvider } from '../context/UserContext';

export const experimental_ppr = true;
export default async function Layout({ children }: { children: React.ReactNode }) { 
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email ?? "");
  const { array, mappings } = await getAvatarComponentsInfo();
  return (
    <SessionProvider>
      <GlobalProvider user={user} avatar_mappings={mappings} avatar_components={array}>
        <div className="flex flex-col items-center">
          <Nav user={user} />
          <div className='m-12 rounded p-4 w-[50vw]'>
            <MainSection className='flex max-h-full col-span-4 col-start-4'>{children}</MainSection>
          </div>
        </div>
      </GlobalProvider>
    </SessionProvider>
  );
}