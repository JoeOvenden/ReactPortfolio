import { User } from '@/app/lib/definitions/User';
import { getUserByName } from '@/app/lib/users';
import { Avatar } from '@/app/ui/avatar';
import { EditableTextarea } from '@/app/ui/forms';
import Section from '@/app/ui/section';
import { mdiPencil } from '@mdi/js';
import Icon from '@mdi/react';

interface ProfilePageProps {
  params: { slug: string };
}

function Anonymous() {
  return (
    <Icon 
        size={1} 
        path={mdiPencil} 
        className={`absolute top-6 right-6 opacity-0 transition-300 duration-300 group-hover:opacity-100`}
    />
  )
}
 
export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = params;
  const profile = await getUserByName(slug);
  if (profile === undefined) {
      return (
          "No such profile"
      );
  }  
  
  return (
      <Section className='flex flex-row gap-8'>
          <Avatar user={profile} link={`/runner/profile/${profile.name}/avatar`}/>
          <EditableTextarea label='Bio'>
            {`Bio: ${profile.bio}`}
          </EditableTextarea>
      </Section>
  )
}