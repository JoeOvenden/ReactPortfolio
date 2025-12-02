import Link, { LinkProps } from 'next/link';
import Image from 'next/image';
import { MouseEventHandler, ReactNode } from 'react';
import { User } from '@/app/lib/definitions/User';
import Icon from '@mdi/react';
import { mdiPower } from '@mdi/js';
import { signOut } from '@/auth';


interface NavbarLinkProps extends LinkProps { 
  className?: string;
  children: ReactNode;
}

const navbarItemClasses = "hover:text-black transition duration-150 font-semibold cursor-pointer";

function NavbarItem({ className = "", children, onclick } : {
  className?: string,
  children: ReactNode,
  onclick: MouseEventHandler<HTMLDivElement>
}) {
  return <div onClick={onclick} className={`${navbarItemClasses} cursor-pointer ${className}`}>{children}</div>
}

function NavbarLink({ className = "", children, ...props}: NavbarLinkProps) {
  return (
    <Link
      {...props}
      className={`${navbarItemClasses} ${className}`}
    >
      {children}
    </Link>
  )
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
      <button className='cursor-pointer'><Icon path={mdiPower} className='w-10 h-10'></Icon></button>
    </form>
  )
}

export default async function Nav({ user } : {
  user: User | null | undefined
}) {
  const username = user == null ? "Anonymous" : user.name;
  const navbarLinkParentClasses = "flex flex-row gap-8";

  return (
    <div className='relative flex flex-row items-center justify-between bg-accent p-4'>
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
        <NavbarLink href="/runner" className='text-xl'>Runner</NavbarLink>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className={`${navbarLinkParentClasses}`}>
            {user == null ? "" : <NavbarLink href={`/runner/profile/${user?.name}`}>{user?.name}</NavbarLink>}
            <NavbarLink href="/runner/create_event">Create event</NavbarLink>
            <NavbarLink href="/runner/users">Users</NavbarLink>
            <NavbarLink href="/runner/events">Events</NavbarLink>
            {user?.is_admin ? <NavbarLink href="/runner/admin">Admin</NavbarLink> : ""}
        </div>
      </div>
      {
        user == null 
        ? <div className={`${navbarLinkParentClasses} mr-10`}>
            <NavbarLink href="/runner/login">Login</NavbarLink>
            <NavbarLink href="/runner/register">Register</NavbarLink>
          </div>
        : <div className={`${navbarLinkParentClasses} mr-10`}>
            <LogoutButton />
          </div>
      }
    </div>
  );
}
