import { getUsers } from "@/app/lib/users";
import { UserList } from "@/app/ui/runner/users";
import Section from "@/app/ui/section";

export default async function Page() {
    const users = await getUsers();
    console.log(users);
    return (
        <Section>
            <UserList users={users} />
        </Section>
    )
}