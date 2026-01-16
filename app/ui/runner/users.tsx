import { UserCard } from "../avatar";
import { getUsers } from "@/app/lib/users";
import { UserSearchParams } from "@/app/runner/users/page";

export async function UserList({ className, searchParams } : {
    className?: string,
    searchParams: Promise<UserSearchParams>
}) {
    const { username } = await searchParams;
    const response = await getUsers({
        searchString: username ?? "",
        page: 1
    });
    const { users, userCount, pages } = response;
    return (
        <div className={`flex flex-row flex-wrap items-center justify-center gap-10 ${className ?? ""}`}>
            {users.map(u => <UserCard user={u} link={`/runner/profile/${u.name}`} size="small" key={u.id}></UserCard>)}
        </div>
    )
}