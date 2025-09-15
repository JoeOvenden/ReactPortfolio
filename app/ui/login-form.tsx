'use client';
 
import { authenticate } from '@/app/lib/actions';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useFormState } from 'react-dom';
 
export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/runner';
  const [errorMessage, formAction] = useFormState(authenticate, undefined);
  const { data: session, status } = useSession();
  console.log(session, status);
  return (
    <form action={formAction} className="flex">
      <div className="">
        <h1 className="">
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className=""
              htmlFor="email"
            >
              Email
            </label>
            <div className="=">
              <input
                className="="
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="">
            <label
              className=""
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className=""
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button className="">
          Log in
        </button>
        <div
          className=""
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className="">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}