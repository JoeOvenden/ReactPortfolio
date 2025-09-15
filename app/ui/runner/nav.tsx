import Link, { LinkProps } from 'next/link';
import Image from 'next/image';
import { ReactNode, AnchorHTMLAttributes } from 'react';
import { getServerSession } from "next-auth";
import { authConfig } from '@/app/auth/config';
import { auth } from '@/auth';


interface NavbarLinkProps extends LinkProps { 
  className?: string;
  children: ReactNode;
}

function NavbarLink({ className = "", children, ...props}: NavbarLinkProps) {
  return (
    <Link
      {...props}
      className={`hover:text-black transition duration-150 font-semibold ${className}`}
    >
      {children}
    </Link>
  )
}

export default async function Nav() {
  const session = await auth();
  const username = "Anonymous";
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
        <div className="flex flex-row gap-8">
            <NavbarLink href="/runner">{session.user.name}</NavbarLink>
            <NavbarLink href="/runner/login">Login</NavbarLink>
            <NavbarLink href="/runner/create_event">Create event</NavbarLink>
            <NavbarLink href="/runner/users">Users</NavbarLink>
            <NavbarLink href="/runner/events">Events</NavbarLink>
        </div>
      </div>
    </div>
  );
}
