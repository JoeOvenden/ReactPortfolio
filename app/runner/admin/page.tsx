import { CreateAvatarComponenets, GetLoggedInUser } from "@/app/lib/admin";
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
            <div className="w-40">
                <ServerActionButton action={async () => { "use server"; await CreateAvatarComponenets();}} className="bg-green-50 cursor-pointer">Create avatar componenets in DB</ServerActionButton>
            </div>
        </div>
    )
}