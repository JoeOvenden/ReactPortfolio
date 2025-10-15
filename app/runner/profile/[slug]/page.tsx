import { getUserByName } from '@/app/lib/users';
import { AvatarExtended, AvatarExtendedProps } from '@/app/ui/avatar';
import { EditableTextarea } from '@/app/ui/forms';
import Section from '@/app/ui/section';

interface ProfilePageProps {
  params: { slug: string };
}
 
export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = params;
  const profile = await getUserByName(slug);
  if (profile === undefined) {
      return (
          "No such profile"
      );
  }
  const avatarExtendedProps : AvatarExtendedProps = {
      src: "",
      alt: profile.name,
      size: "medium",
      username: profile.name
  }
  return (
      <Section className='flex flex-row gap-8'>
          <AvatarExtended props={avatarExtendedProps}></AvatarExtended>
          <EditableTextarea label='Bio'>
            {`Bio: ${profile.bio}`}
          </EditableTextarea>
      </Section>
  )
}