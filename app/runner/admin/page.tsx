import { getUserByEmail } from "@/app/lib/users";
import AccessDenied from "@/app/ui/runner/access-denied";
import { auth } from "@/auth"

export default async function Page() {
    const session = await auth();
    if (session?.user == null) {
        return <AccessDenied />
    }

    const user = await getUserByEmail(session?.user?.email ?? "");
    if (user == null || !user.is_admin) {
        return <AccessDenied />
    } 
    
    return (
        <p>
            WOAH SO ADMIN
        </p>
    )
}