import { GetLoggedInUser } from "@/app/lib/admin";
import RegistrationForm from "@/app/ui/registration-form";
import Section from "@/app/ui/section";
import { redirect, RedirectType } from "next/navigation";
import { Suspense } from "react";

export default async function LoginPage() {
  const user = await GetLoggedInUser();
  if (user != null) {
    redirect("/runner", RedirectType.replace);
  }

  return (
    <div className="grid grid-cols-3">
      <Section className="col-start-2" colorTheme="bg-accent2">
        <Suspense fallback={"Loading..."}>
          <RegistrationForm />
        </Suspense>
      </Section>
    </div>
  );
}