import { getUserByName } from '@/app/lib/users';
import ProfileSection from '@/app/ui/runner/profile/profile-section';
import { preloadFont } from 'next/dist/server/app-render/entry-base';

interface ProfilePageProps {
  params: { slug: string };
}
 
export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = params;
  const profile = await getUserByName(slug);
  return (
    <main>
        <ProfileSection 
          profile={profile}
        />
    </main>
  );
}