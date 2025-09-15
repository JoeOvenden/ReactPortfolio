'use client';
 
import { authenticate } from '@/app/lib/actions';
import { signIn, useSession } from 'next-auth/react';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { format } from 'path';
import { useFormState } from 'react-dom';
 
export default function LoginForm() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      console.log("Login failed:", result.error);
    } else {
      console.log("Logged in successfully!");
    }
    console.log(result);
  }
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/runner';
  const [errorMessage, formAction] = useFormState(authenticate, undefined);
  const urlPath = usePathname();
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