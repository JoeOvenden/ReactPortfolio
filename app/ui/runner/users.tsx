"use client";

import { UserBasicDTO } from "@/app/lib/definitions/User";
import { UserCard } from "../avatar";

export async function UserList({ users } : {users: UserBasicDTO[]}) {
    return (
        <div className="flex flex-row flex-wrap gap-10">
            {users.map(u => <UserCard user={u} link={`/runner/profile/${u.name}`}></UserCard>)}
        </div>
    )
}