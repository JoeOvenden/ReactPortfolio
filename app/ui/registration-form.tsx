'use client';
 
import { useFormState } from 'react-dom';
import { register } from '../lib/users';
 
export default function RegistrationForm() {
  const [errorMessage, formAction] = useFormState(register, undefined);

  return (
    <form action={formAction} className="flex">
      <div className="">
        <h1 className="">
          Register
        </h1>
        <div className="w-full">
          <div>
            <label
              className=""
              htmlFor="username"
            >
              Username
            </label>
            <div className="=">
              <input
                className="="
                id="username"
                type="string"
                name="username"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>
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