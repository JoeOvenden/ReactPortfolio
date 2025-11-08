"use client";

import { createContext, useContext } from "react";
import { User } from "../lib/definitions/User";
import AvatarComponents, { AvatarComponentsId } from "@/schemas/public/AvatarComponents";
import AvatarComponentType from "@/schemas/public/AvatarComponentType";

export type AvatarMappings = Record<AvatarComponentsId, {
    filename: string,
    type: AvatarComponentType,
}>; 

interface GlobalContextType {
    user: User | undefined;
    avatar_mappings: AvatarMappings,
    avatar_components: AvatarComponents[]
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children, user, avatar_mappings, avatar_components } : {
    children: React.ReactNode,
    user: User | undefined,
    avatar_mappings: AvatarMappings,
    avatar_components: AvatarComponents[]
}) {
    return <GlobalContext.Provider value={{user, avatar_mappings, avatar_components}}>{children}</GlobalContext.Provider>;
}

export function useUser() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useUser must be used within GlobalProvider');
    }
    return context.user;
}

export function useAvatarMappings() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useUser must be used within GlobalProvider');
    }
    return context.avatar_mappings;
}

export function useAvatarComponentArray() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useUser must be used within GlobalProvider');
    }
    return context.avatar_components;
}