import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
    const username = "Anonymous";
  return (
    <div className="flex flex-row items-center bg-accent rounded-lg">
        <Image
        className=""
            src="/runner-log.png"
            width={100}
            height={76}
            alt="Man running logo"
          />
        <div className="flex flex-row gap-8">
            <Link href="/">{username}</Link>
            <Link href="/">Login</Link>
            <Link href="/">Create event</Link>
            <Link href="/">Users</Link>
            <Link href="/">Events</Link>
        </div>
    </div>
  );
}
