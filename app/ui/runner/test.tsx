'use client'

import { useSession } from "next-auth/react";

export default function Test() {
    const { data: session, status } = useSession();
    console.log(session, status);
    const user = "anonymous";
    return (
        <div>
            <p>User: {user}</p>
        </div>
    )
}