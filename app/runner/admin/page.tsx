import { CreateAvatarComponenets, GetLoggedInUser } from "@/app/lib/admin";
import { seedUsers } from "@/app/lib/seed";
import AccessDenied from "@/app/ui/runner/access-denied";
import ServerActionButton from "@/app/ui/server-action-button";

export default async function Page() {
    const user = await GetLoggedInUser();
    if (user == null || !user.is_admin) {
        return <AccessDenied />
    }
    return ( 
        <div className="flex flex-col gap-10">
            <p>
                WOAH SO ADMIN
            </p>
            <div className="w-40 flex gap-10">
                <ServerActionButton action={async () => { "use server"; await CreateAvatarComponenets();}} >
                    Create avatar componenets in DB
                </ServerActionButton>
                <ServerActionButton action={async () => { "use server"; await seedUsers();}}>
                    Seed users
                </ServerActionButton>
            </div>
        </div>
    )
}