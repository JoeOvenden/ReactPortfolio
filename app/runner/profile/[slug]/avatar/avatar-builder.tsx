"use client";

import { useAvatarComponentArray, useAvatarMappings, useUser } from "@/app/context/UserContext";
import { User } from "@/app/lib/definitions/User";
import { saveAvatar } from "@/app/lib/users";
import { Avatar, defaultAvatarColour, defaultAvatarEyesId, defaultAvatarMouthId } from "@/app/ui/avatar";
import Button from "@/app/ui/button";
import AccessDenied from "@/app/ui/runner/access-denied";
import Section from "@/app/ui/section";
import AvatarComponentType from "@/schemas/public/AvatarComponentType";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function AvatarBuilder() {
    const username = useParams().slug;
    const user = useUser() as User;
    if (user.name !== username) {
        return <AccessDenied />
    }

    const components = useAvatarComponentArray();
    const eyes = components.filter(x => x.type === AvatarComponentType.eyes);
    const mouths = components.filter(x => x.type === AvatarComponentType.mouth);

    const galleryClasses = "flex flex-wrap gap-8 overflow-y-scroll max-h-[70vh]";
    const componentClasses = "cursor-pointer transition duration-300 hover:scale-90";
    const [avatarEyes, setEyes] = useState(user.avatar_eyes);
    const [avatarMouth, setMouth] = useState(user.avatar_mouth);
    const [avatarColour, setColour] = useState(user.avatar_colour ?? defaultAvatarColour);
    
    return (
        <div className="grid grid-cols-3 gap-4 container">
            <Section className={galleryClasses}>
                {eyes.map(component => (
                    <Image 
                        alt={component.type}
                        src={`/avatars/components/eyes/${component.filename}.svg`}
                        width="200"
                        height="80"
                        onClick={() => setEyes(component.id)}
                        className={componentClasses}
                    />
                ))}
            </Section>
            <Section className={galleryClasses}>
                {mouths.map(component => (
                    <Image 
                        alt={component.type}
                        src={`/avatars/components/mouths/${component.filename}.svg`}
                        width="200"
                        height="80"
                        onClick={() => setMouth(component.id)}
                        className={componentClasses}
                    />
                ))}
            </Section>
            <Section className="flex flex-col gap-10 items-center justify-center">
                <Avatar user={user} eyeOverride={avatarEyes} mouthOverride={avatarMouth} colourOverride={avatarColour} size="large" />
                <div className="flex flex-col gap-1">
                    <div className="flex gap-4">
                        <label>Colour:</label>
                        <input type="color" onChange={(e) => setColour(e.target.value)}/>
                    </div>
                    <Button onclick={() => saveAvatar(
                        {
                            eyesId: avatarEyes, 
                            mouthId: avatarMouth, 
                            color: avatarColour
                        })
                    }>Save</Button>
                </div>
            </Section>
        </div>
    )
}