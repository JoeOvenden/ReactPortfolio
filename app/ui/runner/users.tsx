"use client";

import { UserBasicDTO } from "@/app/lib/definitions/User";
import { UserCard } from "../avatar";

export async function UserList({ users, className } : {users: UserBasicDTO[], className?: string }) {
    return (
        <div className={`flex flex-row flex-wrap items-center justify-center gap-10 ${className ?? ""}`}>
            {users.map(u => <UserCard user={u} link={`/runner/profile/${u.name}`}></UserCard>)}
        </div>
    )
}