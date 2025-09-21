"use client";

import { User } from "@/app/lib/definitions";
import Section from "../../section";
import { Avatar, AvatarExtended, AvatarExtendedProps } from "../../avatar";

export default function ProfileSection({profile} : {profile : User | undefined}) {
    if (profile === undefined) {
        return (
            "No such profile"
        );
    }
    const avatarExtendedProps : AvatarExtendedProps = {
        src: "",
        alt: profile.name,
        size: "medium",
        username: profile.name
    }
    return (
        <Section>
            <AvatarExtended props={avatarExtendedProps}></AvatarExtended>
        </Section>
    )
}