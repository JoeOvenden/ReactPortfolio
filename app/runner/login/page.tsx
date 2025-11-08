import { GetLoggedInUser } from '@/app/lib/admin';
import LoginForm from '@/app/ui/login-form';
import { redirect, RedirectType } from 'next/navigation';
import { Suspense } from 'react';
 
export default async function LoginPage() {
  const user = await GetLoggedInUser();
  if (user != null) {
    redirect("/runner", RedirectType.replace);
  }

  return (
    <main className="bg-accent2">
      <div className="flex items-center">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}