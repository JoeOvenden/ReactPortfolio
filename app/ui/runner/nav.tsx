import Link, { LinkProps } from 'next/link';
import Image from 'next/image';
import { MouseEventHandler, ReactNode } from 'react';
import { User } from '@/app/lib/definitions/User';
import Icon from '@mdi/react';
import { mdiPower } from '@mdi/js';
import { signOut } from '@/auth';
import { TextLink } from '../link';


interface NavbarLinkProps extends LinkProps { 
  className?: string;
  children: ReactNode;
}

const navbarItemClasses = "font-semibold cursor-pointer";

function NavbarItem({ className = "", children, onclick } : {
  className?: string,
  children: ReactNode,
  onclick: MouseEventHandler<HTMLDivElement>
}) {
  return <div onClick={onclick} className={`${navbarItemClasses} cursor-pointer ${className}`}>{children}</div>
}

function LogoutButton() {
  return (
    <form 
      action={async () => {
        'use server';
        await signOut({redirectTo: '/runner' });
      }}
      className={`${navbarItemClasses}`}
    >
      <button className='cursor-pointer hover:text-black transition duration-300'><Icon path={mdiPower} className='w-10 h-10'></Icon></button>
    </form>
  )
}

export default async function Nav({ user } : {
  user: User | null | undefined
}) {
  const username = user == null ? "Anonymous" : user.name;
  const navbarLinkParentClasses = "flex flex-row gap-8";

  return (
    <div className='relative flex flex-row items-center justify-between bg-accent p-4 w-[100%]'>
      <div className='flex flex-row items-center gap-4' id="left">
        <Link href="/runner">
          <Image
            className=""
            src="/runner-logo.png"
            width={80}
            height={61}
            alt="Man running logo"
          />
        </Link>
        <TextLink href="/runner" className='text-xl'>Runner</TextLink>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className={`${navbarLinkParentClasses}`}>
            {user == null ? "" : <TextLink href={`/runner/profile/${user?.name}`}>{user?.name}</TextLink>}
            <TextLink href="/runner/create_event">Create event</TextLink>
            <TextLink href="/runner/users">Users</TextLink>
            <TextLink href="/runner/events">Events</TextLink>
            {user?.is_admin ? <TextLink href="/runner/admin">Admin</TextLink> : ""}
        </div>
      </div>
      {
        user == null 
        ? <div className={`${navbarLinkParentClasses} mr-10`}>
            <TextLink href="/runner/login">Login</TextLink>
            <TextLink href="/runner/register">Register</TextLink>
          </div>
        : <div className={`${navbarLinkParentClasses} mr-10`}>
            <LogoutButton />
          </div>
      }
    </div>
  );
}
