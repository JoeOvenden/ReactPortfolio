"use client";

import { UserBasicDTO } from "@/app/lib/definitions/User";
import { UserCard } from "../avatar";

export function UserList({ users } : {users: UserBasicDTO[]}) {
    return (
        <div>
            {users.map(u => <UserCard user={u}></UserCard>)}
        </div>
    )
}