"use client";

import { createContext, useContext } from "react";
import { User } from "../lib/definitions/User";

interface UserContextType {
    user: User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children, user } : {
    children: React.ReactNode,
    user: User | undefined
}) {
    return <UserContext.Provider value={{user}}>{children}</UserContext.Provider>;
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within UserProvider');
    }
    return context.user;
}